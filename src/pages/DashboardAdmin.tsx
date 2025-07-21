import { useState } from 'react';
import SidebarAdmin from '../components/SidebarAdmin';
import Header from '../components/Header';

const DashboardAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarAdmin isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <Header onToggleSidebar={() => setSidebarOpen(true)} />
        <main className="p-4 overflow-auto">
          <h2 className="text-2xl font-semibold mb-4">Admin Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-white shadow rounded">Total Teams</div>
            <div className="p-4 bg-white shadow rounded">Checkpoints</div>
            <div className="p-4 bg-white shadow rounded">Assignments</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;
