<template>
  <SideBar>
    <LoadingSkeleton v-if="!courier" />
    <div v-else class="space-y-8 text-gray-900 dark:text-gray-100">
      <div class="md:flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div class="hidden md:block">
          <h1 class="text-3xl font-bold tracking-tight">
            {{ courier.getFullName() }}
          </h1>
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
            <ActivityView title="Pedidos entregados del mes">
              <div class="text-2xl font-bold">{{ courier.getDeliveredThisMonth().length }}</div>
            </ActivityView>
            <ActivityView title="Pedidos por entregar">
              <div class="text-2xl font-bold">
                {{ courier.getPendingOrTransitThisMonth().length }}
              </div>
            </ActivityView>
            <ActivityView title="Última Actualización">
              <div class="text-2xl font-bold">{{ formatDateShort(courier.getUpdatedAt()) }}</div>
              <p class="text-xs text-gray-500">{{ formatRelativeDate(courier.getUpdatedAt()) }}</p>
            </ActivityView>
            <ActivityView title="Creación del cliente">
              <div class="text-2xl font-bold">{{ formatDateShort(courier.getCreatedAt()) }}</div>
              <p class="text-xs text-gray-500">{{ formatRelativeDate(courier.getCreatedAt()) }}</p>
            </ActivityView>
          </div>
        </div>
        <Card
          class="md:col-span-4 max-h-[26rem] md:h-[36rem] md:min-h-[36rem] md:max-h-[56rem] overflow-y-auto pr-2"
        >
          <MenuTimeLineContent :lineContents="lineContents" />
        </Card>
      </div>
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Deliverys Pendientes</h2>
        <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
          <TableDeliveries :deliveries="courier.getPendingDeliveries()" />
          <ChartDelivery
            :deliveries="courier.getDeliveredDeliveries()"
            title="Estadística mensual de los deliverys"
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
import { COURIER_UI_TIME_LINE_CONTENT_DEFINITIONS } from '@/views/couriers/domain/';
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

const lineContents = computed(() =>
  adaptTimeLineContentToUI(
    courier.value?.getTimeLineContent() ?? [],
    COURIER_UI_TIME_LINE_CONTENT_DEFINITIONS
  )
);

const sectionActions = [
  {
    content: 'Editar Courier',
    url: AppRoutesCourier.edit(courierId),
  },
];
</script>
