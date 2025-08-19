import React from "react";
import { Link, useParams } from "react-router-dom";

interface SidebarUserProps {
    isOpen: boolean;
    onClose: () => void;
}

const SidebarUser: React.FC<SidebarUserProps> = ({ isOpen, onClose }) => {
    const { slug } = useParams();

    return (
        <>
            {/* Sidebar overlay for mobile */}
            {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={onClose}></div>}

            {/* Sidebar for desktop & mobile */}
            <div
                className={`fixed top-0 inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white transform transition-transform duration-200 ease-in-out 
                ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:inset-0`}
            >
                <div className="p-4 font-bold text-xl flex justify-between items-center">
                    Team
                    <button className="md:hidden" onClick={onClose}>
                        ✕
                    </button>
                </div>
                <ul className="space-y-3 px-4 md:block hidden">
                    <li>
                        <Link to={`/event/${slug}/progress`} className="hover:text-yellow-300 block">
                            My Progress
                        </Link>
                    </li>
                    <li>
                        <Link to={`/event/${slug}/scan`} className="hover:text-yellow-300 block">
                            QR Scan
                        </Link>
                    </li>
                    <li>
                        <Link to={`/event/${slug}/missions`} className="hover:text-yellow-300 block">
                            All Missions
                        </Link>
                    </li>
                    {/* <li>
                        <Link to={`/event/${slug}/upload`} className="hover:text-yellow-300 block">
                            Upload Assignment
                        </Link>
                    </li> */}
                </ul>
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
