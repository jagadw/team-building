import { useState, useEffect } from 'react';
import participantService from '../../services/participantService';

interface Participant {
  id: number;
  name: string;
  phone: string;
  team_id: number | null;
}

interface Team {
  id: number;
  name: string;
}

const Participants = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [editing, setEditing] = useState<Participant | null>(null);
  const [addingTeam, setAddingTeam] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [eventId, setEventId] = useState<number>(0);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [teamParticipants, setTeamParticipants] = useState([
    { name: '', phone: '', is_leader: true }
  ]);

  const fetchParticipants = async () => {
    const res = await participantService.getAll();
    const data = Array.isArray(res.data) ? res.data : res.data.data || [];
    setParticipants(
      data.map((p: any) => ({
        id: p.id,
        name: p.name,
        phone: p.phone,
        team_id: p.team_id
      }))
    );
  };

  const fetchTeams = async () => {
    const res = await participantService.getTeams();
    const data = Array.isArray(res.data) ? res.data : res.data.data || [];
    setTeams(data.map((t: any) => ({ id: t.id, name: t.name })));
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
        team_id: editing.team_id || null
      });
      setEditing(null);
      fetchParticipants();
    }
  };

  const handleAddParticipantField = () => {
    setTeamParticipants([...teamParticipants, { name: '', phone: '', is_leader: false }]);
  };

  const handleCreateTeam = async () => {
    await participantService.createTeamWithParticipants({
      name: teamName,
      event_id: eventId,
      user: {
        email: userEmail,
        password: userPassword
      },
      participants: teamParticipants
    });
    setAddingTeam(false);
    setTeamName('');
    setEventId(0);
    setUserEmail('');
    setUserPassword('');
    setTeamParticipants([{ name: '', phone: '', is_leader: true }]);
    fetchParticipants();
    fetchTeams();
  };

  useEffect(() => {
    fetchParticipants();
    fetchTeams();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Participants</h2>
        <button onClick={() => setAddingTeam(true)} className="bg-green-600 text-white px-4 py-2 rounded">Add Team</button>
      </div>
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
              <td className="p-2">
                {part.team_id
                  ? teams.find(t => t.id === part.team_id)?.name || '-'
                  : '-'}
              </td>
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
            <select value={editing.team_id || ''} onChange={(e) => setEditing({ ...editing, team_id: e.target.value ? parseInt(e.target.value) : null })} className="w-full mb-4 p-2 border rounded">
              <option value="">No Team</option>
              {teams.map(team => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setEditing(null)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
              <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            </div>
          </div>
        </div>
      )}

      {addingTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg max-h-screen overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Add Team</h3>
            <input value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Team Name" className="w-full mb-2 p-2 border rounded" />
            <input type="number" value={eventId} onChange={(e) => setEventId(Number(e.target.value))} placeholder="Event ID" className="w-full mb-2 p-2 border rounded" />
            <input value={userEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder="User Email" className="w-full mb-2 p-2 border rounded" />
            <input type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} placeholder="User Password" className="w-full mb-4 p-2 border rounded" />
            <h4 className="font-semibold mb-2">Participants</h4>
            {teamParticipants.map((tp, idx) => (
              <div key={idx} className="mb-2 border p-2 rounded">
                <input value={tp.name} onChange={(e) => {
                  const newList = [...teamParticipants];
                  newList[idx].name = e.target.value;
                  setTeamParticipants(newList);
                }} placeholder="Name" className="w-full mb-2 p-2 border rounded" />
                <input value={tp.phone} onChange={(e) => {
                  const newList = [...teamParticipants];
                  newList[idx].phone = e.target.value;
                  setTeamParticipants(newList);
                }} placeholder="Phone" className="w-full mb-2 p-2 border rounded" />
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={tp.is_leader} onChange={(e) => {
                    const newList = [...teamParticipants];
                    newList[idx].is_leader = e.target.checked;
                    setTeamParticipants(newList);
                  }} />
                  <span>Leader</span>
                </label>
              </div>
            ))}
            <button onClick={handleAddParticipantField} className="bg-gray-200 px-4 py-2 rounded mb-4">Add Participant</button>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setAddingTeam(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
              <button onClick={handleCreateTeam} className="bg-green-600 text-white px-4 py-2 rounded">Save Team</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Participants;
