import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.tsx';
// import QRScan from './pages/Qrscan.tsx';
// import Mission from './pages/Mission.tsx';
// import Upload from './pages/Upload.tsx';
import AdminMenu from './pages/admin/AdminMenu.tsx';
import DashboardAdmin from './pages/DashboardAdmin.tsx';
import DashboardUser from './pages/DashboardUser.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<AdminMenu />} />
        {/* <Route path="/scan" element={<QRScan />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/upload" element={<Upload />} /> */}
        <Route path="/admin/*" element={<DashboardAdmin />} />
        <Route path="/user/*" element={<DashboardUser />} />
      </Routes>
    </Router>
  );
};

export default App;