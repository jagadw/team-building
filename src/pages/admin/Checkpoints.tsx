import React, { useEffect, useState } from 'react';
import { type Checkpoint, getCheckpoints, createCheckpoint, updateCheckpoint, deleteCheckpoint } from '../../services/checkpointService';

// interface Checkpoint {
//   id: number;
//   name: string;
//   description: string;
//   slug: string;
//   location: string;
//   point: number;
//   event_id: number;
// }

const Checkpoints: React.FC = () => {
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [eventId, setEventId] = useState<number | null>(null);
  const [editing, setEditing] = useState<Checkpoint | null>(null);
  const [newCheckpoint, setNewCheckpoint] = useState<Checkpoint | null>(null);

  const fetchCheckpoints = async () => {
    const data = await getCheckpoints();
    setCheckpoints(data);

    if (data.length > 0 && data[0].event_id) {
      setEventId(data[0].event_id);
    }
  };

  useEffect(() => {
    fetchCheckpoints();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this checkpoint?')) {
      await deleteCheckpoint(id);
      fetchCheckpoints();
    }
  };

  const handleSave = async () => {
    if (editing) {
      await updateCheckpoint(editing.id, editing);
    } else if (newCheckpoint) {
      await createCheckpoint(newCheckpoint);
    }
    setEditing(null);
    setNewCheckpoint(null);
    fetchCheckpoints();
  };

  const openForm = (cp?: Checkpoint) => {
    if (cp) {
      setEditing(cp);
    } else {
      if (!eventId) {
        alert("Event ID belum tersedia, silakan tunggu data termuat.");
        return;
      }
      setNewCheckpoint({
        id: 0,
        name: '',
        description: '',
        slug: '',
        location: '',
        point: 0,
        event_id: eventId
      });
    }
  };

  const currentForm = editing || newCheckpoint;

  const setFormValue = (key: keyof Checkpoint, value: any) => {
    if (editing) setEditing({ ...editing, [key]: value });
    else if (newCheckpoint) setNewCheckpoint({ ...newCheckpoint, [key]: value });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Checkpoints</h2>
        <button
          onClick={() => openForm()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New
        </button>
      </div>

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
                <button onClick={() => openForm(cp)} className="text-blue-500 hover:underline">Edit</button>
                <button onClick={() => handleDelete(cp.id)} className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {currentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {editing ? 'Edit Checkpoint' : 'New Checkpoint'}
            </h3>
            {(['name', 'description', 'slug', 'location', 'point'] as (keyof Checkpoint)[]).map(key => (
              <input
                key={key}
                value={currentForm[key]}
                onChange={(e) => setFormValue(key, key === 'point' ? parseInt(e.target.value) : e.target.value)}
                className="w-full mb-2 p-2 border rounded"
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                type={key === 'point' ? 'number' : 'text'}
              />
            ))}
            <div className="flex justify-end space-x-2">
              <button onClick={() => { setEditing(null); setNewCheckpoint(null); }} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
              <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkpoints;
