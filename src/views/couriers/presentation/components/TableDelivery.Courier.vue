<template>
  <Card>
    <div class="max-h-96 overflow-y-auto" v-if="deliveries.length > 0">
      <div class="hidden md:block">
        <Table class="caption-bottom text-sm w-full">
          <TableHead>
            <TableRow
              class="transition-colors hover:bg-muted/50 deliveries-[state=selected]:bg-muted"
            >
              <TableContent>Número</TableContent>
              <TableContent>Fecha</TableContent>
              <TableContent class="text-center">Importe</TableContent>
              <TableContent class="text-center">Estado</TableContent>
              <TableContent class="text-center">Acciones</TableContent>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow v-for="delivery in deliveries" :key="delivery.getId()">
              <TableContent class="text-gray-900 dark:text-gray-50">
                {{ delivery.getNumber() }}
              </TableContent>
              <TableContent>
                {{ formatDateCustom(delivery.getDate()) }}
              </TableContent>
              <TableContent class="text-right">
                {{ formatToDollars(delivery.getAmount()) }}
              </TableContent>
              <TableContent class="text-center">
                <Bagde
                  :class="
                    delivery.getStatus() == DeliveryStatus.PENDING
                      ? 'border-blue-500'
                      : 'border-gray-500'
                  "
                >
                  {{ delivery.getStatusToFormat() }}
                </Bagde>
              </TableContent>
              <TableContent class="text-center">
                <div class="flex justify-center gap-2">
                  <EyeButton :route="AppRoutesDelivery.details(delivery.getId())" />
                  <DownloadButton @click="handleDownload(delivery.getId())" />
                </div>
              </TableContent>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div class="md:hidden space-y-4">
        <div
          v-for="delivery in deliveries"
          :key="delivery.getId()"
          class="bg-white dark:bg-gray-800 border rounded-lg p-4 shadow-sm"
        >
          <div class="flex justify-between items-start mb-3">
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-gray-50">
                {{ delivery.getNumber() }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ formatDateCustom(delivery.getDate()) }}
              </p>
            </div>
            <Bagde>
              {{ delivery.getStatusToFormat() }}
            </Bagde>
          </div>

          <div class="flex justify-between items-center">
            <div class="text-lg font-bold text-gray-900 dark:text-gray-50">
              {{ formatToDollars(delivery.getAmount()) }}
            </div>
            <div class="flex gap-2">
              <EyeButton :route="AppRoutesDelivery.details(delivery.getId())" />
              <DownloadButton @click="handleDownload(delivery.getId())" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <EmptyData v-else class="min-h-80" />
  </Card>
</template>

<script setup lang="ts">
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableContent,
  TableBody,
  Bagde,
  EyeButton,
  DownloadButton,
  EmptyData,
} from '@/components/';
import { formatToDollars, formatDateCustom, TransformBinaryToPdf } from '@/utils/';
import { Delivery, DeliveryStatus } from '@/views/deliveries/domain';
import { AppRoutesDelivery } from '@views/deliveries';
import { apiClient } from '@/services/';

defineProps<{
  deliveries: Delivery[];
}>();

const handleDownload = async (id: string) => {
  const response = await apiClient.get(
    `${AppRoutesDelivery.details(id)}/download?ts=${Date.now()}`,
    {
      responseType: 'blob',
    }
  );
  TransformBinaryToPdf(response.data, 'Delivery', id);
};
</script>
