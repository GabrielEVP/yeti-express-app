import { DashboardApi } from '../infrastructure/Dashboard.Api';
import type { DashboardStats } from '../domain/DashboardStats';

export class GetDashboardStatsUseCase {
  constructor(private readonly api: typeof DashboardApi) {}

  async execute(params: { period?: string; date?: string }): Promise<DashboardStats> {
    return await this.api.getStats(params);
  }
}
