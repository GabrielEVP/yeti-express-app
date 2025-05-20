<template>
   <div class="relative w-full h-full" ref="dropdownRef">
      <Label for>Cliente</Label>
      <div class="relative">
         <div class="flex w-full items-start space-x-4">
            <div class="flex flex-grow space-x-4">
               <div ref="clientTarget" class="relative w-full">
                  <Input placeholder="Cliente" @focus="isClientOpen = true" :model-value="client" @update:model-value="emit('update:client', $event)" />
                  <button type="button" class="absolute right-2 top-1/2 transform -translate-y-1/2 hover:text-gray-600 dark:hover:text-gray-300 dark:text-white" @click="toggleClient">
                     <ChevronDown class="w-5 h-5" />
                  </button>
                  <div v-if="isClientOpen" class="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg dark:bg-gray-800">
                     <slot name="list"></slot>
                  </div>
               </div>
               <div ref="addressTarget" class="relative w-full">
                  <Input placeholder="Dirección" @focus="isAddressOpen = true" :model-value="address" @update:model-value="emit('update:address', $event)" />
                  <button type="button" class="absolute right-2 top-1/2 transform -translate-y-1/2 hover:text-gray-600 dark:hover:text-gray-300 dark:text-white" @click="toggleAddress">
                     <ChevronDown class="w-5 h-5" />
                  </button>
                  <div v-if="isAddressOpen" class="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg dark:bg-gray-800">
                     <slot name="direccion"></slot>
                  </div>
               </div>
            </div>
            <div class="flex-shrink-0 self-stretch">
               <PlusButton @click="emit('openModal')" />
            </div>
         </div>
      </div>
   </div>
   <slot name="modal" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import { ChevronDown } from "lucide-vue-next";
import { Input, Label, PlusButton } from "@/components/";

defineProps<{
   client: string;
   address: string;
}>();

const emit = defineEmits<{
   (e: "openModal"): void;
   (e: "update:client", value: string): void;
   (e: "update:address", value: string): void;
}>();

const isClientOpen = ref(false);
const isAddressOpen = ref(false);

const clientTarget = ref<HTMLElement | null>(null);
const addressTarget = ref<HTMLElement | null>(null);

onClickOutside(clientTarget, () => (isClientOpen.value = false));
onClickOutside(addressTarget, () => (isAddressOpen.value = false));

const toggleClient = () => (isClientOpen.value = !isClientOpen.value);
const toggleAddress = () => (isAddressOpen.value = !isAddressOpen.value);

defineExpose({
   closeDropdowns: () => {
      isClientOpen.value = false;
      isAddressOpen.value = false;
   },
});
</script>
