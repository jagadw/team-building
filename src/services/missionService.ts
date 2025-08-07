import api from './api';

export interface Mission {
  id: number;
  name: string;
  description: string;
  slug: string;
  checkpoint: string;
  point: number;
  video: string;
  is_hidden: boolean;
}

export const getMissions = async (): Promise<Mission[]> => {
  const res = await api.get('/v1/admin/missions');
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
