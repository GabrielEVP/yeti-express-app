<template>
  <Modal :isOpen="isOpen" @close="$emit('close')" @confirm="sendFilter">
    <template #header>{{ title }}</template>
    <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <FieldFormModel type="date" label="Fecha de inicio" v-model="localOpenDate" id="openDate" />
      <FieldFormModel type="date" label="Fecha de salida" v-model="localCloseDate" id="closeDate" />
    </section>
  </Modal>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';
import { Modal, FieldFormModel } from '@/components/';

const props = defineProps<{
  isOpen: boolean;
  title: string;
  openDate: string;
  closeDate: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'submit-filter', openDate: string, closeDate: string): void;
}>();

const localOpenDate = ref(props.openDate);
const localCloseDate = ref(props.closeDate);

watch(() => props.openDate, (value) => {
  localOpenDate.value = value;
});

watch(() => props.closeDate, (value) => {
  localCloseDate.value = value;
});

function sendFilter() {
  emit('submit-filter', localOpenDate.value, localCloseDate.value);
  emit('close');
}
</script>
