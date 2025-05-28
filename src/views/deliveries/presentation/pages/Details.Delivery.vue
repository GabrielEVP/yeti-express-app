<template>
  <SideBar>
    <LoadingSkeleton v-if="!delivery" />
    <div v-else class="space-y-8 text-gray-900 dark:text-gray-100">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Delivery #{{ delivery.getNumber() }}</h1>
          <div class="flex items-center gap-2">
            <h5 class="text-sm font-medium text-muted-foreground dark:text-gray-400">Estado</h5>
            |
            <Bagde>
              {{ delivery.getStatus() }}
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
                <SectionText title="Número de Delivery" :content="delivery.getNumber()" />
                <SectionText title="Fecha de Emisión" :content="delivery.getDate()" />
                <SectionText title="Estado" :content="delivery.getStatus()" />
                <SectionText title="Forma de Pago" :content="delivery.getPaymentType()" />
                <SectionText title="Deliverye" :content="delivery.getClient().getLegalName()" />
                <SectionText
                  title="Importe Total"
                  :content="delivery.getService().getTotalEarning()"
                />
              </div>
              <SectionText title="Nota" :content="delivery.getNotes()" />
              <div class="space-y-6 pt-8">
                <DeliveryDeliveryAddressList :address="delivery.getClientAddress().getAddress()" />
                <DeliveryReceiptDropdown :receipt="delivery.getReceipt()" />
                <DeliveryPaymentsDrowdown :payments="delivery.getClientPayments()" />
                <DeliveryCourierPaymentsDropdown :payments="delivery.getCourierPayments()" />
              </div>
            </div>
          </div>
        </Card>
        <TimeLineActivity :lineContents="lineContents" />
      </div>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ActivityView title="Restante a Pagar">
          <div class="text-2xl font-bold"></div>
          <p class="text-xs text-gray-500">Total: {{}}</p>
        </ActivityView>
        <ActivityView title="Restante a Cobrar">
          <div class="text-2xl font-bold">{{}}</div>
          <p class="text-xs text-gray-500">Total: {{}}</p>
        </ActivityView>
        <ActivityView title="Ultima Actualizacion">
          <div class="text-2xl font-bold">{{}}</div>
          <p class="text-xs text-gray-500">{{}}</p>
        </ActivityView>
        <ActivityView title="Creacion del deliverye">
          <div class="text-2xl font-bold">{{}}</div>
          <p class="text-xs text-gray-500">{{}}</p>
        </ActivityView>
      </div>
    </div>
  </SideBar>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Building2 } from 'lucide-vue-next';
import { SideBar, SectionText, Card, ActionsButton, LoadingSkeleton } from '@/components/';
import { Delivery } from '@/views/deliveries/domain/';
import { DeliveryRepositoryImpl } from '@/views/deliveries';
import { GetDeliveryByIdUseCase } from '@views/deliveries';
import { AppRoutesDelivery } from '@/views/deliveries/presentation/routes/';

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

const lineContents = computed(() => []);

const sectionActions = [
  {
    content: 'Editar Delivery',
    url: AppRoutesDelivery.edit(courierId),
  },
];
</script>
