import { Delivery } from '@/views/deliveries/domain/Delivery';
import {
  DeliveryStatus,
  PaymentType,
  DeliveryPaymentStatus,
} from '@/views/deliveries/domain/enum/';
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
    DeliveryPaymentStatus.PENDING,
    '',
    createDefaultService(),
    createDefaultClient(),
    createDefaultClientAddress(),
    createDefaultCourier(),
    [],
    new DeliveryReceipt('', '', '', ''),
    new Date().toISOString(),
    new Date().toISOString(),
    '',
    '',
    '',
    ''
  );
};
