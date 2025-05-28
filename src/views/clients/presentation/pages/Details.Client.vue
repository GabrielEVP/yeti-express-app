<template>
  <SideBar>
    <LoadingSkeleton v-if="!client" />
    <div v-else class="space-y-8 text-gray-900 dark:text-gray-100">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">
            {{ client.getLegalName() }}
          </h1>
          <div class="flex items-center gap-2">
            <h5 class="text-sm font-medium text-muted-foreground dark:text-gray-400">Registro</h5>
            <Text>| {{ client.getRegistrationNumber() }}</Text>
          </div>
        </div>
        <div class="flex gap-2">
          <ActionsButton title="Acciones" :datas="sectionActions" />
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card class="md:col-span-2 dark:bg-gray-800 dark:text-gray-100">
          <div class="p-6">
            <h2 class="text-xl font-semibold flex items-center gap-2 mb-4">
              <Building2 class="h-5 w-5" />
              Información del Cliente
            </h2>
            <div class="space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SectionText title="Nombre Legal" :content="client.getLegalName()" />
                <SectionText title="tipo de documento" :content="client.getType()" />
                <SectionText title="Número de registro" :content="client.getRegistrationNumber()" />
              </div>
              <SectionText title="Notas" :content="client.getNotes()" />
              <div class="space-y-6 pt-8">
                <AdressesList :addresses="client.getAddresses()" />
                <PhonesList :phones="client.getPhones()" />
                <EmailsList :emails="client.getEmails()" />
              </div>
            </div>
          </div>
        </Card>
        <TimeLineActivity :lineContents="lineContents" />
      </div>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ActivityView title="Total de Ganancias del mes">
          <div class="text-2xl font-bold">{{}}</div>
          <p class="text-xs text-gray-500">{{}}</p>
        </ActivityView>
        <ActivityView title="Deliverys Pendientes">
          <div class="text-2xl font-bold">{{}}</div>
          <p class="text-xs text-gray-500">{{}}</p>
        </ActivityView>
        <ActivityView title="Ultima Actualizacion">
          <div class="text-2xl font-bold">{{}}</div>
          <p class="text-xs text-gray-500">{{}}</p>
        </ActivityView>
        <ActivityView title="Creacion del cliente">
          <div class="text-2xl font-bold">{{}}</div>
          <p class="text-xs text-gray-500">{{}}</p>
        </ActivityView>
      </div>
    </div>
  </SideBar>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Building2 } from 'lucide-vue-next';
import { SideBar, SectionText, Card, ActionsButton, LoadingSkeleton } from '@/components/';
import { Client } from '@/views/clients/domain/';
import { ClientRepositoryImpl } from '@/views/clients';
import { GetClientByIdUseCase } from '@views/clients';
import { AppRoutesClient } from '@/views/clients/presentation/routes/';

const repository = new ClientRepositoryImpl();
const getClientByIdUseCase = new GetClientByIdUseCase(repository);

const client = ref<Client | null>(null);
const loading = ref(true);

const route = useRoute();
const courierId = route.params.id as string;

const loadData = async () => {
  client.value = await getClientByIdUseCase.execute(courierId);
  loading.value = false;
};

onMounted(() => {
  loadData();
});

const lineContents = computed(() => []);

const sectionActions = [
  {
    content: 'Editar Client',
    url: AppRoutesClient.edit(courierId),
  },
];
</script>
