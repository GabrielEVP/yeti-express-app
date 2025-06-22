<template>
  <Modal :isOpen="isOpen" @close="$emit('close')" @confirm="sendConfirm">
    <template #header>Confirmar Accion</template>
    <span class="text-black dark:text-white">{{ message }}</span>
  </Modal>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { Card, Text, CancelButton, DeleteButton, FieldFormModel, Modal } from '@components';

const props = defineProps<{
  isOpen: boolean;
  message: string;
}>();

const emit = defineEmits<{
  (e: "confirm"): void;
  (e: "close"): void;
}>();

function sendConfirm() {
  emit('confirm');
  emit('close');
}
</script>
