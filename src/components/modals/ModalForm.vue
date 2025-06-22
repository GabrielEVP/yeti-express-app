<template>
   <Modal :isOpen="isOpen" @close="$emit('close')" @confirm="$emit('onSubmit')">
     <template #header>{{ title }}</template>
     <form @submit.prevent="$emit('onSubmit')" class="space-y-4">
         <slot></slot>
      </form>
   </Modal>
</template>

<script setup lang="ts">
import Modal from "@components/ui/modals/Modal.vue";

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
