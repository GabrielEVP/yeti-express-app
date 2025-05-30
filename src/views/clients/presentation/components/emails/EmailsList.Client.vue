<template>
  <Dropdown>
    <template #header>
      <Mail class="h-5 w-5" />
      <span class="font-medium"> Correos Electrónicos ({{ emails.length }}) </span>
    </template>
    <template #data>
      <div
        v-if="emails.length > 0"
        v-for="email in emails"
        :key="email.getId()"
        class="border rounded-md p-3 bg-muted/30 dark:border-gray-700 dark:bg-gray-700"
      >
        <a
          :href="`mailto:${email.getEmail()}`"
          class="text-blue-600 hover:underline dark:text-blue-400"
        >
          {{ email.getEmail() }}
        </a>
      </div>
      <EmptyData v-else class="mt-10" />
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Mail } from 'lucide-vue-next';
import { Dropdown, EmptyData } from '@/components/';
import { ClientEmail } from '@views/clients/domain';

defineProps<{
  emails: ClientEmail[];
}>();
</script>
