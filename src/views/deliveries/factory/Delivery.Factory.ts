import { Delivery } from '@/views/deliveries/domain/Delivery';
import { DeliveryStatus, PaymentType } from '@/views/deliveries/domain/';
import { DeliveryReceipt } from '@/views/deliveries/domain/DeliveryReceipt';
import { createDefaultClient, createDefaultClientAddress } from '@views/clients';
import { createDefaultCourier } from '@views/couriers';
import { createDefaultService } from '@views/services';

export const createDefaultDelivery = (): Delivery => {
  return new Delivery(
    '',
    '',
    new Date().toISOString(),
    DeliveryStatus.PENDING,
    PaymentType.PARTIAL,
    '',
    createDefaultService(),
    createDefaultClient(),
    createDefaultClientAddress(),
    createDefaultCourier(),
    [],
    new DeliveryReceipt('', '', '', '', '', '', '', '', ''),
    [],
    [],
    new Date().toISOString(),
    new Date().toISOString()
  );
};
