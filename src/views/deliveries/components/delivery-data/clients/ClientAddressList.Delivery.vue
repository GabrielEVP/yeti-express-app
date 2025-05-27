<template>
  <Dropdown>
    <template #header>
      <MapPin class="h-5 w-5" />
      <span class="font-medium">Dirección de Recogida</span>
    </template>
    <template #data>
      <div
        v-if="address"
        class="border rounded-md p-3 bg-muted/30 dark:border-gray-700 dark:bg-gray-700"
      >
        <div class="flex justify-between items-start">
          <div class="space-y-1 text-sm">
            <p><span class="font-medium">Dirección:</span> {{ address.address }}</p>
          </div>
        </div>
      </div>
      <EmptyData v-else class="mt-10" />
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { MapPin } from 'lucide-vue-next';
import { Dropdown, EmptyData } from '@/components/';
import { ClientAddress } from '@views/clients';
defineProps<{
  address: ClientAddress | null;
}>();
</script>
