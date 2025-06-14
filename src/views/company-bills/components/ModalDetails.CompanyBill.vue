<template>
  <Modal :is-open="isOpen" @close="handleCloseModal">
    <LoadingSkeleton v-if="!bill" />
    <div v-else class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-2xl mx-auto overflow-hidden">
      <div class="px-8 pt-8 pb-6 border-b border-gray-100 dark:border-gray-800">
        <div class="flex items-center gap-3 mb-2">
          <div class="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <Building2 class="h-5 w-5 text-black dark:text-white" />
          </div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Detalle del Gasto</h2>
        </div>
      </div>
      <div class="px-8 py-6 space-y-6">
        <div class="text-center py-4">
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Monto</p>
          <p class="text-3xl font-bold text-gray-900 dark:text-white">
            {{ formatToDollars(bill.amount) }}
          </p>
        </div>
        <div class="space-y-4">
          <div class="flex justify-between items-center py-3 border-b border-gray-50 dark:border-gray-800">
            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Nombre</span>
            <span class="text-sm text-gray-900 dark:text-white font-medium">
              {{ bill.name }}
            </span>
          </div>
          <div class="flex justify-between items-center py-3 border-b border-gray-50 dark:border-gray-800">
            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Fecha</span>
            <span class="text-sm text-gray-900 dark:text-white">
              {{ formatDateCustom(bill.date) }}
            </span>
          </div>
          <div class="flex justify-between items-center py-3 border-b border-gray-50 dark:border-gray-800">
            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Método de Pago</span>
            <span class="text-sm text-gray-900 dark:text-white">
              {{ formatPaymentMethod(bill.method) }}
            </span>
          </div>
        </div>
        <div class="space-y-3">
          <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Descripción</h3>
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {{ bill.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Building2 } from 'lucide-vue-next';
import { formatDateCustom, formatToDollars } from '@/utils/';
import { LoadingSkeleton, Modal } from '@/components/';
import { CompanyBill, formatPaymentMethod } from '@/views/company-bills/';
import { getCompanyBillById } from '@/views/company-bills/services';

const bill = ref<CompanyBill | null>(null);
const loading = ref(true);

const props = defineProps<{
  isOpen: boolean;
  companyBillId: string | number;
}>();

const loadData = async () => {
  if (!props.companyBillId) {
    bill.value = null;
    loading.value = false;
    return;
  }

  loading.value = true;
  try {
    const idAsString = String(props.companyBillId);
    bill.value = await getCompanyBillById(idAsString);
  } catch (error) {
    bill.value = null;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadData();
});

watch(
  () => props.companyBillId,
  () => {
    loadData();
  }
);

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const handleCloseModal = () => {
  emit('close');
};
</script>
