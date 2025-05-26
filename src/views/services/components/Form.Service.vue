<template>
  <SideBar>
    <div class="flex justify-center items-center min-h-[calc(100vh-3rem)] py-6 px-2">
      <Card class="w-full max-w-4xl p-6">
        <form @submit.prevent="onSubmit" class="h-full space-y-6">
          <Tabs :activeTab="activeTab" @update:activeTab="activeTab = $event">
            <template #mobile>
              <template v-for="tab in SERVICETABS" :key="tab.value">
                <option :value="tab.value">
                  {{ tab.label }}
                </option>
              </template>
            </template>
            <template #desktop>
              <TabsTitle
                v-for="tab in SERVICETABS"
                :key="tab.value"
                :tab="tab.value"
                :activeTab="activeTab"
                @update:activeTab="activeTab = $event"
              >
                <component :is="tab.icon" class="w-4 h-4 dark:text-white" />
                <span class="m-4 dark:text-white">{{ tab.label }}</span>
              </TabsTitle>
            </template>
          </Tabs>
          <TabsContent tab="general" :activeTab="activeTab">
            <FieldForm label="Nombre" name="name" id="name" required />
            <TextAreaForm label="Descripción" name="description" id="description" required />
            <FieldForm label="Monto" name="amount" id="amount" type="number" required />
            <FieldForm label="Comisión" name="comision" id="comision" type="number" required />
          </TabsContent>
          <TabsContent tab="bills" :activeTab="activeTab">
            <div class="space-y-4">
              <div v-for="(bill, index) in bills" :key="index" class="flex gap-4">
                <FieldForm
                  :label="'Nombre de factura ' + (index + 1)"
                  :name="`bills[${index}].name`"
                  :id="`bill-name-${index}`"
                  required
                />
                <FieldForm
                  :label="'Monto de factura ' + (index + 1)"
                  :name="`bills[${index}].amount`"
                  :id="`bill-amount-${index}`"
                  type="number"
                  required
                />
                <button
                  type="button"
                  @click="removeBill(index)"
                  class="mt-8 text-red-500 hover:text-red-700"
                >
                  <Trash2 class="w-5 h-5" />
                </button>
              </div>
              <button
                type="button"
                @click="addBill"
                class="text-blue-500 hover:text-blue-700 flex items-center gap-2"
              >
                <Plus class="w-4 h-4" />
                Agregar factura
              </button>
            </div>
          </TabsContent>
          <div class="flex justify-end space-x-2">
            <CancelButton @click="router.back()" />
            <AcceptButton :disabled="!meta.valid" />
          </div>
        </form>
      </Card>
    </div>
  </SideBar>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useVeeForm } from '@/composables/';
import {
  SideBar,
  Card,
  Tabs,
  TabsContent,
  TabsTitle,
  FieldForm,
  TextAreaForm,
  AcceptButton,
  CancelButton,
} from '@/components/';
import { FileText, Receipt, Plus, Trash2 } from 'lucide-vue-next';
import { Service } from '../models/Service';
import {
  getService,
  postService,
  putService,
  SERVICES_FORM_VALUE,
  serviceSchema,
} from '@/views/services';

const SERVICETABS = [
  {
    label: 'General',
    value: 'general',
    icon: FileText,
  },
  {
    label: 'Facturas',
    value: 'bills',
    icon: Receipt,
  },
] as const;

const activeTab = ref('general');
const router = useRouter();
const route = useRoute();
const serviceId = route.params.id as string;
const bills = ref([{ name: '', amount: 0 }]);

const addBill = () => {
  bills.value.push({ name: '', amount: 0 });
};

const removeBill = (index: number) => {
  bills.value.splice(index, 1);
};
const { initializeForm, onSubmit, meta } = useVeeForm<Service, string>({
  id: serviceId,
  getById: getService,
  create: postService,
  update: (values, id) => putService(values, id),
  defaultRoute: '/services',
  messages: {
    createError: 'Error al crear el servicio',
    updateError: 'Error al actualizar el servicio',
    createSuccess: 'Servicio creado correctamente',
    updateSuccess: 'Servicio actualizado correctamente',
  },
  validation: {
    schema: serviceSchema,
    initialValues: { ...SERVICES_FORM_VALUE },
  },
});

onMounted(initializeForm);
</script>
