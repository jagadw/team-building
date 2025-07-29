import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Teams from './admin/Teams';
import Participants from './admin/Participants';
import SidebarAdmin from '../components/SidebarAdmin';
import Header from '../components/Header';

const DashboardAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dummy data events - nanti bisa diganti dari API/global state
  const events = [
    { id: 1, name: 'Event A', slug: 'event-a' },
    { id: 2, name: 'Event B', slug: 'event-b' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <SidebarAdmin isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} events={events} />

      <div className="flex-1 flex flex-col">
        <Header onToggleSidebar={() => setSidebarOpen(true)} />

        <div className="flex-1 p-4 overflow-auto">
          <Routes>
          <Route path="/admin/*" element={<DashboardAdmin />} />
          <Route path=":slug/teams" element={<Teams />} />
          <Route path=":slug/participants" element={<Participants />} />
            <Route
              index
              element={
                <main className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow space-y-4">
                  <h2 className="text-2xl font-semibold mb-4">Admin Overview</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-white text-center shadow rounded">
                      Total Teams
                      <p className="text-2xl font-semibold mt-1">0</p>
                    </div>
                    <div className="p-4 bg-white text-center shadow rounded">
                      Checkpoints
                      <p className="text-2xl font-semibold mt-1">0</p>
                    </div>
                    <div className="p-4 bg-white text-center shadow rounded">
                      Assignments
                      <p className="text-2xl font-semibold mt-1">0</p>
                    </div>
                  </div>
                </main>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
