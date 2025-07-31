import React from 'react';
import { Link, useParams } from 'react-router-dom';

interface SidebarUserProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarUser: React.FC<SidebarUserProps> = ({ isOpen, onClose }) => {
  const { slug } = useParams(); // ambil slug dari URL

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
        ></div>
      )}

      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white transform transition-transform duration-200 ease-in-out 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-0`}
      >
        <div className="p-4 font-bold text-xl flex justify-between items-center">
          Team
          <button className="md:hidden" onClick={onClose}>✕</button>
        </div>
        <ul className="space-y-3 px-4">
          <li>
            <Link to={`/user/event/${slug}/progress`} className="hover:text-yellow-300 block">My Progress</Link>
          </li>
          <li>
            <Link to={`/user/event/${slug}/scan`} className="hover:text-yellow-300 block">QR Scan</Link>
          </li>
          <li>
            <Link to={`/user/event/${slug}/missions`} className="hover:text-yellow-300 block">All Missions</Link>
          </li>
          <li>
            <Link to={`/user/event/${slug}/upload`} className="hover:text-yellow-300 block">Upload Assignment</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SidebarUser;
