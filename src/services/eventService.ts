import axios from "./api";
import type { ApiResponse } from "./types.api";

export interface Event {
    id: number;
    name: string;
    description: string;
    slug: string;
    is_hidden: boolean;
    deleted_at: string | null;
}

export const getEvents = async (): Promise<Event[]> => {
    const response = await axios.get(`/v1/admin/events`);
    return response.data.data;
};

export const createEvent = async (payload: Partial<Event>): Promise<Event> => {
    const response = await axios.post(`/v1/admin/events`, payload);
    return response.data.data;
};

export const deleteEvent = async (id: number): Promise<void> => {
    await axios.delete(`/v1/admin/events/${id}`);
};

export namespace Res {
    export interface Event {
        id: number;
        name: string;
        description: string;
        slug: string;
        is_hidden: boolean;
        deleted_at: null;
    }
}

export namespace EventService {
    export async function getParticipantEvents() {
        const x = await axios.get<ApiResponse<Event[]>>("/v1/participant/events/");

        return x.data;
    }
}
