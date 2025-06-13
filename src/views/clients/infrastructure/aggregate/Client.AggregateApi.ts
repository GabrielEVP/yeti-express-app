import { apiClient } from '@/services/';

export const clientAggregateApiRoutes = {
  getById: (id: string) => `/clients/${id}`,
  getTimeLineContent: (id: string) => `/clients/${id}/events`,
  getAddresses: (id: string) => `/clients/${id}/addresses`,
  getEmails: (id: string) => `/clients/${id}/emails`,
  getPhones: (id: string) => `/clients/${id}/phones`,
  getDeliveries: (id: string) => `/clients/${id}/deliveries`,
  getDebts: (id: string) => `/clients/${id}/debts`,
  getDebtReport: (id: string) => `/clients/${id}/debt-report`,
  getTotalInvoiced: (id: string) => `/clients/${id}/total-invoiced`,
  getEarningsDelivery: (id: string) => `/clients/${id}/earnings-delivery`,
  getPendingEarnings: (id: string) => `/clients/${id}/pending-earnings`,
  getPendingEarningsCount: (id: string) => `/clients/${id}/pending-earnings-count`,
  getEarningsDeliveryOfCurrentMonth: (id: string) => `/clients/${id}/earnings-delivery-current-month`,
};

export const ClientAggregateApi = {
  async getById(id: string) {
    const response = await apiClient.get(clientAggregateApiRoutes.getById(id));
    return response.data;
  },

  async getTimeLineContent(id: string) {
    const response = await apiClient.get(clientAggregateApiRoutes.getTimeLineContent(id));
    return response.data;
  },

  async getAddresses(id: string) {
    const response = await apiClient.get(clientAggregateApiRoutes.getAddresses(id));
    return response.data;
  },

  async getEmails(id: string) {
    const response = await apiClient.get(clientAggregateApiRoutes.getEmails(id));
    return response.data;
  },

  async getPhones(id: string) {
    const response = await apiClient.get(clientAggregateApiRoutes.getPhones(id));
    return response.data;
  },

  async getDeliveries(id: string) {
    const response = await apiClient.get(clientAggregateApiRoutes.getDeliveries(id));
    return response.data;
  },

  async getDebts(id: string) {
    const response = await apiClient.get(clientAggregateApiRoutes.getDebts(id));
    return response.data;
  },

  async getDebtReport(id: string): Promise<Blob> {
    const response = await apiClient.get(clientAggregateApiRoutes.getDebtReport(id), {
      responseType: 'blob',
    });
    return response.data;
  },

  async getTotalInvoiced(id: string): Promise<number> {
    const response = await apiClient.get(clientAggregateApiRoutes.getTotalInvoiced(id));
    return response.data;
  },

  async getEarningsDelivery(id: string): Promise<number> {
    const response = await apiClient.get(clientAggregateApiRoutes.getEarningsDelivery(id));
    return response.data;
  },

  async getPendingEarnings(id: string): Promise<number> {
    const response = await apiClient.get(clientAggregateApiRoutes.getPendingEarnings(id));
    return response.data;
  },

  async getPendingEarningsCount(id: string): Promise<number> {
    const response = await apiClient.get(clientAggregateApiRoutes.getPendingEarningsCount(id));
    return response.data;
  },

  async getEarningsDeliveryOfCurrentMonth(id: string): Promise<number> {
    const response = await apiClient.get(clientAggregateApiRoutes.getEarningsDeliveryOfCurrentMonth(id));
    return response.data;
  },
};
