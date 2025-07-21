import React from "react";

const Teams: React.FC = () => {
  const teamData = [
    { name: "JMK48", points: 0 },
    { name: "Ngawi Musikal", points: 0 },
  ];

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full table-auto border-collapse rounded-xl overflow-hidden shadow">
        <thead>
          <tr className="bg-white text-left text-gray-700 uppercase text-sm">
            <th className="px-4 py-3">No</th>
            <th className="px-4 py-3">Team Name</th>
            <th className="px-4 py-3">Points</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teamData.map((team, index) => (
            <tr
              key={index}
              className="border-t hover:bg-white transition-all"
            >
              <td className="bg-white px-4 py-2 font-medium text-gray-800">
                {index + 1}
              </td>
              <td className="bg-white px-4 py-2 text-gray-700">{team.name}</td>
              <td className="bg-white px-4 py-2 text-gray-700">{team.points}</td>
              <td className="bg-white px-4 py-2 text-gray-700">Edit</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Teams;
