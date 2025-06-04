<template>
  <ModalForm
    title="Añadir Pago"
    :meta="meta"
    :isOpen="isOpen"
    @onSubmit="onSubmitform"
    @close="$emit('close')"
  >
    <div class="space-y-4 border p-4 rounded-md mb-4">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold dark:text-white">Agregar Pago</h3>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-3 space-x-4">
        <SelectForm
          label="Tipo de cliente"
          name="type"
          id="type"
          :items="Array.from(ClientTypeOptions)"
          required
        />
        <FieldForm label="Nombre Legal" name="legalName" id="legalName" required />
      </div>
    </div>
  </ModalForm>
</template>

<script setup lang="ts">
import { defineProps, onMounted } from 'vue';
import { useVeeForm } from '@/composables/';
import { ModalForm, FieldForm, SelectForm } from '@/components/';
import { , ClientDebtPayment } from '@/views/clients/domain/';
import { ClientTypeOptions } from '@/views/clients/domain/';
import { BasicClientSchema } from '@views/deliveries/schemas/Delivery.ClientBasicSchema';
import { CreateClientUseCase } from '@/views/clients/use-cases/';
import { ClientRepositoryImpl } from '@/views/clients/infrastructure/Client.RepositoryImpl';
import { ClientFormAdapter } from '@views/clients/adapters/';

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'addClient', clientData: Client): void;
}>();
const repository = new ClientRepositoryImpl();
const createClientUseCase = new CreateClientUseCase(repository);

const { initializeForm, onSubmit, meta } = useVeeForm<Client>({
  modal: true,
  create: (formValues) => {
    const client = ClientFormAdapter.fromForm(formValues);
    return createClientUseCase.execute(client);
  },
  messages: {
    createError: 'Error al crear el cliente',
    createSuccess: 'Cliente creado correctamente',
  },
  validation: {
    schema: BasicClientSchema,
    initialValues: {},
  },
});

onMounted(() => {
  initializeForm();
});

async function onSubmitform() {
  const createdClient = await onSubmit();

  if (createdClient) {
    emit('close');
    emit('addClient', createdClient);
  }
}
</script>
