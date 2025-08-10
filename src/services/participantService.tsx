import api from './api';

const endpoint = '/v1/admin/participants';

const participantService = {
  getAll: async () => {
    return api.get(endpoint);
  },
  getById: async (id: number) => {
    return api.get(`${endpoint}/${id}`);
  },
  create: async (data: any) => {
    return api.post(endpoint, data);
  },
  update: async (id: number, data: any) => {
    return api.put(`${endpoint}/${id}`, data);
  },
  delete: async (id: number) => {
    return api.delete(`${endpoint}/${id}`);
  }
};

export default participantService;
