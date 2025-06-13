<template>
  <SideBar>
    <LoadingSkeleton v-if="!client" />
    <div v-else class="space-y-8 text-gray-900 dark:text-gray-100">
      <div class="md:flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div class="hidden md:block">
          <h1 class="text-3xl font-bold tracking-tight">
            {{ client.legalName }}
          </h1>
          <div class="flex items-center gap-2">
            <h5 class="text-sm font-medium text-muted-foreground dark:text-gray-400">Tipo de documento</h5>
            <Text
              >| <Bagde>{{ client.type }}</Bagde>
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
                  <SectionText title="Nombre Legal" :content="client.legalName" />
                  <SectionText title="Tipo de documento" :content="client.type" />
                  <SectionText title="Número de documento" :content="client.registrationNumber" />
                  <SectionText title="Credito" :content="credit" />
                </div>
                <SectionText title="Notas" :content="client.notes" />
                <div class="space-y-6 pt-8">
                  <AdressesList :addresses="client.addresses" />
                  <PhonesList :phones="client.phones" />
                  <EmailsList :emails="client.emails" />
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
              <div class="text-2xl font-bold">{{ formatDateShort(client.updatedAt) }}</div>
              <p class="text-xs text-gray-500">{{ formatRelativeDate(client.updatedAt) }}</p>
            </ActivityView>
            <ActivityView title="Creacion del cliente">
              <div class="text-2xl font-bold">{{ formatDateShort(client.createdAt) }}</div>
              <p class="text-xs text-gray-500">{{ formatRelativeDate(client.createdAt) }}</p>
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
import { Client } from '@/views/clients/models';
import {
  getClientById,
  getClientTotalInvoiced,
  getClientEarningsDelivery,
  getClientPendingEarnings,
  getClientPendingEarningsCount,
  getClientEarningsDeliveryCurrentMonth,
} from '@/views/clients/service/';
import { AppRoutesClient } from '@/views/clients/router';
import { AdressesList, PhonesList, EmailsList } from '@/views/clients/components/';
import { adaptTimeLineContentToUI } from '@time-line-content/adapter';
import { MenuTimeLineContent } from '@time-line-content/presentation/';

const route = useRoute();
const clientId = route.params.id as string;

const client = ref<Client | null>(null);
const loading = ref(true);

const totalInvoiced = ref(0);
const earningsDelivery = ref(0);
const pendingEarnings = ref(0);
const earningsCurrentMonth = ref(0);
const pendingEarningsCount = ref(0);
const calculationsLoading = ref(true);

const loadClientData = async () => {
  try {
    client.value = await getClientById(clientId);
  } finally {
    loading.value = false;
  }
};

const loadClientCalculations = async () => {
  try {
    const [total, earnings, pending, currentMonth, count] = await Promise.all([
      getClientTotalInvoiced(clientId),
      getClientEarningsDelivery(clientId),
      getClientPendingEarnings(clientId),
      getClientPendingEarningsCount(clientId),
      getClientEarningsDeliveryCurrentMonth(clientId),
    ]);
    totalInvoiced.value = total;
    earningsDelivery.value = earnings;
    pendingEarnings.value = pending;
    earningsCurrentMonth.value = currentMonth;
    pendingEarningsCount.value = count;
  } finally {
    calculationsLoading.value = false;
  }
};

onMounted(() => {
  loadClientData();
  loadClientCalculations();
});

const lineContents = computed(() => []);

const credit = computed(() => (client.value?.allowCredit ? 'Sí' : 'No'));

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
