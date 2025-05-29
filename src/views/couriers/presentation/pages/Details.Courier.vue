<template>
  <SideBar>
    <LoadingSkeleton v-if="!courier" />
    <div v-else class="space-y-8 text-gray-900 dark:text-gray-100">
      <div class="md:flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div class="hidden md:block">
          <h1 class="text-3xl font-bold tracking-tight">
            {{ courier.getFullName() }}
          </h1>
          <div class="flex items-center gap-2">
            <h5 class="text-sm font-medium text-muted-foreground dark:text-gray-400">Estado</h5>
            <Text>| {{ courier.getId() }}</Text>
          </div>
        </div>
        <div class="flex gap-2 justify-end">
          <ActionsButton title="Acciones" :datas="sectionActions" />
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div class="md:col-span-8 space-y-6">
          <Card class="dark:bg-gray-800 dark:text-gray-100">
            <div class="p-6">
              <h2 class="text-xl font-semibold flex items-center gap-2 mb-4">
                <Building2 class="h-5 w-5" />
                Información del Repartidor
              </h2>
              <div class="space-y-5">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SectionText title="Nombre" :content="courier.getFirstName()" />
                  <SectionText title="Apellido" :content="courier.getLastName()" />
                  <SectionText title="Teléfono" :content="courier.getPhone()" />
                </div>
              </div>
            </div>
          </Card>
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-2 lg:p-8">
            <ActivityView title="Total de gastos del mes">
              <div class="text-2xl font-bold">
                {{ courier.getPaidAmountThisMonth().toFixed(2) }}
              </div>
              <p class="text-xs text-gray-500">
                Gastos totales: {{ courier.getTotalPaid().toFixed(2) }}
              </p>
            </ActivityView>
            <ActivityView title="Deliverys Pendientes">
              <div class="text-2xl font-bold">
                {{ courier.getTotalPendingToPay().toFixed(2) }}
              </div>
              <p class="text-xs text-gray-500">
                Pendientes por pagar: {{ courier.getPendingDeliveries().length }}
              </p>
            </ActivityView>
            <ActivityView title="Ultima Actualizacion">
              <div class="text-2xl font-bold">{{ formatDateShort(courier.getUpdatedAt()) }}</div>
              <p class="text-xs text-gray-500">{{ formatRelativeDate(courier.getUpdatedAt()) }}</p>
            </ActivityView>
            <ActivityView title="Creacion del cliente">
              <div class="text-2xl font-bold">{{ formatDateShort(courier.getCreatedAt()) }}</div>
              <p class="text-xs text-gray-500">{{ formatRelativeDate(courier.getCreatedAt()) }}</p>
            </ActivityView>
          </div>
        </div>
        <div class="md:col-span-4 min-h-[35rem] max-h-[35rem] overflow-y-auto pr-2">
          <MenuTimeLineContent class="min-h-[35rem]" :lineContents="lineContents" />
        </div>
      </div>
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Deliverys</h2>
        <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
          <TableDeliveries :deliveries="courier.getDeliveries()" />
          <ChartDelivery
            :deliveries="courier.getDeliveries()"
            title="Estadistica mensual de los deliverys"
            label="Total deliverys"
          />
        </div>
      </div>
    </div>
  </SideBar>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Building2 } from 'lucide-vue-next';
import { formatDateShort, formatRelativeDate } from '@/utils/';
import {
  SideBar,
  SectionText,
  Card,
  ActionsButton,
  ActivityView,
  LoadingSkeleton,
} from '@/components/';
import { adaptTimeLineContentToUI } from '@time-line-content/adapter';
import { MenuTimeLineContent } from '@time-line-content/presentation/';
import { Courier } from '@/views/couriers';
import { CourierRepositoryImpl } from '@/views/couriers';
import { GetCourierByIdUseCase } from '@views/couriers';
import { AppRoutesCourier } from '@/views/couriers/presentation/routes/';
import { TableDeliveries, ChartDelivery } from '@/views/couriers/presentation/components/';

const repository = new CourierRepositoryImpl();
const getCourierByIdUseCase = new GetCourierByIdUseCase(repository);

const courier = ref<Courier | null>(null);
const loading = ref(true);

const route = useRoute();
const courierId = route.params.id as string;

const loadData = async () => {
  courier.value = await getCourierByIdUseCase.execute(courierId);
  loading.value = false;
};

onMounted(() => {
  loadData();
});

const lineContents = computed(() => []);

const sectionActions = [
  {
    content: 'Editar Courier',
    url: AppRoutesCourier.edit(courierId),
  },
];
</script>
