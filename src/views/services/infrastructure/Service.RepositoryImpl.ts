import type { IServiceRepository } from '@/views/services/domain/IServiceRepository';
import type { Service } from '@views/services/domain/service/Service';
import { ServiceApi } from '@/views/services/infrastructure/Service.Api';
import { ServiceApiAdapter } from '@/views/services/adapters';

export class ServiceRepositoryImpl implements IServiceRepository {
  async getAll(): Promise<Service[]> {
    const response = await ServiceApi.getAll();
    return response.map((service) => ServiceApiAdapter.fromApi(service));
  }

  async getById(id: string): Promise<Service | null> {
    try {
      const response = await ServiceApi.getById(id);
      return ServiceApiAdapter.fromApi(response);
    } catch (error) {
      return null;
    }
  }

  async create(service: Service): Promise<Service> {
    const payload = ServiceApiAdapter.toApi(service);
    const response = await ServiceApi.create(payload);
    return ServiceApiAdapter.fromApi(response);
  }

  async update(id: string, service: Service): Promise<Service> {
    const payload = ServiceApiAdapter.toApi(service);
    const response = await ServiceApi.update(id, payload);
    return ServiceApiAdapter.fromApi(response);
  }

  async delete(id: string): Promise<void> {
    await ServiceApi.delete(id);
  }

  async search(query: string): Promise<Service[]> {
    const response = await ServiceApi.search(query);
    return response.map((service) => ServiceApiAdapter.fromApi(service));
  }
}
