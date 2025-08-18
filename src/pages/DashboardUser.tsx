import { useState } from "react";
import { Routes, Route, Outlet, useParams } from "react-router-dom";
import SidebarUser from "../components/SidebarUser";
import Header from "../components/Header";
import Progress from "./Progress";
import QRScan from "./Qrscan";
import Mission from "./Mission";
import Missions from "./Missions";
import Upload from "./Upload";

const DashboardUser = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { slug } = useParams();

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <SidebarUser isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-1 flex flex-col">
                <Header onToggleSidebar={() => setSidebarOpen(true)} />
                <div className="flex-1 p-4">
                    <Routes>
                        <Route path="progress" element={<Progress />} />
                        <Route path="scan" element={<QRScan />} />
                        <Route path="mission" element={<Mission />} />
                        <Route path="missions" element={<Missions />} />
                        <Route path="upload" element={<Upload />} />
                    </Routes>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardUser;
