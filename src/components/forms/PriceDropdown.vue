<template>
   <Label>
      Precios de venta
      <div class="relative w-full">
         <div class="border rounded-md overflow-hidden border-black dark:border-gray-700">
            <button
               type="button"
               @click="toggleDropdown"
               class="w-full flex justify-between p-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700 text-left text-gray-900 dark:text-gray-100"
            >
               <span>Precios ({{ precios.length }})</span>
               <ChevronDown :class="{ 'rotate-180': isOpen }" class="h-4 w-4 transition-transform text-gray-500 dark:text-gray-400" />
            </button>
            <div v-if="isOpen" class="absolute z-50 left-0 mt-1 w-full max-h-64 overflow-y-auto p-4 space-y-4 bg-white dark:bg-gray-800 border border-black dark:border-gray-700 rounded-md shadow-lg">
               <div v-for="(precio, idx) in precios" :key="precio.id" class="space-y-1">
                  <FieldForm type="number" :label="precio.name" :name="`precios[${idx}].valor`" v-model="precio.margin" />
               </div>
            </div>
         </div>
      </div>
   </Label>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ChevronDown } from "lucide-vue-next";
import { TypePrice } from "@/views/type-prices/";
import { Label, FieldForm } from "@/components/";

const precios = ref<TypePrice[]>([
   {
      id: "1",
      name: "Precio estándar",
      type: "fixed",
      margin: 100,
      userId: "1",
   },
   {
      id: "2",
      name: "Precio mayorista",
      type: "percentage",
      margin: 20,
      userId: "1",
   },
   {
      id: "3",
      name: "Precio promocional",
      type: "fixed",
      margin: 90,
      userId: "1",
   },
]);

const isOpen = ref(false);

const toggleDropdown = () => {
   isOpen.value = !isOpen.value;
};
</script>
