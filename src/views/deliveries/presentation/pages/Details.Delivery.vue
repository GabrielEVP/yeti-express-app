<template>
  <SideBar>
    <LoadingSkeleton v-if="!delivery" />
    <div v-else class="space-y-8 text-gray-900 dark:text-gray-100">
      <div class="md:flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div class="hidden md:block">
          <h1 class="text-3xl font-bold tracking-tight">Delivery #{{ delivery.getNumber() }}</h1>
          <div class="flex items-center gap-2">
            <h5 class="text-sm font-medium text-muted-foreground dark:text-gray-400">Estado</h5>
            |
            <Bagde>
              {{ delivery.getStatusToFormat() }}
            </Bagde>
          </div>
        </div>
        <div class="flex gap-2">
          <ActionsButton title="Acciones" :datas="sectionActions" />
        </div>
      </div>
      <div class="grid grid-cols-3 gap-6">
        <Card class="md:col-span-2 dark:bg-gray-800 dark:text-gray-100 p-6">
          <div class="p-6">
            <h2 class="text-xl font-semibold flex items-center gap-2 mb-4">
              <Building2 class="h-5 w-5" />
              Información del Delivery
            </h2>
            <div class="space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SectionText title="Número de Delivery" :content="delivery.getNumber()" />
                <SectionText
                  title="Fecha de Emisión"
                  :content="formatDateCustom(delivery.getDate())"
                />
                <SectionText title="Estado" :content="delivery.getStatus()" />
                <SectionText title="Forma de Pago" :content="delivery.getPaymentType()" />
                <SectionText title="Cliente" :content="delivery.getClient().getLegalName()" />
                <SectionText
                  title="Importe Total"
                  :content="delivery.getService().getTotalEarning()"
                />
                <SectionText title="Repartidor" :content="delivery.getCourier().getFullName()" />
                <SectionText title="Comision" :content="delivery.getService().getComision()" />
              </div>
              <SectionText title="Nota" :content="delivery.getNotes()" />
              <div class="space-y-6 pt-8">
                <DeliveryClientAddressList :address="delivery.getClientAddress()" />
                <DeliveryReceiptDropdown :receipt="delivery.getReceipt()" />
                <DeliveryPaymentsDrowdown :DeliveryClientPayments="delivery.getClientCharges()" />
                <DeliveryCourierPaymentsDropdown
                  :DeliveryCourierpayments="delivery.getCourierPayouts()"
                />
              </div>
            </div>
          </div>
        </Card>
        <Card
          class="max-h-[26rem] md:h-[56rem] md:min-h-[56rem] md:max-h-[56rem] overflow-y-auto pr-2"
        >
          <MenuTimeLineContent :lineContents="lineContents" />
        </Card>
      </div>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ActivityView title="Restante a Pagar">
          <div class="text-2xl font-bold">{{ delivery.getRemainingToPay() }}</div>
          <p class="text-xs text-gray-500">Total: {{ delivery.getService().getComision() }}</p>
        </ActivityView>
        <ActivityView title="Restante a Cobrar">
          <div class="text-2xl font-bold">{{ delivery.getRemainingToCollect() }}</div>
          <p class="text-xs text-gray-500">Total: {{ delivery.getService().getTotalEarning() }}</p>
        </ActivityView>
        <ActivityView title="Ultima Actualizacion">
          <div class="text-2xl font-bold">{{ formatDateShort(delivery.getUpdatedAt()) }}</div>
          <p class="text-xs text-gray-500">{{ formatRelativeDate(delivery.getUpdatedAt()) }}</p>
        </ActivityView>
        <ActivityView title="Creacion del cliente">
          <div class="text-2xl font-bold">{{ formatDateShort(delivery.getCreatedAt()) }}</div>
          <p class="text-xs text-gray-500">{{ formatRelativeDate(delivery.getCreatedAt()) }}</p>
        </ActivityView>
      </div>
    </div>
  </SideBar>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Building2 } from 'lucide-vue-next';
import { formatDateShort, formatRelativeDate, formatDateCustom } from '@/utils/';
import {
  SideBar,
  SectionText,
  Card,
  ActionsButton,
  LoadingSkeleton,
  ActivityView,
} from '@/components/';
import { adaptTimeLineContentToUI } from '@time-line-content/adapter';
import { MenuTimeLineContent } from '@time-line-content/presentation/';
import { Delivery, CLIENT_UI_TIME_LINE_CONTENT_DEFINITIONS } from '@/views/deliveries/domain/';
import { DeliveryRepositoryImpl } from '@/views/deliveries';
import { GetDeliveryByIdUseCase } from '@views/deliveries';
import { AppRoutesDelivery } from '@/views/deliveries/presentation/routes/';
import {
  DeliveryClientAddressList,
  DeliveryReceiptDropdown,
  DeliveryPaymentsDrowdown,
  DeliveryCourierPaymentsDropdown,
} from '@/views/deliveries/presentation/components/';

const repository = new DeliveryRepositoryImpl();
const getDeliveryByIdUseCase = new GetDeliveryByIdUseCase(repository);

const delivery = ref<Delivery | null>(null);
const loading = ref(true);

const route = useRoute();
const courierId = route.params.id as string;

const loadData = async () => {
  delivery.value = await getDeliveryByIdUseCase.execute(courierId);
  loading.value = false;
};

onMounted(() => {
  loadData();
});

const lineContents = computed(() =>
  adaptTimeLineContentToUI(
    delivery.value?.getTimeLine() ?? [],
    CLIENT_UI_TIME_LINE_CONTENT_DEFINITIONS
  )
);
const sectionActions = [
  {
    content: 'Editar Delivery',
    url: AppRoutesDelivery.edit(courierId),
  },
];
</script>
