<template>
  <SideBar>
    <div class="flex justify-center items-center min-h-[calc(90vh-3rem)] py-6 px-2">
      <Card class="w-full max-w-4xl p-6">
        <form @submit.prevent="onSubmit" class="h-full space-y-6">
          <Tabs :activeTab="activeTab" @update:activeTab="activeTab = $event">
            <template #mobile>
              <template v-for="tab in TABS_FORM_SERVICE" :key="tab.value">
                <option :value="tab.value">
                  {{ tab.label }}
                </option>
              </template>
            </template>
            <template #desktop>
              <TabsTitle
                v-for="tab in TABS_FORM_SERVICE"
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
          </TabsContent>
          <TabsContent tab="bills" :activeTab="activeTab">
            <div>
              <FieldForm label="Comisión" name="comision" id="comision" type="number" required />
              <div class="flex justify-end mb-4">
                <PlusButton type="button" @click="push(new Bill('', '', 0))" />
              </div>
              <div v-if="fields.length === 0" class="space-y-4 border p-4 rounded-md mb-4">
                <Text>No hay gastos agregados</Text>
              </div>
              <div v-for="(field, idx) in fields" :key="field.key" class="space-y-4 border p-4 rounded-md mb-4">
                <div class="flex justify-between items-center">
                  <h3 class="text-lg font-semibold dark:text-white">Gasto {{ idx + 1 }}</h3>
                  <TrashButton type="button" @click="remove(idx)" />
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <FieldForm label="nombre" :id="`bills-${idx}`" :name="`bills[${idx}].name`" :required="idx === 0" />
                  <FieldForm label="Monto" :id="`bills-${idx}`" :name="`bills[${idx}].amount`" :required="idx === 0" />
                </div>
              </div>
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
import { useFieldArray } from 'vee-validate';
import { useVeeForm } from '@/composables';
import {
  SideBar,
  Card,
  FieldForm,
  TextAreaForm,
  AcceptButton,
  CancelButton,
  Tabs,
  TabsTitle,
  TabsContent,
  PlusButton,
  TrashButton,
  Text,
} from '@/components';
import { Service } from '@views/services/';
import type { Bill } from '@/views/services/';
import { serviceSchema } from '@views/services/schema';
import { getServiceById, createService, updateService } from '@views/services/';
import { TABS_FORM_SERVICE } from '@/views/services/constants';

const activeTab = ref('general');

const router = useRouter();
const route = useRoute();
const serviceId = route.params.id as string;

const { initializeForm, onSubmit, meta } = useVeeForm<Service, string>({
  id: serviceId,
  getById: getServiceById,
  create: createService,
  update: (values, id) => updateService(values, id),
  defaultRoute: '/services',
  messages: {
    createError: 'Error al crear el servicio',
    updateError: 'Error al actualizar el servicio',
    createSuccess: 'Servicio creado correctamente',
    updateSuccess: 'Servicio actualizado correctamente',
  },
  validation: {
    schema: serviceSchema,
    initialValues: {},
  },
});

const { fields, push, remove } = useFieldArray<Bill>('bills');

onMounted(initializeForm);
</script>
