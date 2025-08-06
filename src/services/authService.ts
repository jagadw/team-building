import axios from './api';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await axios.post('/v1/auth/login', payload);

  const data = response.data.data;

  localStorage.setItem('token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);

  return data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');
  window.location.href = '/';
};
