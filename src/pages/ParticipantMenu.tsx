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
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome</CardTitle>
                    <CardDescription>
                        You logged as <span className="text-blue-600">{user?.email}</span>. Please select the event you are in.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {!isLoading && data
                            ? data.map((event) => (
                                  <Button key={event.id} className="flex items-center justify-between w-full px-4 py-2 rounded-lg">
                                      <Link to={`/event/${event.slug}`} className="text-blue-800600 font-medium hover:underline w-full">
                                          {event.name}
                                      </Link>
                                  </Button>
                              ))
                            : "Loading..."}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ParticipantMenu;
