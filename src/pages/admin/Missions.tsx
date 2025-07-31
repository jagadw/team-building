import React, { useState } from 'react';

interface Mission {
  id: number;
  name: string;
  description: string;
  slug: string;
  checkpoint: string; // display name
  point: number;
  video: string; // youtube link
  is_hidden: boolean;
}

const Missions: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 1,
      name: 'Photo Challenge',
      description: 'Ambil foto dengan background landmark utama.',
      slug: 'uuid-abc-123',
      checkpoint: 'Start Point',
      point: 10,
      video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      is_hidden: false,
    },
    {
      id: 2,
      name: 'Quiz Time',
      description: 'Jawab pertanyaan logika seputar event.',
      slug: 'uuid-def-456',
      checkpoint: 'Checkpoint 2',
      point: 20,
      video: '',
      is_hidden: true,
    },
  ]);

  const [editing, setEditing] = useState<Mission | null>(null);

  const handleSave = () => {
    if (editing) {
      setMissions(missions.map(m => m.id === editing.id ? editing : m));
      setEditing(null);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure?')) {
      setMissions(missions.filter(m => m.id !== id));
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Missions</h2>
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
          {missions.map(mission => (
            <tr key={mission.id} className="border-t">
              <td className="p-2">{mission.name}</td>
              <td className="p-2">{mission.description}</td>
              <td className="p-2">{mission.checkpoint}</td>
              <td className="p-2">{mission.point}</td>
              <td className="p-2">
                {mission.video ? (
                  <a href={mission.video} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    Video
                  </a>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
              <td className="p-2">{mission.is_hidden ? 'Yes' : 'No'}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => setEditing(mission)} className="text-blue-500 hover:underline">Edit</button>
                <button onClick={() => handleDelete(mission.id)} className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Mission</h3>
            <input
              value={editing.name}
              onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
              placeholder="Name"
            />
            <textarea
              value={editing.description}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
              placeholder="Description"
            />
            <input
              value={editing.checkpoint}
              onChange={(e) => setEditing({ ...editing, checkpoint: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
              placeholder="Checkpoint"
            />
            <input
              type="number"
              value={editing.point}
              onChange={(e) => setEditing({ ...editing, point: parseInt(e.target.value) })}
              className="w-full mb-2 p-2 border rounded"
              placeholder="Point"
            />
            <input
              value={editing.video}
              onChange={(e) => setEditing({ ...editing, video: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
              placeholder="YouTube Video URL"
            />
            <label className="block mb-2">
              <input
                type="checkbox"
                checked={editing.is_hidden}
                onChange={(e) => setEditing({ ...editing, is_hidden: e.target.checked })}
                className="mr-2"
              />
              Hidden
            </label>
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={() => setEditing(null)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
              <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Missions;
