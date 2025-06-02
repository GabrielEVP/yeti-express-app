<template>
  <SideBar>
    <LoadingSkeleton v-if="!bill" />
    <div v-else class="space-y-8 text-gray-900 dark:text-gray-100">
      <div class="md:flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div class="hidden md:block">
          <h1 class="text-3xl font-bold tracking-tight">
            {{ bill.getName() }}
          </h1>
          <div class="flex items-center gap-2">
            <h5 class="text-sm font-medium text-muted-foreground dark:text-gray-400">Factura</h5>
            <Text>| {{ bill.getId() }}</Text>
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
                Información de la Factura
              </h2>
              <div class="space-y-5">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SectionText title="Fecha" :content="formatDateShort(bill.getDate())" />
                  <SectionText title="Nombre" :content="bill.getName()" />
                  <SectionText title="Método de Pago" :content="bill.getFormattedMethod()" />
                  <SectionText title="Monto" :content="formatToDollars(bill.getAmount())" />
                </div>
                <div>
                  <h3 class="text-lg font-medium mb-2">Descripción</h3>
                  <p class="text-gray-700 dark:text-gray-300">{{ bill.getDescription() }}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div class="md:col-span-4">
          <Card class="dark:bg-gray-800 dark:text-gray-100">
            <div class="p-6">
              <h2 class="text-xl font-semibold mb-4">Información Adicional</h2>
              <div class="space-y-4">
                <div>
                  <h3 class="text-sm text-gray-500 dark:text-gray-400">Creado</h3>
                  <p class="font-medium">{{ formatDateShort(bill.getCreatedAt()) }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ formatRelativeDate(bill.getCreatedAt()) }}</p>
                </div>
                <div>
                  <h3 class="text-sm text-gray-500 dark:text-gray-400">Última actualización</h3>
                  <p class="font-medium">{{ formatDateShort(bill.getUpdatedAt()) }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ formatRelativeDate(bill.getUpdatedAt()) }}</p>
                </div>
                <div>
                  <h3 class="text-sm text-gray-500 dark:text-gray-400">ID de Usuario</h3>
                  <p class="font-medium">{{ bill.getUserId() }}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </SideBar>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Building2 } from 'lucide-vue-next';
import { formatDateShort, formatRelativeDate, formatToDollars } from '@/utils/';
import {
  SideBar,
  SectionText,
  Card,
  ActionsButton,
  LoadingSkeleton,
  Text
} from '@/components/';
import { CompanyBill } from '@/views/company-bills/domain';
import { CompanyBillRepositoryImpl } from '@/views/company-bills/infrastructure/CompanyBill.RepositoryImpl';
import { GetCompanyBillByIdUseCase } from '@/views/company-bills/use-cases/';
import { AppRoutesCompanyBill } from '@/views/company-bills/presentation/routes/';

const repository = new CompanyBillRepositoryImpl();
const getCompanyBillByIdUseCase = new GetCompanyBillByIdUseCase(repository);

const bill = ref<CompanyBill | null>(null);
const loading = ref(true);

const route = useRoute();
const billId = route.params.id as string;

const loadData = async () => {
  bill.value = await getCompanyBillByIdUseCase.execute(billId);
  loading.value = false;
};

onMounted(() => {
  loadData();
});

// No longer need this function as we use bill.getFormattedMethod()

const sectionActions = [
  {
    content: 'Editar Factura',
    url: AppRoutesCompanyBill.edit(billId),
  },
];
</script>
