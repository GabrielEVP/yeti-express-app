<template>
  <SideBar>
    <LoadingSkeleton v-if="!delivery" />
    <div v-else class="space-y-8 text-gray-900 dark:text-gray-100">
      <div class="md:flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div class="hidden md:flex flex-col md:flex-row  gap-12">
          <BackButton class="hidden md:block" />
          <div class="hidden md:block">
            <h1 class="text-3xl font-bold tracking-tight">Delivery #{{ delivery.number }}</h1>
            <div class="flex items-center gap-2">
              <h5 class="text-sm font-medium text-muted-foreground dark:text-gray-400">Estado</h5>
              |
              <Bagde
                :class="
                  delivery.status == DeliveryStatus.PENDING
                    ? 'border-blue-500'
                    : delivery.status == DeliveryStatus.IN_TRANSIT
                      ? 'border-yellow-500'
                      : delivery.status == DeliveryStatus.DELIVERED
                        ? 'border-green-500'
                        : 'border-red-500'
                "
              >
                {{ getDeliveryStatusLabel(delivery.status) }}
              </Bagde>
            </div>
          </div>
        </div>
        <BackButton class="mt-4 md:hidden block" />
        <div v-if="delivery.status == DeliveryStatus.PENDING" class="flex gap-2">
          <ActionsButton title="Acciones" :datas="sectionActions" />
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card class="md:col-span-2 dark:bg-gray-800 dark:text-gray-100 lg:p-6 p-4">
          <div class="p-6">
            <h2 class="text-xl font-semibold flex items-center gap-2 mb-4">
              <Building2 class="h-5 w-5" />
              Información del Delivery
            </h2>
            <div class="space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SectionText title="Número de Delivery" :content="delivery.number" />
                <SectionText title="Fecha de Emisión" :content="formatDateCustom(delivery.date)" />
                <SectionText title="Estado" :content="getDeliveryStatusLabel(delivery.status)" />
                <SectionText title="Forma de pago" :content="getPaymentTypeLabel(delivery.paymentType)" />
                <SectionText title="Estado de pago" :content="getDeliveryPaymentStatusLabel(delivery.paymentStatus)" />
                <SectionText title="Cliente" :content="delivery.clientLegalName ?? 'Sin cliente'" />
                <SectionText title="Servicio" :content="delivery.serviceName ?? 'Sin Servicio'" />
                <SectionText title="Importe Total" :content="formatToDollars(delivery.amount)" />
                <SectionText title="Repartidor" :content="delivery.courierName ?? 'Sin asignar'" />
              </div>
              <SectionText title="Nota" :content="delivery.notes" />
              <div class="space-y-6 pt-8">
                <DeliveryReceiptDropdown :receipt="delivery.receipt" />
                <DeliveryClientAddressList :address="delivery.pickupAddress ?? ''" />
              </div>
            </div>
          </div>
        </Card>
        <Card class="max-h-[26rem] md:h-[43rem] md:min-h-[43rem] md:max-h-[43rem] overflow-y-auto pr-2">
          <MenuTimeLineContent :lineContents="lineContents" />
        </Card>
      </div>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Building2 } from 'lucide-vue-next';
import { formatToDollars, formatDateShort, formatRelativeDate, formatDateCustom } from '@/utils/';
import {
  SideBar,
  SectionText,
  Card,
  Bagde,
  ActionsButton,
  LoadingSkeleton,
  ActivityView,
  BackButton,
} from '@/components/';
import { Delivery, DeliveryStatus, getDeliveryPaymentStatusLabel, getDeliveryStatusLabel, getPaymentTypeLabel } from '@/views/deliveries/';
import { getDeliveryById } from '@/views/deliveries/';
import { AppRoutesDelivery } from '@views/deliveries/router';
import { DeliveryClientAddressList, DeliveryReceiptDropdown } from '@views/deliveries/components';
import { adaptTimeLineContentToUI } from '@time-line-content/adapter';
import { MenuTimeLineContent } from '@time-line-content/components';
import { DELIVERY_UI_TIME_LINE_CONTENT_DEFINITIONS } from '@views/deliveries/constants';

const delivery = ref<Delivery | null>(null);
const loading = ref(true);

const route = useRoute();
const courierId = route.params.id as string;

const loadData = async () => {
  delivery.value = await getDeliveryById(courierId);
  loading.value = false;
};

onMounted(() => {
  loadData();
});

const lineContents = computed(() => adaptTimeLineContentToUI(delivery.value?.events ?? [], DELIVERY_UI_TIME_LINE_CONTENT_DEFINITIONS));
const sectionActions = [
  {
    content: 'Editar Delivery',
    url: AppRoutesDelivery.edit(courierId),
  },
];
</script>
