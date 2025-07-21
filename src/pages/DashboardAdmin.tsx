import { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Teams from './admin/Teams';
import SidebarAdmin from '../components/SidebarAdmin';
import Header from '../components/Header';

const DashboardAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <SidebarAdmin isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <Header onToggleSidebar={() => setSidebarOpen(true)} />
        <div className="flex-1 p-4">
        <Routes>
          <Route path="teams" element={<Teams />} />
          {/* <Route path="scan" element={<QRScan />} />
          <Route path="mission" element={<Mission />} />
          <Route path="missions" element={<Missions />} />
          <Route path="upload" element={<Upload />} /> */}
          <Route index element={
          <main className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow space-y-4 p-4 overflow-auto">
            <h2 className="text-2xl font-semibold mb-4">Admin Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-white text-center shadow rounded">Total Teams
                <br /><p className='text-2xl font-semibold'>0</p>
              </div>
              <div className="p-4 bg-white text-center shadow rounded">Checkpoints
                <br /><p className='text-2xl font-semibold'>0</p>
              </div>
              <div className="p-4 bg-white text-center shadow rounded">Assignments
                <br /><p className='text-2xl font-semibold'>0</p>
              </div>
            </div>
          </main>
          } />
        </Routes>
        <Outlet />
      </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
