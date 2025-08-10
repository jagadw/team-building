import axios from './api';

export interface Event {
  id: number;
  name: string;
  description: string;
  slug: string;
  is_hidden: boolean;
  deleted_at: string | null;
}

export interface Participant {
  id: number;
  name: string;
  phone: string;
  is_leader: boolean;
  team_id: number;
}

export interface Team {
  id: number;
  name: string;
  slug: string;
  user_id: number;
  event_id: number;
  deleted_at: string | null;
  event: Event;
  participants: Participant[];
}

export const getTeams = async (eventSlug: string): Promise<Team[]> => {
  const response = await axios.get(`/v1/admin/teams?page=1`);
  return response.data.data;
};

export const createTeam = async (payload: Partial<Team>): Promise<void> => {
  await axios.post(`/v1/admin/teams`, payload);
};

export const updateTeam = async (id: number, payload: Partial<Team>): Promise<void> => {
  await axios.put(`/v1/admin/teams/${id}`, payload);
};

export const deleteTeam = async (id: number): Promise<void> => {
  await axios.delete(`/v1/admin/teams/${id}`);
};
