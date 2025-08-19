import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";

interface SidebarUserProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    { to: "progress", label: "My Progress", icon: "📈" },
    { to: "scan", label: "QR Scan", icon: "🔍" },
    { to: "missions", label: "All Missions", icon: "🗂️" },
    { to: "upload", label: "Upload Assignment", icon: "📤" },
];

const SidebarUser: React.FC<SidebarUserProps> = ({ isOpen, onClose }) => {
    const { slug } = useParams();
    const location = useLocation();

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-gradient-to-br from-black via-gray-800 to-gray-900 bg-opacity-70 z-30 md:hidden"
                    onClick={onClose}
                ></div>
            )}

            {/* Sidebar for desktop & mobile */}
            <div
                className={`fixed top-0 inset-y-0 left-0 z-40 w-72 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white shadow-2xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:inset-0`}
            >
                <div className="p-6 font-extrabold text-2xl flex justify-between items-center border-b border-gray-700">
                    <span className="flex items-center gap-2">
                        <span className="bg-yellow-400 text-gray-900 rounded-full px-3 py-1 text-lg shadow-md">Team</span>
                    </span>
                    <button
                        className="md:hidden text-gray-400 hover:text-yellow-400 transition-colors text-2xl"
                        onClick={onClose}
                        aria-label="Close sidebar"
                    >
                        ✕
                    </button>
                </div>
                <ul className="space-y-4 px-6 py-8">
                    {menuItems.map((item) => {
                        const to = `/event/${slug}/${item.to}`;
                        const isActive = location.pathname === to;
                        return (
                            <li key={item.to}>
                                <Link
                                    to={to}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors shadow hover:scale-105 active:scale-95
                                        ${isActive
                                            ? "bg-yellow-400 text-gray-900"
                                            : "bg-gray-800 hover:bg-yellow-400 hover:text-gray-900"
                                        }`}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    <span className="font-semibold">{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <div className="absolute bottom-0 left-0 w-full px-6 py-4 border-t border-gray-700 text-sm text-gray-400">
                    <span>© 2024 Team Building</span>
                </div>
            </div>

            {/* Bottom Navbar for mobile */}
            <nav className="fixed bottom-0 left-0 w-full bg-gray-900 text-white shadow-t flex justify-between items-center px-6 py-2 z-50 md:hidden">
                <Link to={`/event/${slug}/progress`} className="flex-1 text-center hover:text-yellow-300">
                    My Progress
                </Link>

                <Link
                    to={`/event/${slug}/scan`}
                    className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-400 text-gray-900 rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-500"
                >
                    📷
                </Link>

                <div className="flex-1 flex justify-end space-x-4">
                    <Link to={`/event/${slug}/missions`} className="hover:text-yellow-300">
                        All Missions
                    </Link>
                    {/* <Link to={`/event/${slug}/upload`} className="hover:text-yellow-300">
                        Upload
                    </Link> */}
                </div>
            </nav>
        </>
    );
};

export default SidebarUser;
