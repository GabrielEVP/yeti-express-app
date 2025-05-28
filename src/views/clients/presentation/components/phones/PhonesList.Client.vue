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
        :key="phone.getId()"
        class="flex justify-between items-center border-b py-2 last:border-0 dark:border-gray-700"
      >
        <div>
          <p>{{ phone.getPhone() }}</p>
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
import { ClientPhone } from '@views/clients/domain';

defineProps<{
  phones: ClientPhone[];
}>();
</script>
