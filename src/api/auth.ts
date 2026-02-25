import { client } from './client';
import type { AuthResponse, User } from '../types';

export const login = (email: string, password: string) =>
  client.post<AuthResponse>('/auth/login', { email, password });

export const signup = (name: string, email: string, password: string) =>
  client.post<AuthResponse>('/auth/register', { name, email, password });

export const getProfile = () =>
  client.get<User>('/auth/profile');

export const refreshToken = (refreshToken: string) =>
  client.post<{ accessToken: string }>('/auth/refresh', { refreshToken });

export const logout = () =>
  client.post('/auth/logout');
