import axios, { AxiosInstance } from 'axios';
import { FACTORY_USER_URL } from '../config/factory-user.config';

export function roleApi(token?: string): AxiosInstance {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = token;
  }

  return axios.create({
    baseURL: FACTORY_USER_URL,
    headers,
  });
}
