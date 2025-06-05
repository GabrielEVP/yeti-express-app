<template>
  <div v-if="client" class="flex gap-1 justify-center">
    <div class="relative">
      <Buttondropdown @click.stop="toggleDropdown()">
        Deliveries
        <Bagde>
          {{ client.getDeliveries().length }}
        </Bagde>
      </Buttondropdown>
      <div
        v-if="activeDropdown"
        class="fixed right-16 mt-2 w-72 md:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-auto max-h-[80vh] transition-opacity duration-200 ease-in-out"
        @click.stop
      >
        <div class="p-4 space-y-4">
          <div class="flex justify-between items-center">
            <Text>Deliveries pendientes</Text>
            <Bagde> Total: ${{ client.getId() }} </Bagde>
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
                    {{ delivery.getDate() }}
                  </div>
                </div>
                <div class="font-semibold text-gray-900 dark:text-gray-100">
                  {{ delivery.getService().getAmount() }}
                </div>
              </div>
              <div class="flex gap-2 mt-2">
                <ButtonPaid @click="handlePaidDelivery(delivery)">Pagar delivery</ButtonPaid>
                <Buttonpartial @click="handlePartialPaidDelivery(delivery)">
                  Pagar parcial
                </Buttonpartial>
              </div>
            </div>
          </div>
          <div
            class="border-t border-gray-200 dark:border-gray-600 pt-3 flex justify-between gap-4"
          >
            <ButtonPaid @click="handlePaidDeliveries()">Pagar todos</ButtonPaid>
            <Buttonpartial @click="handlePartialPaidDeliveries()">Pago parcial</Buttonpartial>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Client } from '@/views/clients/domain';
import { Delivery } from '@/views/deliveries/domain';
import Buttondropdown from './Buttondropdown.vue';
import { Text, Bagde } from '@/components';
import ButtonPaid from './ButtonPaid.vue';
import Buttonpartial from './buttonpartial.vue';

const props = defineProps<{
  client?: Client;
}>();

const activeDropdown = ref<boolean>(false);
const selectedDelivery = ref<Delivery>();

const toggleDropdown = () => {
  activeDropdown.value = true;
};

const handlePaidDelivery = (delivery: Delivery) => {
  selectedDelivery.value = delivery;
  activeDropdown.value = false;
};

const handlePartialPaidDelivery = (delivery: Delivery) => {
  selectedDelivery.value = delivery;
  activeDropdown.value = false;
};

const handlePaidDeliveries = () => {
  props.client?.getDeliveries();
  activeDropdown.value = false;
};

const handlePartialPaidDeliveries = () => {
  props.client?.getDeliveries();
  activeDropdown.value = false;
};

const processPayment = (paymentData: any) => {
  console.log('Procesando pago:', paymentData);
  closeModal();
};

const closeModal = () => {
  selectedDelivery.value = undefined;
  activeDropdown.value = false;
};
</script>
