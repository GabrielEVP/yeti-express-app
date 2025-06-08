import { DeliveryReceipt } from '@/views/deliveries/domain/DeliveryReceipt';

export class DeliveryReceiptApiAdapter extends DeliveryReceipt {
  static fromApi(apiData: any): DeliveryReceipt | null {
    if (!apiData) return null;

    return new DeliveryReceipt(
      apiData.id ?? '',
      apiData.full_name ?? '',
      apiData.phone ?? '',
      apiData.address ?? ''
    );
  }

  static toApi(deliveryReceipt: DeliveryReceipt): any {
    if (!deliveryReceipt) return null;

    return {
      id: deliveryReceipt.getId(),
      full_name: deliveryReceipt.getFullName(),
      phone: deliveryReceipt.getPhone(),
      address: deliveryReceipt.getAddress(),
    };
  }
}
