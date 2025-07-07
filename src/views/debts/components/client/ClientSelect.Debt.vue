<template>
  <Card>
    <div class="p-4 sm:p-6">
      <header class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-medium text-gray-900 dark:text-gray-100 truncate">
            {{ selectedClient?.legal_name || 'Selecciona un cliente' }}
          </h2>
          <p v-if="selectedClient" class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {{ selectedClient.registration_number }}
          </p>
        </div>

        <div class="flex gap-4 flex-col sm:flex-row sm:flex-nowrap">
          <bagde> Deuda completa: {{ formatToDollars(totalDebtsAmount ?? 0) }}</bagde>
          <ReportButton>
            <div class="grid grid-cols-1 dark:bg-gray-700 dark:text-white">
              <button type="button" @click="() => openGeneral('')" class="text-start border-b p-4">Reporte de cuentas General</button>
              <button type="button" @click="handlePendingReport" class="text-start border-b p-4">Reporte de cuentas por cobrar</button>
              <button type="button" @click="() => openDetail('')" class="text-start border-b p-4">Reporte de cuentas por cliente</button>
            </div>
          </ReportButton>
          <Button
            @click="$emit('open')"
            class="text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Buscar Cliente
          </Button>
        </div>
      </header>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t">
        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded-md p-3">
                <ClipboardIcon class="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Deudas Pendientes del cliente</dt>
                  <dd>
                    <div class="text-lg font-semibold text-gray-900 dark:text-white">
                      {{ stast?.total_deliveries_with_debt ?? 0 }}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-900/30 px-5 py-3">
            <div class="text-sm">
              <span class="font-medium text-gray-600 dark:text-gray-400">Entregas sin pago completo</span>
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded-md p-3">
                <DollarSignIcon class="h-6 w-6 text-gray-600 dark:text-gray-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Monto Pendiente</dt>
                  <dd>
                    <div class="text-lg font-semibold text-gray-900 dark:text-white">
                      {{ formatToDollars(stast?.total_pending ?? 0) }}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-900/30 px-5 py-3">
            <div class="text-sm">
              <span class="font-medium text-gray-600 dark:text-gray-400">Total por cobrar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Card>

  <ModalReportGeneral
    title="Reporte de deudas general"
    :isOpen="isOpenGeneral"
    :openDate="openDate"
    :closeDate="closeDate"
    @close="closeGeneral"
    @submit-filter="handleGeneralReport"
  />
  <ModalReportDetail
    title="Reporte de deudas por cliente"
    :isOpen="isOpenDetail"
    :openDate="openDate"
    :closeDate="closeDate"
    @close="closeDetail"
    @submit-filter="handleReportDetail"
    :selected-id="selectedClient?.id || null"
    :selectOptions="clientsOptions"
    selectLabel="Cliente"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { formatToDollars, generatePdf } from '@utils';
import { Bagde, Button, Card, ModalReportDetail, ModalReportGeneral, ReportButton } from '@components';
import { ClientDebt, ClientStats } from '@views/debts/models';
import { useModal } from '@composables';
import { allGetClientsDebtReport, allGetPendingPaidDebtsReport, getClientDebtReport } from '@/views/debts/';
import { ClipboardIcon, DollarSignIcon } from 'lucide-vue-next';

const props = defineProps<{
  selectedClient: ClientDebt | null;
  totalDebtsAmount: number | null;
  stast: ClientStats | null;
  clientsWithDebts: ClientDebt[] | null;
}>();

defineEmits<{
  (e: 'open'): void;
}>();

const openDate = ref<string>('');
const closeDate = ref<string>('');

const { isOpen: isOpenGeneral, open: openGeneral, close: closeGeneral } = useModal();
const { isOpen: isOpenDetail, open: openDetail, close: closeDetail } = useModal();

const clientsOptions = computed(() => {
  if (!props.clientsWithDebts) return [];
  return props.clientsWithDebts.map((client) => ({
    label: client.legal_name,
    value: client.id,
  }));
});

const handleGeneralReport = async (start: string, end: string) => {
  const blob = await allGetClientsDebtReport(start, end);
  const filename = `informe_general_deudas_${start}_${end}.pdf`;
  generatePdf(blob, filename);
};

const handleReportDetail = async (clientId: string, start: string, end: string) => {
  const blob = await getClientDebtReport(clientId, start, end);
  const filename = `informe_deuda_${clientId}.pdf`;
  generatePdf(blob, filename);
};

const handlePendingReport = async () => {
  const blob = await allGetPendingPaidDebtsReport();
  const filename = `informe_deuda_general.pdf`;
  generatePdf(blob, filename);
};
</script>
