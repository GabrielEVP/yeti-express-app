<template>
  <SideBar>
    <div class="flex justify-center items-center min-h-[calc(100vh-3rem)] py-6 px-2">
      <Card class="w-full max-w-4xl p-6">
        <LoadingSkeleton v-if="!formReady" />
        <form @submit.prevent="onSubmit" class="h-full space-y-6">
          <Tabs :activeTab="activeTab" @update:activeTab="activeTab = $event">
            <template #mobile>
              <template v-for="tab in TABS_FORM_CLIENT" :key="tab.value">
                <option :value="tab.value">
                  {{ tab.label }}
                </option>
              </template>
            </template>
            <template #desktop>
              <TabsTitle
                v-for="tab in TABS_FORM_CLIENT"
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
            <FieldForm label="Nombre Legal" name="legalName" id="legalName" required />
            <SelectForm
              label="Tipo de cliente"
              name="type"
              id="type"
              placeholder="Selecciona un tipo de documento"
              :items="Array.from(ClientTypeOptions)"
              required
            />
            <FieldForm label="Número de documento" name="registrationNumber" id="registrationNumber" required />
            <div v-if="isUser">
              <SelectForm
                label="Credito"
                name="allowCredit"
                id="allowCredit"
                placeholder="Selecciona si el cliente puede pagar a credito"
                :items="Array.from(AllowCreditOptions)"
                required
              />
            </div>
          </TabsContent>
          <TabsContent tab="address" :activeTab="activeTab">
            <AdressesForm />
          </TabsContent>
          <TabsContent tab="contact" :activeTab="activeTab">
            <PhonesForm />
            <EmailsForm />
          </TabsContent>
          <TabsContent tab="notes" :activeTab="activeTab">
            <TextAreaForm label="Notas" name="notes" id="notes" />
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
import { ref, onMounted, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useVeeForm } from '@/composables';
import {
  SideBar,
  Card,
  FieldForm,
  SelectForm,
  TextAreaForm,
  AcceptButton,
  CancelButton,
  Tabs,
  TabsTitle,
  TabsContent,
  LoadingSkeleton,
} from '@/components';
import { Client } from '@/views/clients/models';
import { ClientTypeOptions } from '@/views/clients/models';
import { AllowCreditOptions } from '@views/clients';
import { TABS_FORM_CLIENT } from '@/views/clients/constants';
import { ClientSchema } from '@/views/clients/schema';
import { AppRoutesClient } from '@/views/clients/router';
import { getClientById, createClient, updateClient } from '@/views/clients/service/';
import { AdressesForm, PhonesForm, EmailsForm } from '@/views/clients/components/';
import { useAuthStore } from '@stores';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { isUser } = storeToRefs(authStore);

const activeTab = ref('general');

const formReady = ref(false);

const router = useRouter();
const route = useRoute();
const clientId = route.params.id as string;

const { initializeForm, onSubmit, meta } = useVeeForm<Client>({
  id: clientId,
  getById: getClientById,
  create: createClient,
  update: (values, id) => updateClient(values, id),
  defaultRoute: AppRoutesClient.list,
  messages: {
    createError: 'Error al crear el cliente',
    updateError: 'Error al actualizar el cliente',
    createSuccess: 'Cliente creado correctamente',
    updateSuccess: 'Cliente actualizado correctamente',
  },
  validation: {
    schema: ClientSchema,
    initialValues: {},
  },
});

onMounted(async () => {
  await initializeForm();

  await nextTick();
  formReady.value = true;
});
</script>
