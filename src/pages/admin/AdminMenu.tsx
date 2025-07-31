import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Event {
  id: number;
  name: string;
  slug: string;
}

const AdminMainMenu: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Nanti ambil dari api ato db
    const dummy = [
      { id: 1, name: 'Event A', slug: 'event-a' },
      { id: 2, name: 'Event B', slug: 'event-b' },
      { id: 3, name: 'Event C', slug: 'event-c' },
    ];
    setEvents(dummy);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center space-y-6">
        <h1 className="text-2xl font-bold">Menu</h1>
        <div className="space-y-4">
          {events.map((event) => (
            <Link
              key={event.id}
              to={`/admin/${event.slug}/dashboard`}
              className="block bg-blue-600 text-white py-3 rounded-2xl hover:bg-blue-700 transition font-medium"
            >
              {event.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminMainMenu;
