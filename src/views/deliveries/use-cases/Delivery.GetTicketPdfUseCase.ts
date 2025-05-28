import type { IDeliveryRepository } from '@/views/deliveries/domain/IDeliveryRepository';

export class GetDeliveryTicketPDFUseCase {
  constructor(private deliveryRepo: IDeliveryRepository) {}

  async execute(id: string): Promise<Blob> {
    if (!id) throw new Error('Delivery ID is required');
    return await this.deliveryRepo.getTicketPDF(id);
  }
}
