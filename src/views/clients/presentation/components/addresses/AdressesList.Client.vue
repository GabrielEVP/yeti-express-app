<template>
  <Dropdown>
    <template #header>
      <MapPin class="h-5 w-5" />
      <span class="font-medium">Direcciones ({{ addresses.length }}) </span>
    </template>
    <template #data>
      <div
        v-if="addresses.length > 0"
        v-for="address in addresses"
        :key="address.getId()"
        class="border rounded-md p-3 bg-muted/30 dark:border-gray-700 dark:bg-gray-700"
      >
        <div class="flex justify-between items-start">
          <div class="space-y-1">
            <p class="font-medium">{{ address.getAddress() }}</p>
          </div>
        </div>
      </div>
      <EmptyData v-else class="mt-10" />
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { MapPin } from 'lucide-vue-next';
import { Dropdown, EmptyData } from '@/components/';
import { ClientAddress } from '@/views/clients/';

defineProps<{
  addresses: ClientAddress[];
}>();
</script>
