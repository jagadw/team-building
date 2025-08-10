import api from './api';

export interface Mission {
  id: number;
  name: string;
  description: string;
  slug: string;
  checkpoint_id: number;
  point: number;
  video: string;
  is_hidden: boolean;
}

export interface Checkpoint {
  id: number;
  name: string;
}

export const getMissions = async (): Promise<Mission[]> => {
  const res = await api.get('/v1/admin/missions');
  return res.data.data;
};

export const getCheckpoints = async (): Promise<Checkpoint[]> => {
  const res = await api.get('/v1/admin/checkpoints');
  return res.data.data;
};

export const createMission = async (mission: Partial<Mission>) => {
  return await api.post('/v1/admin/missions', mission);
};

export const updateMission = async (id: number, mission: Partial<Mission>) => {
  return await api.put(`/v1/admin/missions/${id}`, mission);
};

export const deleteMission = async (id: number) => {
  return await api.delete(`/v1/admin/missions/${id}`);
};
