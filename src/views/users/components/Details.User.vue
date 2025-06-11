<template>
  <SideBar>
    <div class="space-y-8 text-gray-900 dark:text-gray-100">
      <div class="flex flex-col md:flex-row justify-end items-start md:items-center gap-4">
        <div class="flex gap-2">
          <ActionsButton title="Acciones" :datas="sectionActions" />
        </div>
      </div>
      <div class="flex justify-center items-center min-h-screen">
        <Card v-if="user" class="md:col-span-2 dark:bg-gray-800 dark:text-gray-100">
          <div class="p-6">
            <h2 class="text-xl font-semibold flex items-center gap-2 mb-4">
              <UserRound class="h-5 w-5" />
              Tu Información
            </h2>
            <div class="space-y-5">
              <SectionText title="Nombre" :content="user.getName()" />
              <SectionText title="Email" :content="user.getEmail()" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  </SideBar>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { UserRound } from 'lucide-vue-next';
import { useAuthStore } from '@/stores/';
import { SideBar, SectionText, Card, ActionsButton } from '@/components/';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const user = computed(() => authStore.user);
const router = useRouter();

if (!user.value) {
  router.push('/login');
}

const sectionActions = [
  {
    content: 'Editar usuario',
    url: `/users/edit`,
  },
  {
    content: 'Cambiar contraseña',
    url: `/users/changePassword`,
  },
];
</script>
