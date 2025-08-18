import api from "./api";
import type { IApiResponse } from "./types.api";
export interface Checkpoint {
    id: number;
    name: string;
    description: string;
    slug: string;
    location: string;
    point: number;
    event_id: number;
}

export const getCheckpoints = async (): Promise<Checkpoint[]> => {
    const response = await api.get("/v1/admin/checkpoints");
    return response.data.data;
};

export const createCheckpoint = async (data: Omit<Checkpoint, "id">): Promise<Checkpoint> => {
    const response = await api.post("/v1/admin/checkpoints", data);
    return response.data.data;
};

export const updateCheckpoint = async (id: number, data: Omit<Checkpoint, "id">): Promise<Checkpoint> => {
    const response = await api.put(`/v1/admin/checkpoints/${id}`, data);
    return response.data.data;
};

export const deleteCheckpoint = async (id: number): Promise<void> => {
    await api.delete(`/v1/admin/checkpoints/${id}`);
};

export namespace Res {
    export interface Checkpoint {
        id: number;
        name: string;
        description: string;
        location: string;
        point: number;
        slug: string;
        missions: Mission[];
        step: number;
        is_final: boolean;
        scanned_at: string;
    }

    interface Mission {
        id: number;
        name: string;
        slug: string;
        description: string;
        point: number;
        is_completed: boolean;
        video: string;
    }
}

export namespace Req {}

export namespace CheckpointService {
    export const getCheckpointBySlug = async (slug: string, checkpoint: string) => {
        const response = await api.get<IApiResponse<Res.Checkpoint>>(`/v1/participant/events/${slug}/checkpoints/${checkpoint}`);
        return response.data;
    };

    export const scanCheckpoint = async (slug: string, checkpoint: string) => {
        const response = await api.post<IApiResponse<never>>(`/v1/participant/events/${slug}/checkpoints/${checkpoint}`);
        return response.data;
    };
}
