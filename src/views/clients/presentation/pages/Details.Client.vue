<template>
  <SideBar>
    <LoadingSkeleton v-if="!client" />
    <div v-else class="space-y-8 text-gray-900 dark:text-gray-100">
      <div class="md:flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div class="hidden md:block">
          <h1 class="text-3xl font-bold tracking-tight">
            {{ client.getLegalName() }}
          </h1>
          <div class="flex items-center gap-2">
            <h5 class="text-sm font-medium text-muted-foreground dark:text-gray-400">Registro</h5>
            <Text>| {{ client.getRegistrationNumber() }}</Text>
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
                Información del Cliente
              </h2>
              <div class="space-y-5">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SectionText title="Nombre Legal" :content="client.getLegalName()" />
                  <SectionText title="tipo de documento" :content="client.getType()" />
                  <SectionText
                    title="Número de registro"
                    :content="client.getRegistrationNumber()"
                  />
                </div>
                <SectionText title="Notas" :content="client.getNotes()" />
                <div class="space-y-6 pt-8">
                  <AdressesList :addresses="client.getAddresses()" />
                  <PhonesList :phones="client.getPhones()" />
                  <EmailsList :emails="client.getEmails()" />
                </div>
              </div>
            </div>
          </Card>
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-2 lg:p-8">
            <ActivityView title="Total de Ganancias del mes">
              <div class="text-2xl font-bold">
                {{ client.getEarningsDeliveryOfCurrentMonth().toFixed(2) }}
              </div>
              <p class="text-xs text-gray-500">
                Ganancias totales: {{ client.getEarningsDelivery().toFixed(2) }}
              </p>
            </ActivityView>
            <ActivityView title="Deliverys Pendientes">
              <div class="text-2xl font-bold">
                {{ client.getEarningsPendingOfDeliveries().toFixed(2) }}
              </div>
              <p class="text-xs text-gray-500">
                Pendientes por pagar: {{ client.getPendingLenghtDeliveries() }}
              </p>
            </ActivityView>
            <ActivityView title="Ultima Actualizacion">
              <div class="text-2xl font-bold">{{ formatDateShort(client.getUpdatedAt()) }}</div>
              <p class="text-xs text-gray-500">{{ formatRelativeDate(client.getUpdatedAt()) }}</p>
            </ActivityView>
            <ActivityView title="Creacion del cliente">
              <div class="text-2xl font-bold">{{ formatDateShort(client.getCreatedAt()) }}</div>
              <p class="text-xs text-gray-500">{{ formatRelativeDate(client.getCreatedAt()) }}</p>
            </ActivityView>
          </div>
        </div>
        <div class="md:col-span-4 max-h-[55rem] overflow-y-auto pr-2">
          <MenuTimeLineContent class="h-[55rem]" :lineContents="lineContents" />
        </div>
      </div>
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Deliverys</h2>
        <div class="grid gap-4 md:grid-cols-2 grid-cols-1">
          <TableDeliveries :deliveries="client.getDeliveries()" />
          <ChartDelivery
            :deliveries="client.getDeliveries()"
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
  LoadingSkeleton,
  ActivityView,
} from '@/components/';
import { adaptTimeLineContentToUI } from '@time-line-content/adapter';
import { MenuTimeLineContent } from '@time-line-content/presentation/';
import { Client } from '@/views/clients/domain/';
import { CLIENT_UI_TIME_LINE_CONTENT_DEFINITIONS } from '@/views/clients/domain/';
import { ClientRepositoryImpl } from '@/views/clients';
import { GetClientByIdUseCase } from '@views/clients';
import { AppRoutesClient } from '@/views/clients/presentation/routes/';
import {
  AdressesList,
  PhonesList,
  EmailsList,
  TableDeliveries,
  ChartDelivery,
} from '@/views/clients/presentation/components/';

const repository = new ClientRepositoryImpl();
const getClientByIdUseCase = new GetClientByIdUseCase(repository);

const client = ref<Client | null>(null);
const loading = ref(true);

const route = useRoute();
const clientId = route.params.id as string;

const loadData = async () => {
  client.value = await getClientByIdUseCase.execute(clientId);
  loading.value = false;
};

onMounted(() => {
  loadData();
});

const lineContents = computed(() =>
  adaptTimeLineContentToUI(client.value?.getEvents() ?? [], CLIENT_UI_TIME_LINE_CONTENT_DEFINITIONS)
);

const sectionActions = [
  {
    content: 'Editar Client',
    url: AppRoutesClient.edit(clientId),
  },
];
</script>
