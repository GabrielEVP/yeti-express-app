import {
  PaymentType,
  DeliveryStatus,
  DeliveryPaymentStatus,
} from '@/views/deliveries/domain/enum/';
import { Delivery } from '@/views/deliveries/domain/Delivery';
import { Service } from '@/views/services/domain/service/Service';

export function createDeliveryFormDefaults() {
  const defaultService = new Service(
    '', // id
    '', // name
    '', // description
    0, // price
    0, // price
    false, // category
    [], // subcategory
    new Date(), // createdAt
    new Date() // updatedAt
  );

  return new Delivery(
    '', // id
    '', // number
    new Date(), // date
    DeliveryStatus.PENDING, // status
    PaymentType.FULL, // paymentType
    DeliveryPaymentStatus.PENDING, // paymentStatus
    '', // notes
    defaultService, // service
    null, // client
    null, // clientAddress
    null, // courier
    [], // timeLineContent
    null, // receipt
    null, // debts
    new Date(), // createdAt
    new Date(), // updatedAt
    '', // serviceId
    '', // clientId
    '', // clientAddressId
    '' // courierId
  );
}
