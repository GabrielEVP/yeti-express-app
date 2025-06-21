<template>
  <Modal :isOpen="isOpen" @close="$emit('close')" @confirm="sendFilter">
    <template #header>{{ title }}</template>
    <section class="grid grid-cols-1 gap-6">
      <div class="w-full">
        <SelectFilter :label="selectLabel" name="itemId" id="itemId" :items="selectOptions" v-model="selectedItemId" />
      </div>
      <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <FieldFormModel type="date" label="Fecha de inicio" v-model="localOpenDate" id="openDate" />
        <FieldFormModel type="date" label="Fecha de salida" v-model="localCloseDate" id="closeDate" />
      </section>
    </section>
  </Modal>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, ref, watch } from 'vue';
import { FieldFormModel, Modal, SelectFilter } from '@/components/';

interface SelectOption {
  label: string;
  value: string;
}

const props = defineProps<{
  isOpen: boolean;
  title: string;
  openDate: string;
  closeDate: string;
  selectedId: string | null;
  selectOptions: SelectOption[];
  selectLabel?: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'submit-filter', selectedId: string, openDate: string, closeDate: string): void;
}>();

const localOpenDate = ref(props.openDate);
const localCloseDate = ref(props.closeDate);
const selectedItemId = ref(props.selectedId || '');

const selectLabel = computed(() => props.selectLabel || 'Seleccionar');

watch(
  () => props.openDate,
  (value) => {
    localOpenDate.value = value;
  }
);

watch(
  () => props.closeDate,
  (value) => {
    localCloseDate.value = value;
  }
);

watch(
  () => props.selectedId,
  (value) => {
    selectedItemId.value = value || '';
  }
);

function sendFilter() {
  emit('submit-filter', selectedItemId.value, localOpenDate.value, localCloseDate.value);
  emit('close');
}
</script>
