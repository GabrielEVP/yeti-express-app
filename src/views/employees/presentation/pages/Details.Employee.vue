<template>
  <SideBar>
    <LoadingSkeleton v-if="!employee" />
    <div v-else class="space-y-8 text-gray-900 dark:text-gray-100">
      <div class="md:flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div class="hidden md:block">
          <h1 class="text-3xl font-bold tracking-tight">
            {{ employee.getName() }}
          </h1>
          <div class="flex items-center gap-2">
            <h5 class="text-sm font-medium text-muted-foreground dark:text-gray-400">Permisos</h5>
            <Text>| {{ employee.getRole() }}</Text>
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
                  <SectionText title="Nombre" :content="employee.getName()" />
                  <SectionText title="Correo electronico" :content="employee.getEmail()" />
                  <SectionText title="Permisos" :content="employee.getRole()" />
                </div>
              </div>
            </div>
          </Card>
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-2 lg:p-8">
            <ActivityView title="Ultima Actualizacion">
              <div class="text-2xl font-bold">{{ formatDateShort(employee.getUpdatedAt()) }}</div>
              <p class="text-xs text-gray-500">{{ formatRelativeDate(employee.getUpdatedAt()) }}</p>
            </ActivityView>
            <ActivityView title="Creacion del empleado">
              <div class="text-2xl font-bold">{{ formatDateShort(employee.getCreatedAt()) }}</div>
              <p class="text-xs text-gray-500">{{ formatRelativeDate(employee.getCreatedAt()) }}</p>
            </ActivityView>
          </div>
        </div>
        <Card
          class="md:col-span-4 max-h-[26rem] md:h-[56rem] md:min-h-[56rem] md:max-h-[56rem] overflow-y-auto pr-2"
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
import { Building2 } from 'lucide-vue-next';
import { formatDateShort, formatRelativeDate } from '@/utils/';
import {
  SideBar,
  SectionText,
  Card,
  ActionsButton,
  Text,
  ActivityView,
  LoadingSkeleton,
} from '@/components/';
import { MenuTimeLineContent } from '@time-line-content/presentation/';
import type { Employee } from '@/views/employees/domain/Employee';
import { EmployeeRepositoryImpl } from '@/views/employees/infrastructure/Employee.RepositoryImpl';
import { GetEmployeeByIdUseCase } from '@/views/employees/use-cases/Employee.GetByIdUseCase';
import { AppRoutesEmployee } from '@/views/employees/presentation/routes/';

const route = useRoute();
const employeeId = route.params.id as string;

const employee = ref<Employee | null>(null);
const loading = ref(true);

const repository = new EmployeeRepositoryImpl();
const getEmployeeByIdUseCase = new GetEmployeeByIdUseCase(repository);

const loadData = async () => {
  employee.value = await getEmployeeByIdUseCase.execute(employeeId);
  loading.value = false;
};

onMounted(() => {
  loadData();
});

const lineContents = computed(() => []);

const sectionActions = [
  {
    content: 'Editar Empleado',
    url: AppRoutesEmployee.edit(employeeId),
  },
];
</script>
