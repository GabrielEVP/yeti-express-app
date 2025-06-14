<template>
  <SideBar>
    <LoadingSkeleton v-if="!service" />
    <div v-else class="space-y-8 text-gray-900 dark:text-gray-100">
      <div class="md:flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div class="hidden md:block">
          <h1 class="text-3xl font-bold tracking-tight">
            {{ service.name }}
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
                <Receipt class="h-5 w-5" />
                Información del Servicio
              </h2>
              <div class="space-y-5 mb-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SectionText title="Nombre" :content="service.name" />
                  <SectionText title="Comision" :content="formatToDollars(service.comision)" />
                  <SectionText title="Monto" :content="formatToDollars(service.amount)" />
                </div>
              </div>
              <Dropdown>
                <template #header>
                  <ReceiptText class="h-5 w-5" />
                  <span class="font-medium"> Gastos ({{ service.bills.length }}) </span>
                </template>
                <template #data>
                  <div
                    v-if="service.bills.length > 0"
                    v-for="bill in service.bills"
                    :key="bill.id"
                    class="flex justify-between items-center border-b py-2 last:border-0 dark:border-gray-700"
                  >
                    <div class="flex justify-between items-start">
                      <div class="space-y-1">
                        <p class="font-medium">Nombre: {{ bill.name }}</p>
                        <p class="font-medium">Monto: {{ formatToDollars(bill.amount) }}</p>
                      </div>
                    </div>
                  </div>
                  <EmptyData v-else class="mt-10" />
                </template>
              </Dropdown>
            </div>
          </Card>
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-2 lg:p-8">
            <ActivityView title="Total de gastos">
              <div class="text-2xl font-bold">{{ formatToDollars(service.totalExpense ?? 0) }}</div>
              <p class="text-xs text-gray-500">Cantidad de gastos: {{ service.bills.length }}</p>
            </ActivityView>
            <ActivityView title="Ganancias">
              <div class="text-2xl font-bold">{{ formatToDollars(service.totalEarning ?? 0) }}</div>
              <p class="text-xs text-gray-500">Porcentaje de ganancia: {{}}</p>
            </ActivityView>
            <ActivityView title="Ultima Actualizacion">
              <div class="text-2xl font-bold">{{ formatDateShort(service.updatedAt) }}</div>
              <p class="text-xs text-gray-500">{{ formatRelativeDate(service.updatedAt) }}</p>
            </ActivityView>
            <ActivityView title="Creacion del cliente">
              <div class="text-2xl font-bold">{{ formatDateShort(service.createdAt) }}</div>
              <p class="text-xs text-gray-500">{{ formatRelativeDate(service.createdAt) }}</p>
            </ActivityView>
          </div>
        </div>
        <Card class="md:col-span-4 max-h-[26rem] md:h-[40rem] md:min-h-[40rem] md:max-h-[56rem] overflow-y-auto pr-2">
          <MenuTimeLineContent :lineContents="lineContents" />
        </Card>
      </div>
    </div>
  </SideBar>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Receipt, ReceiptText } from 'lucide-vue-next';
import { formatToDollars, formatDateShort, formatRelativeDate } from '@/utils';
import { SideBar, SectionText, Card, ActionsButton, LoadingSkeleton, ActivityView, Dropdown, EmptyData } from '@/components/';
import { MenuTimeLineContent } from '@/time-line-content/presentation/';
import { Service } from '@/views/services';
import { getServiceById } from '@/views/services';
import { AppRoutesService } from '@/views/services/router/';

const service = ref<Service | null>(null);
const loading = ref(true);

const route = useRoute();
const serviceId = route.params.id as string;

const loadData = async () => {
  service.value = await getServiceById(serviceId);
  loading.value = false;
};

onMounted(() => {
  loadData();
});

const lineContents = computed(() => []);

const sectionActions = [
  {
    content: 'Editar Service',
    url: AppRoutesService.edit(serviceId),
  },
];
</script>
