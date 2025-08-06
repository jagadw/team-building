import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTeams, deleteTeam } from '../../services/teamService';
import type { Team, Event } from '../../services/teamService';
import axios from '../../services/api';

const Teams = () => {
  const { slug } = useParams<{ slug: string }>();
  const [teams, setTeams] = useState<Team[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch all events for dropdown
  const fetchEvents = async () => {
    try {
      const res = await axios.get('/v1/admin/events');
      setEvents(res.data.data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  // Fetch teams based on event slug
  useEffect(() => {
    const fetchTeamsData = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await getTeams(slug);
        setTeams(data);
      } catch (error) {
        console.error('Failed to fetch teams:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamsData();
    fetchEvents();
  }, [slug]);

  const handleEdit = (team: Team) => {
    setEditingTeam(team);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this team?')) {
      try {
        await deleteTeam(id);
        setTeams((prev) => prev.filter((t) => t.id !== id));
      } catch (error) {
        alert('Failed to delete team');
        console.error(error);
      }
    }
  };

  const handleUpdate = () => {
    if (editingTeam) {
      setTeams((prev) =>
        prev.map((t) => (t.id === editingTeam.id ? editingTeam : t))
      );
      setEditingTeam(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Teams</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border border-gray-200 rounded overflow-hidden">
          <thead className="bg-gray-100 text-left text-sm">
            <tr>
              <th className="p-2">No</th>
              <th className="p-2">Name</th>
              <th className="p-2">Slug</th>
              <th className="p-2">Event</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={team.id} className="border-t border-gray-200">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{team.name}</td>
                <td className="p-2">{team.slug}</td>
                <td className="p-2">{team.event?.name}</td>
                <td className="p-2 text-center space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => handleEdit(team)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(team.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal Edit */}
      {editingTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Team</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm">Name</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editingTeam.name}
                  onChange={(e) =>
                    setEditingTeam({ ...editingTeam, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm">Slug</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={editingTeam.slug}
                  onChange={(e) =>
                    setEditingTeam({ ...editingTeam, slug: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm">Event</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={editingTeam.event_id}
                  onChange={(e) =>
                    setEditingTeam({
                      ...editingTeam,
                      event_id: parseInt(e.target.value),
                      event:
                        events.find((ev) => ev.id === parseInt(e.target.value)) ??
                        editingTeam.event,
                    })
                  }
                >
                  {events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setEditingTeam(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
