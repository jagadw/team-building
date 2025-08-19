import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents, createEvent, deleteEvent, type Event } from "../../services/eventService";
import { logout } from "../../services/authService";
import { userStore } from "../../store/user-store";

const AdminMenu: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");

  const { user } = userStore();

  const loadEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error("Failed to fetch events", error);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleCreateEvent = async () => {
    if (!eventName.trim()) return;

    const payload = {
      name: eventName,
      description: description || "-",
      slug: eventName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-"),
      is_hidden: false,
    };

    try {
      await createEvent(payload);
      await loadEvents();
      setEventName("");
      setDescription("");
      setShowModal(false);
    } catch (error) {
      console.error("Failed to create event", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this event?")) return;

    try {
      await deleteEvent(id);
      setEvents(events.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Failed to delete event", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 inset-y-0 left-0 z-40 w-72 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white shadow-2xl transform transition-transform duration-300 ease-in-out`}
      >
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-purple-200">Admin Menu</h2>
          <nav className="space-y-4">
            <Link
              to="/adminmenu"
              className="block py-2 px-4 rounded-lg hover:bg-purple-700 hover:text-white transition"
            >
              Dashboard
            </Link>
            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg shadow font-bold hover:scale-105 transition"
            >
              + Create Event
            </button>
            <button
              onClick={logout}
              className="w-full mt-6 bg-gray-700 text-purple-200 px-4 py-2 rounded-lg shadow hover:bg-purple-900 transition"
            >
              Logout
            </button>
          </nav>
          {user && (
            <div className="mt-8 text-sm text-purple-300 bg-gray-800 px-3 py-2 rounded-lg">
              {user.email}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-4xl mt-10 ml-80">
        {/* Header */}
        <div className="flex justify-between items-center bg-white shadow-lg px-8 py-6 rounded-t-3xl border-b-4 border-purple-300">
          <h1 className="text-3xl font-extrabold text-purple-700 tracking-wide">Events</h1>
        </div>

        {/* Body */}
        <div className="bg-white shadow-2xl rounded-b-3xl p-10 mt-0 w-full max-w-lg mx-auto text-center space-y-8 border-t-4 border-purple-200">
          <div className="space-y-4">
            {events.length === 0 ? (
              <div className="text-gray-400 italic">No events yet. Create one!</div>
            ) : (
              events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 px-5 py-3 rounded-xl shadow-md hover:shadow-xl transition"
                >
                  <Link
                    to={`/admin/event/${event.slug}/dashboard`}
                    className="text-purple-800 font-semibold text-lg hover:underline hover:text-pink-600 transition"
                  >
                    {event.name}
                  </Link>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="text-red-500 hover:text-red-700 text-xl font-bold px-2 py-1 rounded-full hover:bg-red-100 transition"
                    title="Delete event"
                  >
                    &times;
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl space-y-6 border-2 border-purple-300">
            <h2 className="text-2xl font-bold text-purple-700 mb-2">Create New Event</h2>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full border-2 border-purple-200 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400 transition"
              placeholder="Event Name"
              autoFocus
            />
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-2 border-purple-200 rounded-lg px-4 py-2 focus:outline-none focus:border-pink-400 transition"
              placeholder="Event Description"
            />
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateEvent}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow hover:scale-105 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 shadow-lg">
        <div className="flex justify-around items-center py-3 px-4 text-white font-semibold text-lg">
          <Link
            to="/adminmenu"
            className="flex flex-col items-center hover:text-yellow-200 transition"
          >
            <span className="material-icons">🖥️</span>
            Dashboard
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className="flex flex-col items-center hover:text-yellow-200 transition focus:outline-none"
          >
            <span className="material-icons">➕</span>
            Create
          </button>
          <Link
            to="/admin/events"
            className="flex flex-col items-center hover:text-yellow-200 transition"
          >
            <span className="material-icons">📃</span>
            Events
          </Link>
          <button
            onClick={logout}
            className="flex flex-col items-center hover:text-yellow-200 transition focus:outline-none"
          >
            <span className="material-icons">🚪</span>
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AdminMenu;
