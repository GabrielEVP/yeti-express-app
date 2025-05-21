<template>
   <slot name="modal" />
   <div class="relative w-full h-full" ref="dropdownRef">
      <Label for="client">Cliente</Label>
      <div class="relative">
         <div class="flex w-full items-start space-x-4">
            <div class="flex flex-grow space-x-4">
               <div ref="clientTarget" class="relative w-full">
                  <Field name="clientId" :validateOnInput="true" v-slot="{ field }">
                     <div class="form-group">
                        <Input placeholder="cliente" :value="clientSearch" @input="onClientSearch" @blur="field.onBlur" @focus="isClientOpen = true" />
                        <button type="button" class="absolute right-2 top-1/2 transform -translate-y-1/2" @click="toggleClient">
                           <ChevronDown class="w-5 h-5" />
                        </button>
                     </div>
                  </Field>
                  <div v-if="isClientOpen" class="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md">
                     <slot name="list"></slot>
                  </div>
               </div>
               <div ref="addressTarget" class="relative w-full">
                  <Field name="clientAddressId" :validateOnInput="true" v-slot="{ field }">
                     <div class="form-group">
                        <Input placeholder="Dirección" :value="addressSearch" @input="onAddressSearch" @blur="field.onBlur" @focus="isAddressOpen = true" />
                        <button type="button" class="absolute right-2 top-1/2 transform -translate-y-1/2" @click="toggleAddress">
                           <ChevronDown class="w-5 h-5" />
                        </button>
                     </div>
                  </Field>
                  <div v-if="isAddressOpen" class="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md">
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
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Field } from "vee-validate";
import { onClickOutside } from "@vueuse/core";
import { ChevronDown } from "lucide-vue-next";
import { Input, Label, PlusButton } from "@/components/";

const emit = defineEmits<{
   (e: "openModal"): void;
}>();

const clientTarget = ref(null);
onClickOutside(clientTarget, () => (isClientOpen.value = false));

const addressTarget = ref(null);
onClickOutside(addressTarget, () => (isAddressOpen.value = false));

const isClientOpen = ref(false);

function toggleClient() {
   isClientOpen.value = !isClientOpen.value;
}

const isAddressOpen = ref(false);
function toggleAddress() {
   isAddressOpen.value = !isAddressOpen.value;
}

const clientSearch = ref("");

function onClientSearch(event: Event) {
   clientSearch.value = (event.target as HTMLInputElement).value;
}

const addressSearch = ref("");

function onAddressSearch(event: Event) {
   addressSearch.value = (event.target as HTMLInputElement).value;
}

defineExpose({
   closeDropdowns: () => {
      isClientOpen.value = false;
      isAddressOpen.value = false;
   },
   setClientSearch: (val: string) => (clientSearch.value = val),
   setAddressSearch: (val: string) => (addressSearch.value = val),
   getClientSearch: () => clientSearch.value,
   getAddressSearch: () => addressSearch.value,
});
</script>
