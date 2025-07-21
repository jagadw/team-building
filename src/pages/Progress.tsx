import React from "react";

const Progress: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <main className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow space-y-4 p-4 overflow-auto">
          <h2 className="text-2xl font-semibold mb-4">Team Progress</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white shadow rounded">Points
                <br />
                <p className='text-2xl font-semibold'>0</p>
            </div>
            <div className="p-4 bg-white shadow rounded">Missions
                <br />
                <p className='text-2xl font-semibold'>0</p>
            </div>
          </div>
        </main>
    </div>
  );

};
export default Progress;
