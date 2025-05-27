<template>
  <SideBar>
    <LoadingSkeleton v-if="!delivery" />
    <div v-else class="space-y-8 text-gray-900 dark:text-gray-100">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Delivery #{{ delivery.number }}</h1>
          <div class="flex items-center gap-2">
            <h5 class="text-sm font-medium text-muted-foreground dark:text-gray-400">Estado</h5>
            |
            <Bagde :class="getStatusBillingClass(delivery.status)">
              {{ statusFormated }}
            </Bagde>
          </div>
        </div>
        <div class="flex gap-2">
          <ActionsButton title="Acciones" :datas="sectionActions" />
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card class="md:col-span-2 dark:bg-gray-800 dark:text-gray-100">
          <div class="p-6">
            <h2 class="text-xl font-semibold flex items-center gap-2 mb-4">
              <Building2 class="h-5 w-5" />
              Información del Delivery
            </h2>
            <div class="space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SectionText title="Número de Delivery" :content="delivery.number" />
                <SectionText title="Fecha de Emisión" :content="dateFormated" />
                <SectionText title="Estado" :content="statusFormated" />
                <SectionText title="Forma de Pago" :content="paymentTypeFormated" />
                <SectionText title="Cliente" :content="client?.legalName || 'Cargando...'" />
                <SectionText title="Importe Total" :content="totalEarnings" />
              </div>
              <SectionText title="Nota" :content="delivery.notes" />
              <div class="space-y-6 pt-8">
                <DeliveryClientAddressList :address="clientAddress" />
                <DeliveryReceiptDropdown :receipt="delivery.receipt" />
                <DeliveryPaymentsDrowdown :payments="delivery.clientPayments" />
                <DeliveryCourierPaymentsDropdown :payments="delivery.courierPayments" />
              </div>
            </div>
          </div>
        </Card>
        <TimeLineActivity :lineContents="lineContents" />
      </div>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ActivityView title="Restante a Pagar">
          <div class="text-2xl font-bold"></div>
          <p class="text-xs text-gray-500">Total: {{ service?.comision }}</p>
        </ActivityView>
        <ActivityView title="Restante a Cobrar">
          <div class="text-2xl font-bold">{{ totalEarningPaid }}</div>
          <p class="text-xs text-gray-500">Total: {{ totalEarnings }}</p>
        </ActivityView>
        <ActivityView title="Ultima Actualizacion">
          <div class="text-2xl font-bold">{{ formatDateShort(delivery.updatedAt) }}</div>
          <p class="text-xs text-gray-500">{{ formatRelativeDate(delivery.updatedAt) }}</p>
        </ActivityView>
        <ActivityView title="Creacion del cliente">
          <div class="text-2xl font-bold">{{ formatDateShort(delivery.createdAt) }}</div>
          <p class="text-xs text-gray-500">{{ formatRelativeDate(delivery.createdAt) }}</p>
        </ActivityView>
      </div>
    </div>
  </SideBar>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { Building2 } from 'lucide-vue-next';
import { mapEventsToLineContent } from '@composables';
import {
  getStatusBillingClass,
  formatDateShort,
  formatRelativeDate,
  formatValue,
  formatDateCustom,
} from '@utils';
import {
  SideBar,
  SectionText,
  Card,
  ActionsButton,
  Bagde,
  TimeLineActivity,
  LoadingSkeleton,
  ActivityView,
} from '@components';
import { Delivery, getDelivery, PAYMENT_TYPE_MAP, STATUS_BILLING_MAP } from '@views/deliveries';
import {
  DeliveryClientAddressList,
  DeliveryReceiptDropdown,
  DeliveryPaymentsDrowdown,
  DeliveryCourierPaymentsDropdown,
} from '@views/deliveries/components/';
import { Client, ClientAddress, getClient } from '@views/clients';
import { Service, getService } from '@views/services';

const route = useRoute();
const deliveryId = route.params.id as string;

const delivery = ref<Delivery | null>(null);
const client = ref<Client | null>(null);
const clientAddress = ref<ClientAddress | null>(null);
const service = ref<Service | null>(null);

const loadData = async () => {
  if (!deliveryId) return;
  delivery.value = await getDelivery(deliveryId);
  client.value = await getClient(delivery.value.clientId);
  clientAddress.value = client.value ? client.value.addresses[0] : null;
};

onMounted(async () => {
  await loadData();
});

const lineContents = computed(() =>
  delivery.value?.events ? mapEventsToLineContent(delivery.value.events) : []
);

const dateFormated = computed(() => formatDateCustom(delivery.value?.date));
const statusFormated = computed(() => formatValue(delivery.value?.status, STATUS_BILLING_MAP));
const paymentTypeFormated = computed(() =>
  formatValue(delivery.value?.paymentType, PAYMENT_TYPE_MAP)
);

const totalExpenses = computed(() => {
  return service.value?.bills.reduce((sum, bill) => sum + (Number(bill.amount) || 0), 0) || 0;
});

const totalEarnings = computed(() => {
  if (!service.value) return 0;

  const billsTotal = service.value.bills?.reduce((sum, bill) => sum + +bill.amount, 0) || 0;
  const serviceAmount = +service.value.amount || 0;
  const serviceCommission = +service.value.comision || 0;

  return serviceAmount - serviceCommission - billsTotal;
});

const totalEarningPaid = computed(() => {
  const paid = delivery.value?.clientPayments?.reduce((sum, p) => sum + +p.amount, 0) || 0;
  return totalEarnings.value - paid;
});

const sectionActions = [
  {
    content: 'Editar Delivery',
    url: `/deliveries/edit/${deliveryId}`,
  },
];
</script>
