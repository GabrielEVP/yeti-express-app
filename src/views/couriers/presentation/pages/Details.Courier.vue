service.getId()
<template>
  <SideBar>
    <LoadingSkeleton v-if="!courier" />
    <div v-else class="space-y-8 text-gray-900 dark:text-gray-100">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 class="text-3xl font-bold tracking-tight">{{ courier.getFullName() }}</h1>
        <ActionsButton title="Acciones" :datas="sectionActions" />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card class="md:col-span-2 dark:bg-gray-800 dark:text-gray-100">
          <div class="p-6 space-y-5">
            <h2 class="text-xl font-semibold flex items-center gap-2 mb-4">
              <Building2 class="h-5 w-5" /> Información del repartidor
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SectionText title="Nombre" :content="courier.getFirstName()" />
              <SectionText title="Apellido" :content="courier.getLastName()" />
              <SectionText title="Teléfono" :content="courier.getPhone()" />
              <SectionText title="Activo" :content="courier.isActive()" />
            </div>
          </div>
        </Card>
        <div class="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
          <ActivityView title="Fecha de Creación">
            <div class="text-2xl font-bold">{{ formatDateShort(courier.getCreatedAt()) }}</div>
            <p class="text-xs text-gray-500">{{ formatRelativeDate(courier.getCreatedAt()) }}</p>
          </ActivityView>
          <ActivityView title="Última Actualización">
            <div class="text-2xl font-bold">{{ formatDateShort(courier.getUpdatedAt()) }}</div>
            <p class="text-xs text-gray-500">{{ formatRelativeDate(courier.getUpdatedAt()) }}</p>
          </ActivityView>
          <ActivityView title="Pagos pendientes">
            <div class="text-2xl font-bold"></div>
            <p class="text-xs text-gray-500">Faltan deliverys por pagar este mes</p>
          </ActivityView>
          <ActivityView title="Pagos realizados">
            <div class="text-2xl font-bold">$</div>
            <p class="text-xs text-gray-500">Total de comisión pagada este mes</p>
          </ActivityView>
        </div>
      </div>
    </div>
  </SideBar>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
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
import { Courier } from '@/views/couriers';
import { CourierRepositoryImpl } from '@/views/couriers';
import { GetCourierByIdUseCase } from '@views/couriers';
import { AppRoutesCourier } from '@/views/couriers/presentation/routes/';

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

const sectionActions = [
  {
    content: 'Editar Courier',
    url: AppRoutesCourier.edit(courierId),
  },
];
</script>
