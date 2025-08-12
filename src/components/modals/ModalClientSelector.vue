<template>
  <Modal :isOpen="isOpen" @close="$emit('close')" @confirm="sendSelection">
    <template #header>{{ title }}</template>
    <section class="grid grid-cols-1 gap-6">
      <div class="w-full">
        <SelectFilter :label="selectLabel" name="clientId" id="clientId" :items="selectOptions" v-model="selectedClientId" />
      </div>
    </section>
  </Modal>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, ref, watch } from 'vue';
import { Modal, SelectFilter } from '@/components/';

interface SelectOption {
  label: string;
  value: string;
}

const props = defineProps<{
  isOpen: boolean;
  title: string;
  selectedId: string | null;
  selectOptions: SelectOption[];
  selectLabel?: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'submit-selection', selectedId: string): void;
}>();

const selectedClientId = ref(props.selectedId || '');

const selectLabel = computed(() => props.selectLabel || 'Seleccionar Cliente');

watch(
  () => props.selectedId,
  (value) => {
    selectedClientId.value = value || '';
  }
);

function sendSelection() {
  if (selectedClientId.value) {
    emit('submit-selection', selectedClientId.value);
    emit('close');
  }
}
</script>
