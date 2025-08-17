import api from './api';

const participantEndpoint = '/v1/admin/participants';
const teamEndpoint = '/v1/admin/teams';

const participantService = {
  getAll: async () => {
    return api.get(participantEndpoint);
  },
  getById: async (id: number) => {
    return api.get(`${participantEndpoint}/${id}`);
  },
  create: async (data: any) => {
    return api.post(participantEndpoint, data);
  },
  update: async (id: number, data: any) => {
    return api.put(`${participantEndpoint}/${id}`, data);
  },
  delete: async (id: number) => {
    return api.delete(`${participantEndpoint}/${id}`);
  },
  getTeams: async () => {
    return api.get(teamEndpoint);
  },
  createTeamWithParticipants: async (teamData: {
    name: string;
    event_id: number;
    user: { email: string; password: string };
    participants: { name: string; phone: string; is_leader: boolean }[];
  }) => {
    return api.post(teamEndpoint, teamData);
  }
};

export default participantService;
