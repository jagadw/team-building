import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents, createEvent, deleteEvent, type Event } from '../../services/eventService';

const AdminMenu: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');

  const loadEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch events', error);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleCreateEvent = async () => {
    if (!eventName.trim()) return;

    const payload = {
      name: eventName,
      description: description || '-',
      slug: eventName.toLowerCase().replace(/\s+/g, '-'),
      is_hidden: false,
    };

    try {
      const newEvent = await createEvent(payload);
      setEvents([...events, newEvent]);
      setEventName('');
      setDescription('');
      setShowModal(false);
    } catch (error) {
      console.error('Failed to create event', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this event?')) return;

    try {
      await deleteEvent(id);
      setEvents(events.filter((e) => e.id !== id));
    } catch (error) {
      console.error('Failed to delete event', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center space-y-6">
        <h1 className="text-2xl font-bold">Menu</h1>

        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="flex items-center justify-between bg-blue-100 px-4 py-2 rounded-lg">
              <Link
                to={`/admin/event/${event.slug}/dashboard`}
                className="text-blue-800 font-medium hover:underline"
              >
                {event.name}
              </Link>
              <button
                onClick={() => handleDelete(event.id)}
                className="text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </div>
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
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Deskripsi Event"
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
