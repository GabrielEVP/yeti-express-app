<template>
  <SideBar>
    <LoadingSkeleton v-if="!service" />
    <div v-else class="space-y-8 text-gray-900 dark:text-gray-100">
      <div class="flex justify-end w-full md:w-auto">
        <ActionsButton title="Acciones" :datas="sectionActions" />
      </div>
      <div class="flex justify-center h-full m-auto p-auto">
        <Card class="w-full max-w-4xl md:col-span-2">
          <div class="p-6 space-y-5">
            <h2 class="text-xl font-semibold flex items-center gap-2 mb-4">
              <Receipt class="h-5 w-5" /> Información del Servicio
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <SectionText title="Nombre" :content="service.getName()" />
              <SectionText title="Precio" :content="service.getAmount()" />
              <SectionText title="comision" :content="service.getAmount()" />
              <SectionText title="Total Gastos" :content="service.getTotalExpense()" />
              <SectionText title="Ganancias" :content="service.getTotalEarning()" />
            </div>
            <SectionText title="Descripción" :content="service.getDescription()" />
            <Dropdown>
              <template #header>
                <FileText class="h-5 w-5" />
                <span class="font-medium"> Gastos ({{ service.getBills().length }}) </span>
              </template>
              <template #data>
                <div
                  v-if="service.getBills().length > 0"
                  v-for="bill in service.getBills()"
                  class="flex justify-between items-center border-b py-2 last:border-0 dark:border-gray-700"
                >
                  <div>
                    <p>{{ bill.getName() }}</p>
                    <p>Monto: {{ bill.getAmount() }}</p>
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
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Receipt } from 'lucide-vue-next';
import {
  SideBar,
  SectionText,
  Card,
  ActionsButton,
  LoadingSkeleton,
  EmptyData,
} from '@/components/';
import { Service } from '@/views/services/domain/';
import { ServiceRepositoryImpl } from '@/views/services';
import { GetServiceByIdUseCase } from '@views/services';
import { AppRoutesService } from '@/views/services/presentation/routes/';

const repository = new ServiceRepositoryImpl();
const getServiceByIdUseCase = new GetServiceByIdUseCase(repository);

const service = ref<Service | null>(null);
const loading = ref(true);

const route = useRoute();
const courierId = route.params.id as string;

const loadData = async () => {
  service.value = await getServiceByIdUseCase.execute(courierId);
  loading.value = false;
};

onMounted(() => {
  loadData();
});

const sectionActions = [
  {
    content: 'Editar Service',
    url: AppRoutesService.edit(courierId),
  },
];
</script>
