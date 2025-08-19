import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.tsx";
import QRScan from "./pages/Qrscan.tsx";
import Mission from "./pages/Mission.tsx";
import Upload from "./pages/Upload.tsx";
import Menu from "./pages/Menu.tsx";
import Leaderboard from "./pages/Leaderboard.tsx";
import AdminMenu from "./pages/admin/AdminMenu.tsx";
import ParticipantMenu from "./pages/ParticipantMenu.tsx";
import DashboardAdmin from "./pages/DashboardAdmin.tsx";
import DashboardUser from "./pages/DashboardUser.tsx";
import { Auth } from "./components/Auth.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const client = new QueryClient();
const App: React.FC = () => {
    return (
        <QueryClientProvider client={client}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />

                    <Route element={<Auth roles={["admin"]} />}>
                        <Route path="/adminmenu" element={<AdminMenu />} />
                        <Route path="/admin/event/:slug/*" element={<DashboardAdmin />} />
                    </Route>

                    <Route element={<Auth roles={["participant"]} />}>
                        <Route path="/next" element={<ParticipantMenu />} />
                        {/* <Route path="/participant/" element={<DashboardUser />} /> */}
                        <Route path="/event/:slug/*" element={<DashboardUser />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/scan" element={<QRScan />} />
                        <Route path="/mission" element={<Mission />} />
                        <Route path="/upload" element={<Upload />} />
                    </Route>
                </Routes>
            </Router>
        </QueryClientProvider>
    );
};

export default App;
