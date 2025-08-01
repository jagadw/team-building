import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.tsx';
import QRScan from './pages/Qrscan.tsx';
import Mission from './pages/Mission.tsx';
import Upload from './pages/Upload.tsx';
import Menu from './pages/Menu.tsx';
import AdminMenu from './pages/admin/AdminMenu.tsx';
import DashboardAdmin from './pages/DashboardAdmin.tsx';
import DashboardUser from './pages/DashboardUser.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/adminmenu" element={<AdminMenu />} />
        <Route path="/admin/event/:slug/*" element={<DashboardAdmin />} />
        <Route path="/event/:slug/*" element={<DashboardUser />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/scan" element={<QRScan />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  );
};

export default App;