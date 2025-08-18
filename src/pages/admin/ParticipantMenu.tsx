import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents, type Event } from "../../services/eventService";

const ParticipantMenu: React.FC = () => {
	const [events, setEvents] = useState<Event[]>([]);
	// const [showModal, setShowModal] = useState(false);

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

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center space-y-6">
				<h1 className="text-2xl font-bold">Menu</h1>

				<div className="space-y-4">
					{events.map((event) => (
						<div key={event.id} className="flex items-center justify-between bg-blue-100 px-4 py-2 rounded-lg">
							<Link to={`/admin/event/${event.slug}/dashboard`} className="text-blue-800 font-medium hover:underline">
								{event.name}
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ParticipantMenu;
