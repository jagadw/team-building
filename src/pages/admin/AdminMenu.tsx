import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Event {
  id: number;
  name: string;
  slug: string;
}

const AdminMenu: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [eventName, setEventName] = useState('');

  useEffect(() => {
    // data dummy
    const dummy = [
      { id: 1, name: 'Event A', slug: 'event-a' },
      { id: 2, name: 'Event B', slug: 'event-b' },
      { id: 3, name: 'Event C', slug: 'event-c' },
    ];
    setEvents(dummy);
  }, []);

  const handleCreateEvent = () => {
    if (!eventName.trim()) return;
    const newSlug = eventName.toLowerCase().replace(/\s+/g, '-');
    const newEvent: Event = {
      id: events.length + 1,
      name: eventName,
      slug: newSlug,
    };
    setEvents([...events, newEvent]);
    setEventName('');
    setShowModal(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center space-y-6">
        <h1 className="text-2xl font-bold">Menu</h1>

        <div className="space-y-4">
          {events.map((event) => (
            <Link
              key={event.id}
              to={`/admin/event/${event.slug}/dashboard`}
              className="block bg-blue-600 text-white py-3 rounded-2xl hover:bg-blue-700 transition font-medium"
            >
              {event.name}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="mt-6 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition"
        >
         Create new event
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg space-y-4">
            <h2 className="text-xl font-bold">Create New Event</h2>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Nama Event"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateEvent}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMenu;
