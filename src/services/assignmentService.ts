import api from './api';

export interface Team {
  id: number;
  name: string;
  event_id: number;
}

export interface Checkpoint {
  id: number;
  name: string;
  event_id: number;
}

export interface Mission {
  id: number;
  name: string;
  checkpoint_id: number;
  checkpoint: Checkpoint;
}

export interface Assignment {
  id: number;
  team_id: number;
  mission_id: number;
  file: string;
  created_at: string;
  newest: boolean;
  team: Team;
  mission: Mission;
}

export interface AssignmentResponse {
  data: Assignment[];
  pagination: {
    page: number;
    total_size: number;
    total_count: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
  };
  success: boolean;
}

export const getAssignments = async (page = 1): Promise<AssignmentResponse> => {
  const res = await api.get(`/v1/admin/assignments?page=${page}`);
  return res.data;
};
