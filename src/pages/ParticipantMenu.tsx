import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EventService, type Event } from "../services/eventService";
import { useQuery } from "@tanstack/react-query";
import { userStore } from "../store/user-store";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ParticipantMenu: React.FC = () => {
    const { data: events, isLoading } = useQuery({
        queryKey: ["participant.events"],
        queryFn: EventService.getParticipantEvents,
    });

    const { user } = userStore();

    const data = events?.data;
    // const [showModal, setShowModal] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100">
            <Card className="shadow-2xl border-0 w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-purple-700 mb-2">Welcome</CardTitle>
                    <CardDescription className="text-lg text-gray-600">
                        You logged in as <span className="text-blue-600 font-semibold">{user?.email}</span>.<br />
                        Please select the event you are in.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {!isLoading && data ? (
                            data.map((event) => (
                                <div key={event.id} className="flex items-center gap-3">
                                    <Link to={`/event/${event.slug}`} className="flex-1">
                                        <Button
                                            variant="gradient"
                                            className="w-full py-4 px-6 rounded-xl flex items-center justify-between"
                                            style={{ background: "linear-gradient(to right, #1E2836, #4F46E5)", color: "#fff" }}
                                        >
                                            <span className="text-lg">{event.name}</span>
                                            <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">{event.slug}</span>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="border-[#1E2836] text-[#1E2836] hover:bg-[#1E2836]/10 transition-colors duration-200 ml-4 rounded-xl"
                                            >
                                                Select
                                            </Button>
                                        </Button>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="flex justify-center items-center h-20">
                                <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mr-2"></span>
                                <span className="text-purple-500 font-medium">Loading...</span>
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="text-center pt-6">
                    <span className="text-xs text-gray-400">Team Building Platform &copy; 2024</span>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ParticipantMenu;
