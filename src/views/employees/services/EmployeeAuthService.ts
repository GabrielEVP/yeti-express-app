import { apiClient } from '@/services';
import { Employee } from '../domain/Employee';

interface EmployeeResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
  user_id: number;
  created_at: string;
  updated_at: string;
}

interface LoginResponse {
  access_token: string;
  token_type: string;
  employee: EmployeeResponse;
}

export async function loginEmployee(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await apiClient.post('/employee/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function logoutEmployee(): Promise<void> {
  try {
    await apiClient.post('/employee/logout');
  } catch (error) {
    throw error;
  }
}

export async function getCurrentEmployee(): Promise<EmployeeResponse> {
  try {
    const response = await apiClient.get('/employee/me');
    return response.data;
  } catch (error) {
    throw error;
  }
}
