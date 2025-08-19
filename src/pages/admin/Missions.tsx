import React, { useEffect, useState } from 'react';
import {
  getMissions,
  createMission,
  updateMission,
  deleteMission,
  getCheckpoints,
  type Mission,
  type Checkpoint
} from '../../services/missionService';

const Missions: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [editing, setEditing] = useState<Partial<Mission> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMissions = async () => {
    try {
      setLoading(true);
      const data = await getMissions();
      setMissions(data);
    } catch {
      alert('Failed to fetch missions.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCheckpoints = async () => {
    try {
      const data = await getCheckpoints();
      setCheckpoints(data);
    } catch {
      alert('Failed to fetch checkpoints.');
    }
  };

  useEffect(() => {
    fetchMissions();
    fetchCheckpoints();
  }, []);

  const handleSave = async () => {
    if (!editing?.name || !editing.checkpoint_id) {
      alert('Name dan checkpoint wajib diisi.');
      return;
    }

    try {
      if (editing.id && editing.id > 0) {
        await updateMission(editing.id, editing);
      } else {
        await createMission(editing);
      }
      await fetchMissions();
      setEditing(null);
    } catch {
      alert('Failed to save mission.');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure?')) {
      try {
        await deleteMission(id);
        await fetchMissions();
      } catch {
        alert('Failed to delete mission.');
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Missions</h2>
        <button
          onClick={() =>
            setEditing({
              id: 0,
              name: '',
              description: '',
              slug: '',
              checkpoint_id: 0,
              point: 0,
              video: '',
              is_hidden: false,
            })
          }
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Mission
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Description</th>
              <th className="p-2">Checkpoint</th>
              <th className="p-2">Point</th>
              <th className="p-2">Video</th>
              <th className="p-2">Hidden</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {missions.map((mission) => (
              <tr key={mission.id} className="border-t">
                <td className="p-2">{mission.name}</td>
                <td className="p-2">{mission.description}</td>
                <td className="p-2">
                  {checkpoints.find(c => c.id === mission.checkpoint_id)?.name || mission.checkpoint_id}
                </td>
                <td className="p-2">{mission.point}</td>
                <td className="p-2">
                  {mission.video ? (
                    <a
                      href={mission.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Video
                    </a>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="p-2">{mission.is_hidden ? 'Yes' : 'No'}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => setEditing(mission)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(mission.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editing.id ? 'Edit Mission' : 'Add Mission'}
            </h3>
            <div className="mb-3">
              <label className="block mb-1 font-medium">Name</label>
              <input
                value={editing.name || ''}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Name"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1 font-medium">Description</label>
              <textarea
                value={editing.description || ''}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="Description"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1 font-medium">Checkpoint</label>
              <select
                value={editing.checkpoint_id || 0}
                onChange={(e) =>
                  setEditing({ ...editing, checkpoint_id: parseInt(e.target.value) })
                }
                className="w-full p-2 border rounded"
              >
                <option value={0}>Pilih Checkpoint</option>
                {checkpoints.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="block mb-1 font-medium">Point</label>
              <input
                type="number"
                value={editing.point || 0}
                onChange={(e) => setEditing({ ...editing, point: parseInt(e.target.value) })}
                className="w-full p-2 border rounded"
                placeholder="Point"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1 font-medium">YouTube Video URL</label>
              <input
                value={editing.video || ''}
                onChange={(e) => setEditing({ ...editing, video: e.target.value })}
                className="w-full p-2 border rounded"
                placeholder="YouTube Video URL"
              />
            </div>

            <div className="mb-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={editing.is_hidden || false}
                  onChange={(e) => setEditing({ ...editing, is_hidden: e.target.checked })}
                  className="mr-2"
                />
                Hidden
              </label>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setEditing(null)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded"
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

export default Missions;
