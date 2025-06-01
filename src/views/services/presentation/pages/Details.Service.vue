<template>
  <SideBar>
    <LoadingSkeleton v-if="!service" />
    <div v-else class="space-y-8 text-gray-900 dark:text-gray-100">
      <div class="md:flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div class="hidden md:block">
          <h1 class="text-3xl font-bold tracking-tight">
            {{ service.getName() }}
          </h1>
          <div class="flex items-center gap-2">
            <h5 class="text-sm font-medium text-muted-foreground dark:text-gray-400">Estado</h5>
            <Text>| {{ service.getAmount() }}</Text>
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
                <Receipt class="h-5 w-5" />
                Información del Servicio
              </h2>
              <div class="space-y-5 mb-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SectionText title="Nombre" :content="service.getName()" />
                  <SectionText title="Comision" :content="formatToDollars(service.getComision())" />
                  <SectionText title="Monto" :content="formatToDollars(service.getAmount())" />
                </div>
              </div>
              <Dropdown>
                <template #header>
                  <ReceiptText class="h-5 w-5" />
                  <span class="font-medium"> Gastos ({{ service.getBills().length }}) </span>
                </template>
                <template #data>
                  <div
                    v-if="service.getBills().length > 0"
                    v-for="bill in service.getBills()"
                    :key="bill.getId()"
                    class="flex justify-between items-center border-b py-2 last:border-0 dark:border-gray-700"
                  >
                    <div class="flex justify-between items-start">
                      <div class="space-y-1">
                        <p class="font-medium">Nombre: {{ bill.getName() }}</p>
                        <p class="font-medium">Monto: {{ formatToDollars(bill.getAmount()) }}</p>
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
              <div class="text-2xl font-bold">
                {{ formatToDollars(service.getTotalExpense()) }}
              </div>
              <p class="text-xs text-gray-500">
                Cantidad de gastos: {{ service.getBills().length }}
              </p>
            </ActivityView>
            <ActivityView title="Ganancias">
              <div class="text-2xl font-bold">
                {{ formatToDollars(service.getTotalEarning()) }}
              </div>
              <p class="text-xs text-gray-500">
                Porcentaje de ganancia: {{ formatPercentage(service.getEarningPercentage()) }}
              </p>
            </ActivityView>
            <ActivityView title="Ultima Actualizacion">
              <div class="text-2xl font-bold">{{ formatDateShort(service.getUpdatedAt()) }}</div>
              <p class="text-xs text-gray-500">{{ formatRelativeDate(service.getUpdatedAt()) }}</p>
            </ActivityView>
            <ActivityView title="Creacion del cliente">
              <div class="text-2xl font-bold">{{ formatDateShort(service.getCreatedAt()) }}</div>
              <p class="text-xs text-gray-500">{{ formatRelativeDate(service.getCreatedAt()) }}</p>
            </ActivityView>
          </div>
        </div>
        <Card
          class="md:col-span-4 max-h-[26rem] md:h-[40rem] md:min-h-[40rem] md:max-h-[56rem] overflow-y-auto pr-2"
        >
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
import { formatToDollars, formatPercentage, formatDateShort, formatRelativeDate } from '@utils';
import {
  SideBar,
  SectionText,
  Card,
  ActionsButton,
  LoadingSkeleton,
  ActivityView,
  Dropdown,
  EmptyData,
} from '@/components/';
import { MenuTimeLineContent } from '@time-line-content/presentation/';
import { Service } from '@/views/services/domain/';
import { ServiceRepositoryImpl } from '@/views/services';
import { GetServiceByIdUseCase } from '@views/services';
import { AppRoutesService } from '@/views/services/presentation/routes/';

const repository = new ServiceRepositoryImpl();
const getServiceByIdUseCase = new GetServiceByIdUseCase(repository);

const service = ref<Service | null>(null);
const loading = ref(true);

const route = useRoute();
const serviceId = route.params.id as string;

const loadData = async () => {
  service.value = await getServiceByIdUseCase.execute(serviceId);
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
