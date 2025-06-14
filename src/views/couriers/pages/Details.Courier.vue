<template>
  <SideBar>
    <LoadingSkeleton v-if="!courier" />
    <div v-else class="space-y-8 text-gray-900 dark:text-gray-100">
      <div class="md:flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div class="hidden md:block">
          <h1 class="text-3xl font-bold tracking-tight">
            {{ courier.firstName }}
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
                  <SectionText title="Nombre" :content="courier.firstName" />
                  <SectionText title="Apellido" :content="courier.lastName" />
                  <SectionText title="Teléfono" :content="courier.phone" />
                </div>
              </div>
            </div>
          </Card>
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-2 lg:p-8">
            <ActivityView title="Última Actualización">
              <div class="text-2xl font-bold">{{ formatDateShort(courier.updatedAt) }}</div>
              <p class="text-xs text-gray-500">{{ formatRelativeDate(courier.updatedAt) }}</p>
            </ActivityView>
            <ActivityView title="Creación del cliente">
              <div class="text-2xl font-bold">{{ formatDateShort(courier.createdAt) }}</div>
              <p class="text-xs text-gray-500">{{ formatRelativeDate(courier.createdAt) }}</p>
            </ActivityView>
          </div>
        </div>
        <Card class="md:col-span-4 max-h-[26rem] md:h-[36rem] md:min-h-[36rem] md:max-h-[56rem] overflow-y-auto pr-2">
          <MenuTimeLineContent :lineContents="lineContents" />
        </Card>
      </div>
    </div>
  </SideBar>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Building2 } from 'lucide-vue-next';
import { formatDateShort, formatRelativeDate } from '@/utils/';
import { SideBar, SectionText, Card, ActionsButton, ActivityView, LoadingSkeleton } from '@/components/';
import { MenuTimeLineContent } from '@time-line-content/presentation/';

import { Courier } from '@/views/couriers';
import { AppRoutesCourier } from '@views/couriers/router';
import { getCourierById } from '@/views/couriers/services';

const courier = ref<Courier | null>(null);
const loading = ref(true);

const route = useRoute();
const courierId = route.params.id as string;

const loadData = async () => {
  courier.value = await getCourierById(courierId);
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
