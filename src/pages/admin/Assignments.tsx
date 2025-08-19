import React, { useEffect, useState } from 'react';
import { getAssignments, type Assignment } from '../../services/assignmentService';

const Assignments: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await getAssignments(1); // default page 1
        if (res.success) {
          setAssignments(res.data);
        }
      } catch (err) {
        console.error('Error fetching assignments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Mission Assignments</h2>
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Team</th>
            <th className="p-2">Mission</th>
            <th className="p-2">Checkpoint</th>
            <th className="p-2">File</th>
            <th className="p-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map(assign => (
            <tr key={assign.id} className="border-t">
              <td className="p-2">{assign.team.name}</td>
              <td className="p-2">{assign.mission.name}</td>
              <td className="p-2">{assign.mission.checkpoint.name}</td>
              <td className="p-2">
                {assign.file ? (
                  <a
                    href={`${import.meta.env.VITE_API_BASE_URL}/v1/file/${assign.file}`}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    View File
                  </a>
                ) : (
                  '-'
                )}
              </td>
              <td className="p-2">
                {new Date(assign.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Assignments;
