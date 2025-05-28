<template>
  <Card>
    <div class="max-h-96 overflow-y-auto" v-if="deliveries.length > 0">
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
              {{ delivery.getService().getTotalEarning() }}
            </TableContent>
            <TableContent class="text-center">
              <Bagde>
                {{ delivery.getStatus() }}
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
import { formatDateCustom, TransformBinaryToPdf } from '@/utils/';
import { Delivery } from '@/views/deliveries/domain';
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
