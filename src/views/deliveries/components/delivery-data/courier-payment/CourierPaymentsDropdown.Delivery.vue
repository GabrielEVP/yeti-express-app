<template>
   <Dropdown>
      <template #header>
         <CreditCard class="h-5 w-5" />
         <span class="font-medium">Pagos al Repartidor ({{ payments.length }}) </span>
      </template>
      <template #data>
         <div v-if="payments.length > 0" class="space-y-3">
            <div v-for="payment in payments" :key="payment.id" class="border rounded-md p-3 bg-muted/30 dark:border-gray-700 dark:bg-gray-700">
               <div class="flex justify-between items-start">
                  <div class="space-y-1 text-sm">
                     <p class="font-medium">Fecha: {{ formatDateShort(payment.date) }}</p>
                     <p>
                        Método:
                        <span class="font-semibold">{{ formatPaymentMethod(payment.method) }}</span>
                     </p>
                     <p>Monto: {{ formatCurrency(payment.amount, "es-ES", "USD") }}</p>
                  </div>
               </div>
            </div>
         </div>
         <EmptyData v-else class="mt-10" />
      </template>
   </Dropdown>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { CreditCard } from "lucide-vue-next";
import { Dropdown, EmptyData } from "@/components/";
import { formatDateShort, formatCurrency, formatValue } from "@/utils";
import type { DeliveryCourierPayment } from "@/views/deliveries";

const PAYMENT_METHOD_MAP = {
   cash: "Efectivo",
   "mobile payment": "Pago Móvil",
   bank_transfer: "Transferencia Bancaria",
   other: "Otro",
};

defineProps<{
   payments: DeliveryCourierPayment[];
}>();

const formatPaymentMethod = (method: string) => {
   return formatValue(method, PAYMENT_METHOD_MAP, "Método desconocido");
};
</script>
