import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login.tsx';
import QRScan from './pages/qrscan.tsx';
import Mission from './pages/mission.tsx';
import Upload from './pages/upload.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/scan" element={<QRScan />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  );
};

export default App;