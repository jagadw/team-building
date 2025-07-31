import React, { useState } from 'react';

interface Checkpoint {
  id: number;
  name: string;
  description: string;
  slug: string;
  location: string;
  point: number;
}

const Checkpoints: React.FC = () => {
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([
    {
      id: 1,
      name: 'Start Point',
      description: 'Checkpoint pertama di area masuk.',
      slug: 'uuid-001',
      location: 'https://maps.google.com/?q=-6.200000,106.816666',
      point: 10,
    },
    {
      id: 2,
      name: 'Finish Line',
      description: 'Checkpoint akhir lomba.',
      slug: 'uuid-002',
      location: 'https://maps.google.com/?q=-6.210000,106.820000',
      point: 20,
    },
  ]);

  const [editing, setEditing] = useState<Checkpoint | null>(null);

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this checkpoint?')) {
      setCheckpoints(checkpoints.filter(cp => cp.id !== id));
    }
  };

  const handleSave = () => {
    if (editing) {
      setCheckpoints(checkpoints.map(cp => (cp.id === editing.id ? editing : cp)));
      setEditing(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Checkpoints</h2>
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Description</th>
            <th className="p-2">Slug</th>
            <th className="p-2">Location</th>
            <th className="p-2">Point</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {checkpoints.map(cp => (
            <tr key={cp.id} className="border-t">
              <td className="p-2">{cp.name}</td>
              <td className="p-2">{cp.description}</td>
              <td className="p-2">{cp.slug}</td>
              <td className="p-2">
                <a href={cp.location} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  Map
                </a>
              </td>
              <td className="p-2">{cp.point}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => setEditing(cp)} className="text-blue-500 hover:underline">Edit</button>
                <button onClick={() => handleDelete(cp.id)} className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Checkpoint</h3>
            <input
              value={editing.name}
              onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
              placeholder="Name"
            />
            <input
              value={editing.description}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
              placeholder="Description"
            />
            <input
              value={editing.slug}
              onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
              placeholder="Slug (UUID)"
            />
            <input
              value={editing.location}
              onChange={(e) => setEditing({ ...editing, location: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
              placeholder="Google Maps Link"
            />
            <input
              type="number"
              value={editing.point}
              onChange={(e) => setEditing({ ...editing, point: parseInt(e.target.value) })}
              className="w-full mb-4 p-2 border rounded"
              placeholder="Point"
            />
            <div className="flex justify-end space-x-2">
              <button onClick={() => setEditing(null)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
              <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkpoints;
