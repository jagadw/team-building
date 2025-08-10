import { useState, useEffect } from 'react';
import participantService from '../../services/participantService';

interface Participant {
  id: number;
  name: string;
  phone: string;
  team: string;
}

const Participants = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [editing, setEditing] = useState<Participant | null>(null);

  const fetchParticipants = async () => {
    const res = await participantService.getAll();
    const data = Array.isArray(res.data) ? res.data : res.data.data || [];
    setParticipants(
      data.map((p: any) => ({
        id: p.id,
        name: p.name,
        phone: p.phone,
        team: p.team_id ? `Team ${p.team_id}` : '-'
      }))
    );
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure?')) {
      await participantService.delete(id);
      fetchParticipants();
    }
  };

  const handleSave = async () => {
    if (editing) {
      await participantService.update(editing.id, {
        name: editing.name,
        phone: editing.phone,
        team_id: parseInt(editing.team.replace(/\D/g, '')) || null
      });
      setEditing(null);
      fetchParticipants();
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Participants</h2>
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Team</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {participants.map(part => (
            <tr key={part.id} className="border-t">
              <td className="p-2">{part.name}</td>
              <td className="p-2">{part.phone}</td>
              <td className="p-2">{part.team}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => setEditing(part)} className="text-blue-500 hover:underline">Edit</button>
                <button onClick={() => handleDelete(part.id)} className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Edit Participant</h3>
            <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full mb-2 p-2 border rounded" />
            <input value={editing.phone} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} className="w-full mb-2 p-2 border rounded" />
            <input value={editing.team} onChange={(e) => setEditing({ ...editing, team: e.target.value })} className="w-full mb-4 p-2 border rounded" />
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

export default Participants;
