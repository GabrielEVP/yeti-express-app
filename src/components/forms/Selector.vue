<template>
   <div class="relative w-full h-full" ref="dropdownRef">
      <Label>{{ label }}</Label>
      <div class="relative">
         <div class="flex w-full">
            <div class="relative flex-grow mr-2">
               <Input :placeholder="placeholderSearch" @focus="isOpen = true" :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)" />
               <button type="button" class="absolute right-2 top-1/2 transform -translate-y-1/2 hover:text-gray-600 dark:hover:text-gray-300 dark:text-white" @click="isOpen = !isOpen">
                  <ChevronDown class="w-5 h-5" />
               </button>
            </div>
            <PlusButton @click="emit('openModal')" />
         </div>
      </div>
      <div v-if="isOpen" class="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg dark:bg-gray-800">
         <slot name="list"></slot>
      </div>
   </div>
   <slot name="modal" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { Search, ChevronDown } from "lucide-vue-next";
import { Input, Label, PlusButton } from "@/components/";

const props = defineProps<{
   label: string;
   modelValue: string;
}>();

const placeholderSearch = `buscar ${props.label}`;

const emit = defineEmits<{
   (e: "openModal"): void;
   (e: "update:modelValue", value: string): void;
}>();

const updateModelValue = (event: Event) => {
   const target = event.target as HTMLInputElement;
   emit("update:modelValue", target.value);
};

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
   if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
      isOpen.value = false;
   }
};

onMounted(() => {
   document.addEventListener("mousedown", handleClickOutside);
});

onUnmounted(() => {
   document.removeEventListener("mousedown", handleClickOutside);
});

const closeDropdown = () => {
   isOpen.value = false;
};

defineExpose({
   closeDropdown,
});
</script>
