<template>
   <Modal :isOpen="isOpen" @close="$emit('close')">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2 mb-4">
         {{ title }}
      </h2>
      <form @submit.prevent="$emit('onSubmit')" class="space-y-4">
         <slot></slot>
         <footer class="flex justify-end space-x-2">
            <CancelButton @click="$emit('close')" />
            <AcceptButton :disabled="!meta?.valid" />
         </footer>
      </form>
   </Modal>
</template>

<script setup lang="ts">
import Modal from "@components/ui/modals/Modal.vue";
import { CancelButton, AcceptButton } from "@/components/";

defineProps<{
   isOpen: boolean;
   title: string;
   meta?: { valid: boolean };
}>();

defineEmits<{
   (e: "close"): void;
   (e: "open"): void;
   (e: "onSubmit"): void;
}>();
</script>
