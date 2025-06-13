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
            <h5 class="text-sm font-medium text-muted-foreground dark:text-gray-400">Tipo de documento</h5>
            <Text
              >| <Bagde>{{ client.getFormatType() }}</Bagde>
            </Text>
          </div>
        </div>
        <div class="flex gap-2 justify-end">
          <ActionsButton title="Acciones" :datas="sectionActions" />
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="md:col-span-8 space-y-6">
          <Card class="dark:bg-gray-800 dark:text-gray-100">
            <div class="p-6">
              <h2 class="text-xl font-semibold flex items-center gap-2 mb-4">
                <UsersIcon class="h-5 w-5" />
                Información del Cliente
              </h2>
              <div class="space-y-5">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SectionText title="Nombre Legal" :content="client.getLegalName()" />
                  <SectionText title="Tipo de documento" :content="client.getFormatType()" />
                  <SectionText title="Número de documento" :content="client.getRegistrationNumber()" />
                  <SectionText title="Credito" :content="credit" />
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
                {{ formattedEarningsCurrentMonth }}
              </div>
              <p class="text-xs text-gray-500">Ganancias totales: {{ formattedEarningsDelivery }}</p>
            </ActivityView>
            <ActivityView title="Deliverys Pendientes">
              <div class="text-2xl font-bold">
                {{ formattedPendingEarnings }}
              </div>
              <p class="text-xs text-gray-500">Pendientes por cobrar: {{ formattedPendingEarningsCount }}</p>
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
        <Card class="md:col-span-4 max-h-[26rem] md:h-[56rem] md:min-h-[56rem] md:max-h-[56rem] overflow-y-auto pr-2">
          <MenuTimeLineContent :lineContents="lineContents" />
        </Card>
      </div>
    </div>
  </SideBar>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { UsersIcon } from 'lucide-vue-next';
import { formatDateShort, formatRelativeDate, formatToDollars } from '@/utils/';
import { SideBar, SectionText, Card, Bagde, ActionsButton, LoadingSkeleton, ActivityView } from '@/components/';
import { adaptTimeLineContentToUI } from '@time-line-content/adapter';
import { MenuTimeLineContent } from '@time-line-content/presentation/';
import { Client } from '@/views/clients/domain/';
import { CLIENT_UI_TIME_LINE_CONTENT_DEFINITIONS } from '@/views/clients/domain/';
import { ClientRepositoryImpl } from '@/views/clients';
import { GetClientByIdUseCase } from '@views/clients';
import { GetClientDeliveriesUseCase } from '@/views/clients';
import { ClientAggregateRepositoryImpl } from '@/views/clients';
import { AppRoutesClient } from '@/views/clients/presentation/routes/';
import { AdressesList, PhonesList, EmailsList } from '@/views/clients/presentation/components/';

const repository = new ClientRepositoryImpl();
const getClientByIdUseCase = new GetClientByIdUseCase(repository);

const aggregateRepository = new ClientAggregateRepositoryImpl();
const getClientDeliveriesUseCase = new GetClientDeliveriesUseCase(aggregateRepository);

const client = ref<Client | null>(null);
const loading = ref(true);

const totalInvoiced = ref<number>(0);
const earningsDelivery = ref<number>(0);
const pendingEarnings = ref<number>(0);
const pendingEarningsCount = ref<number>(0);
const earningsCurrentMonth = ref<number>(0);
const calculationsLoading = ref(true);

const route = useRoute();
const clientId = route.params.id as string;

const loadData = async () => {
  try {
    client.value = await getClientByIdUseCase.execute(clientId);
  } catch (error) {
    console.error('Error loading client:', error);
  } finally {
    loading.value = false;
  }
};

const loadCalculations = async () => {
  try {
    const [total, earnings, pending, currentMonth, Count] = await Promise.all([
      getClientDeliveriesUseCase.getTotalInvoiced(clientId),
      getClientDeliveriesUseCase.getEarningsDelivery(clientId),
      getClientDeliveriesUseCase.getPendingEarnings(clientId),
      getClientDeliveriesUseCase.getEarningsDeliveryOfCurrentMonth(clientId),
      getClientDeliveriesUseCase.getPendingEarningsCount(clientId),
    ]);

    totalInvoiced.value = total;
    earningsDelivery.value = earnings;
    pendingEarnings.value = pending;
    earningsCurrentMonth.value = currentMonth;
    pendingEarningsCount.value = Count;
  } catch (error) {
    console.error('Error loading calculations:', error);
  } finally {
    calculationsLoading.value = false;
  }
};

onMounted(() => {
  loadData();
  loadCalculations();
});

const lineContents = computed(() => adaptTimeLineContentToUI(client.value?.getTimeLineContent() ?? [], CLIENT_UI_TIME_LINE_CONTENT_DEFINITIONS));
const credit = computed(() => (client.value?.getAllowCredit() ? 'Si' : 'No'));

const formattedPendingEarnings = computed(() => formatToDollars(pendingEarnings.value));
const formattedPendingEarningsCount = computed(() => pendingEarningsCount.value);
const formattedEarningsDelivery = computed(() => formatToDollars(earningsDelivery.value));
const formattedEarningsCurrentMonth = computed(() => formatToDollars(earningsCurrentMonth.value));

const sectionActions = [
  {
    content: 'Editar Client',
    url: AppRoutesClient.edit(clientId),
  },
];
</script>
