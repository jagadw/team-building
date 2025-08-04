import React from 'react';

interface Team {
  name: string;
  points: number;
  rank: number;
}

const dummyData: Team[] = [
  { name: "Team Alpha", points: 150, rank: 1 },
  { name: "Team Bravo", points: 140, rank: 2 },
  { name: "Team Charlie", points: 120, rank: 3 },
  { name: "Team Delta", points: 100, rank: 4 },
  { name: "Team Echo", points: 80, rank: 5 },
];

const Leaderboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow rounded-2xl p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Leaderboard</h1>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4 rounded-tl-xl">Rank</th>
              <th className="py-2 px-4">Team</th>
              <th className="py-2 px-4 rounded-tr-xl">Points</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((team, idx) => (
              <tr key={idx} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="py-2 px-4 font-semibold">{team.rank}</td>
                <td className="py-2 px-4">{team.name}</td>
                <td className="py-2 px-4">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
