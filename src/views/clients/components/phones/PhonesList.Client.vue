<template>
  <Dropdown>
    <template #header>
      <Phone class="h-5 w-5" />
      <span class="font-medium">Teléfonos ({{ phones.length }}) </span>
    </template>
    <template #data>
      <div
        v-if="phones.length > 0"
        v-for="phone in phones"
        :key="phone.id"
        class="border rounded-md p-3 bg-muted/30 dark:border-gray-700 dark:bg-gray-700"
      >
        <div>
          <p>{{ phone.phone }}</p>
        </div>
      </div>
      <EmptyData v-else class="mt-10" />
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Phone } from 'lucide-vue-next';
import { Dropdown, EmptyData } from '@/components/';
import { ClientPhone } from '@views/clients/';

defineProps<{
  phones: ClientPhone[];
}>();
</script>
