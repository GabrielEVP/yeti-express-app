import { apiClient } from '@/services/';
import type { DashboardStats } from '../models';

export const getStats = async (params: { period?: string; date?: string }): Promise<DashboardStats> => {
  const response = await apiClient.get('/dashboard', { params });
  return response.data;
};

export const getReportStats = async (startDate: string, endDate: string): Promise<any> => {
  const response = await apiClient.get('dashboard/report', {
    params: {
      start_date: startDate,
      end_date: endDate,
    },
    responseType: 'blob',
  });
  return response.data;
};

export const getReportsimplifiedStats = async (startDate: string, endDate: string): Promise<any> => {
  const response = await apiClient.get('dashboard/simplified-report', {
    params: {
      start_date: startDate,
      end_date: endDate,
    },
    responseType: 'blob',
  });
  return response.data;
};
