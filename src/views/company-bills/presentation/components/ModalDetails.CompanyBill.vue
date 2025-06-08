<template>
  <Modal :is-open="isOpen" @close="handleCloseModal">
    <LoadingSkeleton v-if="!bill" />
    <div v-else class="space-y-8 text-gray-900 dark:text-gray-100">
      <div class="flex justify-center">
        <div class="w-full max-w-4xl">
          <div class="p-6 flex flex-col items-center text-center space-y-6">
            <h2 class="text-xl font-semibold flex items-center gap-2 mb-4">
              <Building2 class="h-5 w-5" />
              Información del Gasto
            </h2>

            <div class="w-full max-w-2xl space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
                <SectionText title="Nombre" :content="bill.getName()" />
                <SectionText title="Fecha" :content="formatDateCustom(bill.getDate())" />
                <SectionText title="Método de Pago" :content="bill.getFormattedMethod()" />
                <SectionText title="Monto" :content="formatToDollars(bill.getAmount())" />
              </div>
              <div class="text-center">
                <h3 class="text-lg font-medium mb-2">Descripción</h3>
                <p
                  class="text-left text-gray-700 dark:text-gray-300 max-w-2xl mx-auto break-words whitespace-pre-wrap leading-relaxed"
                >
                  {{ bill.getDescription() }}
                </p>
              </div>
            </div>
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
import { SectionText, LoadingSkeleton, Modal } from '@/components/';
import { CompanyBill } from '@/views/company-bills/domain';
import { CompanyBillRepositoryImpl } from '@/views/company-bills/infrastructure/CompanyBill.RepositoryImpl';
import { GetCompanyBillByIdUseCase } from '@/views/company-bills/use-cases/CompanyBill.GetByIdUseCase';

const repository = new CompanyBillRepositoryImpl();
const getCompanyBillByIdUseCase = new GetCompanyBillByIdUseCase(repository);

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
    bill.value = await getCompanyBillByIdUseCase.execute(idAsString);
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
