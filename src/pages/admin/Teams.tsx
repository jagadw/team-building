import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getTeams,
  deleteTeam,
  updateTeam,
  createTeam,
  type Team,
  type Event,
  type Participant,
} from "../../services/teamService";
import axios from "../../services/api";

const Teams = () => {
  const { slug } = useParams<{ slug: string }>();
  const [teams, setTeams] = useState<Team[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  // Add modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTeam, setNewTeam] = useState({
    name: "",
    event_id: 0,
    user: { email: "", password: "" },
    participants: [{ name: "", phone: "", is_leader: true }],
  });

  // Edit modal
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("/v1/admin/events");
      setEvents(res.data.data);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  const fetchTeamsData = async () => {
    if (!slug) return;
    setLoading(true);
    try {
      const data = await getTeams(slug);
      setTeams(data);
    } catch (error) {
      console.error("Failed to fetch teams:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamsData();
    fetchEvents();
  }, [slug]);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this team?")) {
      try {
        await deleteTeam(id);
        setTeams((prev) => prev.filter((t) => t.id !== id));
      } catch (error) {
        alert("Failed to delete team");
        console.error(error);
      }
    }
  };

  const handleAddParticipant = (
    setter: React.Dispatch<any>,
    participants: Participant[]
  ) => {
    setter((prev: any) => ({
      ...prev,
      participants: [...participants, { name: "", phone: "", is_leader: false }],
    }));
  };

  const handleRemoveParticipant = (
    setter: React.Dispatch<any>,
    participants: Participant[],
    index: number
  ) => {
    setter((prev: any) => ({
      ...prev,
      participants: participants.filter((_, i) => i !== index),
    }));
  };

  const handleCreateTeam = async () => {
    try {
      await createTeam(newTeam);
      await fetchTeamsData();
      setShowAddModal(false);
      setNewTeam({
        name: "",
        event_id: 0,
        user: { email: "", password: "" },
        participants: [{ name: "", phone: "", is_leader: true }],
      });
    } catch (error) {
      alert("Failed to create team");
      console.error(error);
    }
  };

  const handleUpdateTeam = async () => {
    if (!editingTeam) return;
    try {
      await updateTeam(editingTeam.id, {
        name: editingTeam.name,
        event_id: editingTeam.event_id,
        user: editingTeam.user,
        participants: editingTeam.participants,
      });
      await fetchTeamsData();
      setEditingTeam(null);
    } catch (error) {
      alert("Failed to update team");
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Teams</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-green-700"
        >
          + Add Team
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100 text-left text-sm">
            <tr>
              <th className="p-2">No</th>
              <th className="p-2">Name</th>
              <th className="p-2">Leader</th>
              <th className="p-2">Event</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={team.id} className="border-t border-gray-200">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{team.name}</td>
                <td className="p-2">
                  {team.participants.find((p) => p.is_leader)?.name ?? "No leader"}
                </td>
                <td className="p-2">{team.event?.name}</td>
                <td className="p-2 text-center space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() =>
                      setEditingTeam({
                        ...team,
                        user: team.user ?? { email: "", password: "" },
                      })
                    }
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

      {/* Modal Add Team */}
      {showAddModal && (
        <TeamModal
          title="Add Team"
          teamData={newTeam}
          events={events}
          setTeamData={setNewTeam}
          onClose={() => setShowAddModal(false)}
          onSave={handleCreateTeam}
          handleAddParticipant={handleAddParticipant}
          handleRemoveParticipant={handleRemoveParticipant}
        />
      )}

      {/* Modal Edit Team */}
      {editingTeam && (
        <TeamModal
          title="Edit Team"
          teamData={editingTeam}
          events={events}
          setTeamData={setEditingTeam}
          onClose={() => setEditingTeam(null)}
          onSave={handleUpdateTeam}
          handleAddParticipant={handleAddParticipant}
          handleRemoveParticipant={handleRemoveParticipant}
        />
      )}
    </div>
  );
};

// 🔹 Reusable Team Modal
const TeamModal = ({
  title,
  teamData,
  events,
  setTeamData,
  onClose,
  onSave,
  handleAddParticipant,
  handleRemoveParticipant,
}: any) => (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm">Team Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={teamData.name}
            onChange={(e) => setTeamData({ ...teamData, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm">Event</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={teamData.event_id}
            onChange={(e) =>
              setTeamData({ ...teamData, event_id: Number(e.target.value) })
            }
          >
            <option value={0}>-- Select Event --</option>
            {events.map((ev: Event) => (
              <option key={ev.id} value={ev.id}>
                {ev.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h4 className="font-medium text-sm">Team User</h4>
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded px-3 py-2 mb-2"
            value={teamData.user?.email}
            onChange={(e) =>
              setTeamData({
                ...teamData,
                user: { ...teamData.user, email: e.target.value },
              })
            }
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded px-3 py-2"
            value={teamData.user?.password}
            onChange={(e) =>
              setTeamData({
                ...teamData,
                user: { ...teamData.user, password: e.target.value },
              })
            }
          />
        </div>
        <div>
          <h4 className="font-medium text-sm">Participants</h4>
          {teamData.participants.map((p: Participant, i: number) => (
            <div key={i} className="flex space-x-2 mb-2">
              <input
                type="text"
                placeholder="Name"
                className="flex-1 border rounded px-3 py-2"
                value={p.name}
                onChange={(e) => {
                  const updated = [...teamData.participants];
                  updated[i].name = e.target.value;
                  setTeamData({ ...teamData, participants: updated });
                }}
              />
              <input
                type="text"
                placeholder="Phone"
                className="flex-1 border rounded px-3 py-2"
                value={p.phone}
                onChange={(e) => {
                  const updated = [...teamData.participants];
                  updated[i].phone = e.target.value;
                  setTeamData({ ...teamData, participants: updated });
                }}
              />
              <label className="flex items-center space-x-1">
                <input
                  type="radio"
                  name={`leader-${title}`}
                  checked={p.is_leader}
                  onChange={() => {
                    const updated = teamData.participants.map(
                      (pp: Participant, idx: number) => ({
                        ...pp,
                        is_leader: idx === i,
                      })
                    );
                    setTeamData({ ...teamData, participants: updated });
                  }}
                />
                <span className="text-xs">Leader</span>
              </label>
              {i > 0 && (
                <button
                  onClick={() =>
                    handleRemoveParticipant(setTeamData, teamData.participants, i)
                  }
                  className="px-2 bg-red-500 text-white rounded"
                >
                  x
                </button>
              )}
            </div>
          ))}
          <button
            onClick={() =>
              handleAddParticipant(setTeamData, teamData.participants)
            }
            className="px-3 py-1 mt-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            + Add Participant
          </button>
        </div>
      </div>

      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  </div>
);

export default Teams;
