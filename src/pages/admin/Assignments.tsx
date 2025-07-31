import React, { useState } from 'react';

interface Assignment {
  id: number;
  team: string;
  mission: string;
  file: string; // URL gambar
  approved: boolean;
  created_at: string; // ISO format
}

const Assignments: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 1,
      team: 'Team Alpha',
      mission: 'Photo Challenge',
      file: 'https://via.placeholder.com/150',
      approved: true,
      created_at: '2025-07-31T10:30:00Z',
    },
    {
      id: 2,
      team: 'Team Bravo',
      mission: 'QR Hunt',
      file: 'https://via.placeholder.com/150',
      approved: false,
      created_at: '2025-07-31T11:00:00Z',
    },
  ]);

  const toggleApproval = (id: number) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, approved: !a.approved } : a));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Mission Assignments</h2>
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Team</th>
            <th className="p-2">Mission</th>
            <th className="p-2">Proof</th>
            <th className="p-2">Status</th>
            <th className="p-2">Submitted At</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map(assign => (
            <tr key={assign.id} className="border-t">
              <td className="p-2">{assign.team}</td>
              <td className="p-2">{assign.mission}</td>
              <td className="p-2">
                <img src={assign.file} alt="Proof" className="w-16 h-16 object-cover rounded" />
              </td>
              <td className="p-2">
                <span className={assign.approved ? 'text-green-600' : 'text-red-600'}>
                  {assign.approved ? 'Approved' : 'Pending'}
                </span>
              </td>
              <td className="p-2">{new Date(assign.created_at).toLocaleString()}</td>
              <td className="p-2">
                <button
                  onClick={() => toggleApproval(assign.id)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  {assign.approved ? 'Revoke' : 'Approve'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Assignments;
