<template>
  <SideBar>
    <LoadingSkeleton v-if="!service" />
    <div v-else class="space-y-8 text-gray-900 dark:text-gray-100">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <Breadcumb>
          <BreadcumbItem>
            <BreadcumbLink url="/services">Servicios</BreadcumbLink>
            <BreadcumbSeparator />
          </BreadcumbItem>
          <BreadcumbItem>
            <span class="text-gray-500 dark:text-gray-400">Detalles del Servicio</span>
          </BreadcumbItem>
        </Breadcumb>
        <div class="flex justify-end w-full md:w-auto">
          <ActionsButton title="Acciones" :datas="sectionActions" />
        </div>
      </div>
      <div class="flex justify-center h-full m-auto p-auto">
        <Card class="w-full max-w-4xl md:col-span-2">
          <div class="p-6 space-y-5">
            <h2 class="text-xl font-semibold flex items-center gap-2 mb-4">
              <Receipt class="h-5 w-5" /> Información del Servicio
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SectionText title="Nombre" :content="service.name" />
              <SectionText title="Precio" :content="service.amount" />
              <SectionText title="comision" :content="service.comision" />
              <SectionText title="Total Gastos" :content="totalExpenses" />
              <SectionText title="Ganancias" :content="totalEarnings" />
            </div>
            <SectionText title="Descripción" :content="service.description" />
            <Dropdown>
              <template #header>
                <FileText class="h-5 w-5" />
                <span class="font-medium"> Gastos ({{ service.bills.length }}) </span>
              </template>
              <template #data>
                <div
                  v-if="service.bills.length > 0"
                  v-for="bill in service.bills"
                  class="flex justify-between items-center border-b py-2 last:border-0 dark:border-gray-700"
                >
                  <div>
                    <p>{{ bill.name }}</p>
                    <p>Monto: {{ bill.amount }}</p>
                  </div>
                </div>
                <EmptyData v-else class="mt-10" />
              </template>
            </Dropdown>
          </div>
        </Card>
      </div>
    </div>
  </SideBar>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { FileText, Receipt } from 'lucide-vue-next';
import {
  SideBar,
  SectionText,
  Card,
  ActionsButton,
  LoadingSkeleton,
  Dropdown,
  EmptyData,
  Breadcumb,
  BreadcumbItem,
  BreadcumbLink,
  BreadcumbSeparator,
} from '@/components/';
import { Service, getService } from '@/views/services';

const route = useRoute();
const serviceId = route.params.id as string;
const service = ref<Service | null>(null);

onMounted(async () => {
  service.value = await getService(serviceId);
});

const totalExpenses = computed(() => {
  return service.value?.bills.reduce((sum, bill) => sum + (Number(bill.amount) || 0), 0) || 0;
});

const totalEarnings = computed(() => {
  if (!service.value) return 0;

  const billsTotal = service.value.bills.reduce((sum, bill) => {
    return sum + Number(bill.amount || 0);
  }, 0);

  const serviceAmount = Number(service.value.amount || 0);
  const serviceCommission = Number(service.value.comision || 0);

  return serviceAmount - serviceCommission - billsTotal;
});

const sectionActions = [
  {
    content: 'Editar Servicio',
    url: `/services/edit/${serviceId}`,
  },
];
</script>
