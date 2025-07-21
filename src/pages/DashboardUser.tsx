import { useState } from 'react';
import SidebarUser from '../components/SidebarUser';
import Header from '../components/Header';

const DashboardUser = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarUser isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <Header onToggleSidebar={() => setSidebarOpen(true)} />
        <main className="p-4 overflow-auto">
          <h2 className="text-2xl font-semibold mb-4">Team Progress</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white shadow rounded">Checkpoints Scanned</div>
            <div className="p-4 bg-white shadow rounded">Missions Completed</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardUser;
