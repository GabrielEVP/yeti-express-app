<template>
  <PaymentModal
    :isOpen="isModalOpen"
    :debtId="selectedDeliveryId"
    @close="closeModal"
    @paymentAdded="onPaymentAdded"
  />
  <div v-if="client" class="flex gap-1 justify-center z-10">
    <div class="relative">
      <DropdownButton @click.stop="toggleDropdown()">
        Ultimas Orden
        <Bagde :color="client.getDeliveries().length > 0 ? 'danger' : 'success'">
          {{ client.getDeliveries().length }}
        </Bagde>
      </DropdownButton>
      <div
        v-if="activeDropdown"
        class="z-10 fixed right-16 mt-2 w-72 md:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-auto max-h-[80vh] transition-opacity duration-200 ease-in-out"
        @click.stop
      >
        <div class="p-4 space-y-4">
          <div class="flex justify-between items-center">
            <Text>Deliveries pendientes</Text>
          </div>
          <div class="space-y-3 max-h-80 overflow-y-auto">
            <div
              v-for="delivery in client.getDeliveries()"
              :key="delivery.getId()"
              class="border border-gray-200 dark:border-gray-600 rounded-lg p-3"
            >
              <div class="flex justify-between items-start mb-2">
                <div>
                  <div class="font-medium text-gray-900 dark:text-gray-100">
                    {{ delivery.getNumber() }}
                  </div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">
                    {{ formatDateCustom(delivery.getDate()) }}
                  </div>
                </div>
                <div class="font-semibold text-gray-900 dark:text-gray-100">
                  <Bagde>
                    {{ delivery.getService().getAmount() }}
                  </Bagde>
                </div>
              </div>
              <div class="flex gap-2 mt-2">
                <PaidButton @click="handlePaidDelivery(delivery)">Pagar delivery</PaidButton>
              </div>
            </div>
          </div>
          <div
            class="border-t border-gray-200 dark:border-gray-600 pt-3 flex justify-between gap-4"
          >
            <PaidButton @click="handlePaidDeliveries()">Pagar todos</PaidButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { formatDateCustom } from '@utils';
import { Client } from '@/views/clients/domain';
import { Delivery } from '@/views/deliveries/domain';
import { PaidButton, DropdownButton } from '@/components';
import { Text, Bagde } from '@/components';
import { PaymentModal } from '@/views/debts-payments/presentation';

const props = defineProps<{
  client: Client;
}>();

const activeDropdown = ref<boolean>(false);
const selectedDelivery = ref<Delivery>();
const isModalOpen = ref<boolean>(false);
const selectedDeliveryId = ref<string>('');

const toggleDropdown = () => {
  activeDropdown.value = !activeDropdown.value;
};

const handlePaidDelivery = (delivery: Delivery) => {
  selectedDelivery.value = delivery;
  selectedDeliveryId.value = delivery.getId();
  isModalOpen.value = true;
};

const handlePaidDeliveries = () => {
  const allDeliveryIds = props.client
    ?.getDeliveries()
    .map((delivery) => delivery.getId())
    .join(',');
  selectedDeliveryId.value = allDeliveryIds;
  isModalOpen.value = true;
};

const onPaymentAdded = (payment: any) => {
  console.log('Pago procesado:', payment);
  selectedDelivery.value = undefined;
  activeDropdown.value = false;
};

const closeModal = () => {
  selectedDelivery.value = undefined;
  isModalOpen.value = false;
};
</script>
