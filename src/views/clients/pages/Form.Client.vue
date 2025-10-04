<template>
  <SideBar>
    <BackButton />
    <div class="flex justify-center items-center min-h-[calc(100vh-6rem)] py-6 px-2">
      <Card class="w-full max-w-4xl p-6">
        <LoadingAbsoluteSkeleton v-if="!formReady" />
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
            <FieldForm label="Nombre Legal" name="legal_name" id="legal_name" required />
            <SelectForm
              label="Tipo de cliente"
              name="type"
              id="type"
              placeholder="Selecciona un tipo de documento"
              :items="Array.from(ClientTypeOptions)"
              required
            />
            <FieldForm label="Número de documento" name="registration_number" id="registration_number" required />
            <div>
              <SelectForm
                label="Credito"
                name="allow_credit"
                id="allow_credit"
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
import { nextTick, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useVeeForm } from '@/composables';
import {
  AcceptButton,
  BackButton,
  CancelButton,
  Card,
  FieldForm,
  LoadingAbsoluteSkeleton,
  SelectForm,
  SideBar,
  Tabs,
  TabsContent,
  TabsTitle,
  TextAreaForm,
} from '@/components';
import { ClientTypeOptions, FormClient } from '@/views/clients/models';
import { AllowCreditOptions } from '@views/clients';
import { TABS_FORM_CLIENT } from '@/views/clients/constants';
import { ClientSchema } from '@/views/clients/schema';
import { AppRoutesClient } from '@/views/clients/router';
import { createClient, getClientById, updateClient } from '@/views/clients/service/';
import { AdressesForm, EmailsForm, PhonesForm } from '@/views/clients/components/';
import { useAuthStore } from '@stores';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { isUser } = storeToRefs(authStore);

const activeTab = ref('general');

const formReady = ref(false);

const router = useRouter();
const route = useRoute();
const client_id = route.params.id as string;

const { initializeForm, onSubmit, meta } = useVeeForm<FormClient>({
  id: client_id,
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
