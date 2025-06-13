import { apiClient } from '@/services/';
import { Delivery, adaptDelivery, adaptDeliveryForApi } from '@/views/deliveries/';

export const deliveryApiRoutes = {
  base: '/deliveries',
  getById: (id: string | number) => `/deliveries/${id}`,
  update: (id: string | number) => `/deliveries/${id}`,
  delete: (id: string | number) => `/deliveries/${id}`,
  search: (query: string) => `/deliveries/search/${query}`,
  filter: '/deliveries/filter',
  byClient: (clientId: string | number) => `/deliveries/clients/${clientId}`,
  byCourier: (courierId: string | number) => `/deliveries/couriers/${courierId}`,
  updateStatus: (deliveryId: string | number) => `/deliveries/${deliveryId}/status`,
  storeClientPayment: (deliveryId: string | number) => `/deliveries/${deliveryId}/client-payments`,
  getTicket: (deliveryId: string | number) => `/deliveries/${deliveryId}/ticket`,

  status: {
    received: '/deliveries/status/received',
    cancelled: '/deliveries/status/cancelled',
    pending: '/deliveries/status/pending',
    inTransit: '/deliveries/status/in-transit',
  },
  payment: {
    pending: '/deliveries/payment/pending',
    partiallyPaid: '/deliveries/payment/partially-paid',
    paid: '/deliveries/payment/paid',
  },
  withDebt: '/deliveries/with-debt',
  withDebtByClient: (clientId: string | number) => `/deliveries/with-debt/client/${clientId}`,
};

export const getAllDeliveries = async (): Promise<Delivery[]> => {
  const response = await apiClient.get(deliveryApiRoutes.base);
  return Array.isArray(response.data) ? response.data.map(adaptDelivery) : [adaptDelivery(response.data)];
};

export const getDeliveryById = async (deliveryId: string | number): Promise<Delivery> => {
  const response = await apiClient.get(deliveryApiRoutes.getById(deliveryId));
  return adaptDelivery(response.data);
};

export const createDelivery = async (data: Delivery): Promise<Delivery> => {
  const payload = adaptDeliveryForApi(data);
  const response = await apiClient.post(deliveryApiRoutes.base, payload);
  return adaptDelivery(response.data);
};

export const updateDelivery = async (data: Delivery, deliveryId: string | number): Promise<Delivery> => {
  const payload = adaptDeliveryForApi(data);
  const response = await apiClient.put(deliveryApiRoutes.update(deliveryId), payload);
  return adaptDelivery(response.data);
};

export const deleteDeliveryById = async (deliveryId: string | number): Promise<void> => {
  await apiClient.delete(deliveryApiRoutes.delete(deliveryId));
};

export const searchDeliveries = async (query: string): Promise<Delivery[]> => {
  const response = await apiClient.get(deliveryApiRoutes.search(query));
  return Array.isArray(response.data) ? response.data.map(adaptDelivery) : [adaptDelivery(response.data)];
};

export const getFilteredDeliveries = async (params: Record<string, any>): Promise<Delivery[]> => {
  const response = await apiClient.get(deliveryApiRoutes.filter, { params });
  return Array.isArray(response.data) ? response.data.map(adaptDelivery) : [adaptDelivery(response.data)];
};

export const getDeliveriesByClient = async (clientId: string | number): Promise<Delivery[]> => {
  const response = await apiClient.get(deliveryApiRoutes.byClient(clientId));
  return response.data.map(adaptDelivery);
};

export const getDeliveriesByCourier = async (courierId: string | number): Promise<Delivery[]> => {
  const response = await apiClient.get(deliveryApiRoutes.byCourier(courierId));
  return response.data.map(adaptDelivery);
};

export const updateDeliveryStatus = async (deliveryId: string | number, status: string): Promise<void> => {
  await apiClient.put(deliveryApiRoutes.updateStatus(deliveryId), { status });
};

export const storeClientPayment = async (deliveryId: string | number, payload: { amount: number; method: string }): Promise<void> => {
  await apiClient.post(deliveryApiRoutes.storeClientPayment(deliveryId), payload);
};

export const getDeliveryTicket = async (deliveryId: string | number): Promise<Blob> => {
  const response = await apiClient.get(deliveryApiRoutes.getTicket(deliveryId), { responseType: 'blob' });
  return response.data;
};

// Estado de entregas
export const getReceivedDeliveries = async (): Promise<Delivery[]> => {
  const response = await apiClient.get(deliveryApiRoutes.status.received);
  return response.data.map(adaptDelivery);
};

export const getCancelledDeliveries = async (): Promise<Delivery[]> => {
  const response = await apiClient.get(deliveryApiRoutes.status.cancelled);
  return response.data.map(adaptDelivery);
};

export const getPendingDeliveries = async (): Promise<Delivery[]> => {
  const response = await apiClient.get(deliveryApiRoutes.status.pending);
  return response.data.map(adaptDelivery);
};

export const getInTransitDeliveries = async (): Promise<Delivery[]> => {
  const response = await apiClient.get(deliveryApiRoutes.status.inTransit);
  return response.data.map(adaptDelivery);
};

// Estado de pagos
export const getPaymentPendingDeliveries = async (): Promise<Delivery[]> => {
  const response = await apiClient.get(deliveryApiRoutes.payment.pending);
  return response.data.map(adaptDelivery);
};

export const getPartiallyPaidDeliveries = async (): Promise<Delivery[]> => {
  const response = await apiClient.get(deliveryApiRoutes.payment.partiallyPaid);
  return response.data.map(adaptDelivery);
};

export const getPaidDeliveries = async (): Promise<Delivery[]> => {
  const response = await apiClient.get(deliveryApiRoutes.payment.paid);
  return response.data.map(adaptDelivery);
};

// Deudas
export const getDeliveriesWithDebt = async (): Promise<Delivery[]> => {
  const response = await apiClient.get(deliveryApiRoutes.withDebt);
  return response.data.map(adaptDelivery);
};

export const getDeliveriesWithDebtByClient = async (clientId: string | number): Promise<Delivery[]> => {
  const response = await apiClient.get(deliveryApiRoutes.withDebtByClient(clientId));
  return response.data.map(adaptDelivery);
};
