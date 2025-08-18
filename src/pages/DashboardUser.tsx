import { useState } from "react";
import { Routes, Route, Outlet, useParams } from "react-router-dom";

// Components
import SidebarUser from "../components/SidebarUser";
import BottomNavbar from "../components/BottomNavbar";
import Header from "../components/Header";

// Improt Elements
import Progress from "./Progress";
import QRScan from "./Qrscan";
import Mission from "./Mission";
import Missions from "./Missions";
import Upload from "./Upload";

const DashboardUser = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { slug } = useParams();

    return (
        <div className="flex h-screen overflow-hidden bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
            <SidebarUser isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-1 flex flex-col h-screen overflow-y-scroll">
            <Header onToggleSidebar={() => setSidebarOpen(true)} />
            <div className="flex-1 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white bg-opacity-80 rounded-xl shadow-lg p-6">
            <Routes>
                <Route path="progress" element={<Progress />} />
                <Route path="scan" element={<QRScan />} />
                <Route path="checkpoint/:slugCheckpoint" element={<Mission />} />
                <Route path="checkpoint/:slugCheckpoint/submission" element={<QRScan />} />
                <Route path="mission" element={<Mission />} />
                <Route path="missions" element={<Missions />} />
                <Route path="upload" element={<Upload />} />
            </Routes>
            <Outlet />
            </div>
            </div>
            <BottomNavbar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            </div>
        </div>
    );
};

export default DashboardUser;
