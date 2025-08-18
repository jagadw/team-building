import React from 'react';
import { Link, useParams } from 'react-router-dom';

interface SidebarAdminProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarAdmin: React.FC<SidebarAdminProps> = ({ isOpen, onClose }) => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white transform transition-transform duration-200 ease-in-out 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-0`}
      >
        <div className="p-4 font-bold text-xl flex justify-between items-center">
          Admin
          <button className="md:hidden" onClick={onClose}>✕</button>
        </div>
        <ul className="space-y-3 px-4">
          <li>
            <Link to={`/admin/event/${slug}/teams`} className="hover:text-yellow-400 block">
              Teams
            </Link>
          </li>
          {/* <li>
            <Link to={`/admin/event/${slug}/participants`} className="hover:text-yellow-400 block">
              Participants
            </Link>
          </li> */}
          <li>
            <Link to={`/admin/event/${slug}/checkpoints`} className="hover:text-yellow-400 block">
              Checkpoints
            </Link>
          </li>
          <li>
            <Link to={`/admin/event/${slug}/missions`} className="hover:text-yellow-400 block">
              Missions
            </Link>
          </li>
          <li>
            <Link to={`/admin/event/${slug}/assignments`} className="hover:text-yellow-400 block">
              Assignments
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SidebarAdmin;
