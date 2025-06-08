import type { ICourierRepository } from '@/views/couriers/domain/ICourierRepository';
import type { Courier } from '@/views/couriers/domain/Courier';
import { CourierApi } from '@views/couriers/infrastructure/Courier.Api';
import { CourierApiAdapter } from '@/views/couriers/adapters';

export class CourierRepositoryImpl implements ICourierRepository {
  async getAll(): Promise<Courier[]> {
    const response = await CourierApi.getAll();
    return response.map((courier) => CourierApiAdapter.fromApi(courier));
  }

  async getById(id: string): Promise<Courier | null> {
    try {
      const response = await CourierApi.getById(id);
      return CourierApiAdapter.fromApi(response);
    } catch (error) {
      return null;
    }
  }

  async create(courier: Courier): Promise<Courier> {
    const payload = CourierApiAdapter.toApi(courier);
    const response = await CourierApi.create(payload);
    return CourierApiAdapter.fromApi(response);
  }

  async update(id: string, courier: Courier): Promise<Courier> {
    const payload = CourierApiAdapter.toApi(courier);
    const response = await CourierApi.update(id, payload);
    return CourierApiAdapter.fromApi(response);
  }

  async delete(id: string): Promise<void> {
    await CourierApi.delete(id);
  }

  async search(query: string): Promise<Courier[]> {
    const response = await CourierApi.search(query);
    return response.map((courier) => CourierApiAdapter.fromApi(courier));
  }
}
