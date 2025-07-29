import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Event {
  id: number;
  name: string;
  slug: string;
}

interface SidebarAdminProps {
  isOpen: boolean;
  onClose: () => void;
  events: Event[];
}

const SidebarAdmin: React.FC<SidebarAdminProps> = ({ isOpen, onClose, events }) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const toggleDropdown = (eventId: number) => {
    setOpenDropdown((prev) => (prev === eventId ? null : eventId));
  };

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
        <div className="p-4 font-bold text-xl flex justify-between items-center border-b border-gray-700">
          Admin
          <button className="md:hidden" onClick={onClose}>✕</button>
        </div>
        <ul className="space-y-2 px-4 py-2">
          <li><Link to="/admin/teams" className="hover:text-yellow-400 block">Add new event</Link></li>
          {events.map((event) => (
            <li key={event.id}>
              <button
                onClick={() => toggleDropdown(event.id)}
                className="w-full flex justify-between items-center px-2 py-2 rounded hover:bg-gray-800"
              >
                <span>{event.name}</span>
                <span>{openDropdown === event.id ? '▲' : '▼'}</span>
              </button>
              {openDropdown === event.id && (
                <ul className="ml-4 mt-2 space-y-1 text-sm text-gray-300">
                  <li>
                    <Link to={`/admin/${event.slug}/teams`} className="block px-2 py-1 rounded hover:bg-gray-800">Teams</Link>
                  </li>
                  <li>
                    <Link to={`/admin/${event.slug}/participants`} className="block px-2 py-1 rounded hover:bg-gray-800">Participants</Link>
                  </li>
                  <li>
                    <Link to={`/admin/${event.slug}/checkpoints`} className="block px-2 py-1 rounded hover:bg-gray-800">Checkpoints</Link>
                  </li>
                  <li>
                    <Link to={`/admin/${event.slug}/missions`} className="block px-2 py-1 rounded hover:bg-gray-800">Missions</Link>
                  </li>
                  <li>
                    <Link to={`/admin/${event.slug}/assignments`} className="block px-2 py-1 rounded hover:bg-gray-800">Assignments</Link>
                  </li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SidebarAdmin;
