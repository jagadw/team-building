import api from './api';
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
  const response = await api.get('/v1/admin/checkpoints');
  return response.data.data;
};

export const createCheckpoint = async (data: Omit<Checkpoint, 'id'>): Promise<Checkpoint> => {
  const response = await api.post('/v1/admin/checkpoints', data);
  return response.data.data;
};

export const updateCheckpoint = async (id: number, data: Omit<Checkpoint, 'id'>): Promise<Checkpoint> => {
  const response = await api.put(`/v1/admin/checkpoints/${id}`, data);
  return response.data.data;
};

export const deleteCheckpoint = async (id: number): Promise<void> => {
  await api.delete(`/v1/admin/checkpoints/${id}`);
};
