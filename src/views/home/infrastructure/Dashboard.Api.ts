import { apiClient } from '@/services/';
import type { DashboardStats } from '../domain/DashboardStats';

export const DashboardApi = {
  async getStats(params: { period?: string; date?: string }): Promise<DashboardStats> {
    const response = await apiClient.get('/dashboard', { params });
    return response.data;
  },
};
