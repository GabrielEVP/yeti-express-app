import { apiClient } from '@/services/';
import type { DashboardStats } from '../models';

export const getStats = async (params: { period?: string; date?: string }): Promise<DashboardStats> => {
  const response = await apiClient.get('/dashboard', { params });
  return response.data;
};
