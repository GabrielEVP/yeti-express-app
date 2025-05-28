<template>
  <SideBar>
    <div class="flex justify-center items-center min-h-[calc(100vh-3rem)] py-6 px-2">
      <Card class="w-full max-w-4xl p-6">
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
              :items="ClientTypeOptions"
              required
            />
            <FieldForm
              label="Número de documento"
              name="registrationNumber"
              id="registrationNumber"
              required
            />
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
import { ref, onMounted } from 'vue';
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
} from '@/components';
import { Client } from '@/views/clients/domain/Client';
import { ClientTypeOptions } from '@views/clients/domain';
import { ClientSchema } from '@/views/clients/schemas';
import {
  GetClientByIdUseCase,
  CreateClientUseCase,
  UpdateClientUseCase,
} from '@/views/clients/use-cases/';
import { ClientRepositoryImpl } from '@/views/clients/infrastructure/Client.RepositoryImpl';
import { mapFormToClient } from '@/views/clients/adapters/Client.FormAdapter';
import { AppRoutesClient } from '@/views/clients/presentation/routes';
import { TABS_FORM_CLIENT } from '@/views/clients/presentation/constants';
import { AdressesForm, PhonesForm, EmailsForm } from '@/views/clients/presentation/components/';

const activeTab = ref('general');

const router = useRouter();
const route = useRoute();
const clientId = route.params.id as string;

const repository = new ClientRepositoryImpl();
const getClientById = new GetClientByIdUseCase(repository);
const createClientUseCase = new CreateClientUseCase(repository);
const updateClientUseCase = new UpdateClientUseCase(repository);

const { initializeForm, onSubmit, meta } = useVeeForm<Client>({
  id: clientId,
  getById: async (id) => {
    const client = await getClientById.execute(id);
    if (!client) throw new Error('Cliente no encontrado');
    return client;
  },
  create: (formValues) => {
    const client = mapFormToClient(formValues);
    return createClientUseCase.execute(client);
  },
  update: (formValues, id) => {
    const client = mapFormToClient({ ...formValues, id });
    return updateClientUseCase.execute(id, client);
  },
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

onMounted(initializeForm);
</script>
