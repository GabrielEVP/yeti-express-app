<template>
  <div>
    <div class="grid grid-cols-2 gap-4 mt-3 mb-4">
      <Button
        type="button"
        :class="{
          'bg-blue-600 border-blue-700 text-white dark:bg-blue-700 dark:border-blue-800 dark:text-white': selectedType === 'regular',
          'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-400 dark:text-blue-300': selectedType !== 'regular',
        }"
        @click="selectType('regular')"
        :disabled="is_edit_mode && !canChangeToRegular"
      >
        Cliente Regular
      </Button>
      <Button
        type="button"
        :class="{
          'bg-yellow-500 border-yellow-600 text-white dark:bg-yellow-600 dark:border-yellow-700 dark:text-white': selectedType === 'anonymous',
          'bg-yellow-50 border-yellow-400 text-yellow-700 dark:bg-yellow-900/30 dark:border-yellow-400 dark:text-yellow-300':
            selectedType !== 'anonymous',
        }"
        @click="selectType('anonymous')"
        :disabled="is_edit_mode && !canChangeToAnonymous"
      >
        Cliente Anónimo
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { Button } from '@components';

interface Props {
  modelValue: 'regular' | 'anonymous';
  is_edit_mode?: boolean;
  client_id?: string | number | null;
  client_source?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 'regular',
  is_edit_mode: false,
  client_id: null,
  client_source: '',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: 'regular' | 'anonymous'): void;
}>();

const selectedType = computed(() => props.modelValue);

const canChangeToRegular = computed(() => {
  if (props.is_edit_mode && props.client_source === 'anonymous') {
    return false;
  }
  return !props.client_id;
});
const canChangeToAnonymous = computed(() => props.client_id === null);

const hasClient = computed(() => {
  return props.client_id !== null && props.client_id !== undefined && props.client_id !== '';
});

function selectType(type: 'regular' | 'anonymous') {
  if (props.is_edit_mode && props.client_source === 'anonymous') {
    console.warn('No se puede cambiar el tipo de cliente en una entrega con cliente anónimo existente');
    return;
  }

  if (type === 'regular' && props.is_edit_mode) {
    return;
  }

  if (type === 'anonymous' && props.is_edit_mode) {
    return;
  }

  emit('update:modelValue', type);
}

onMounted(() => {
  if (props.is_edit_mode) {
    if (hasClient.value && props.modelValue !== 'regular') {
      emit('update:modelValue', 'regular');
    } else if (!hasClient.value && props.modelValue !== 'anonymous') {
      emit('update:modelValue', 'anonymous');
    }
  }
});

watch(
  () => props.client_id,
  (newClientId) => {
    if (props.is_edit_mode) {
      const newHasClient = newClientId !== null && newClientId !== undefined && newClientId !== '';
      if (newHasClient && props.modelValue !== 'regular') {
        emit('update:modelValue', 'regular');
      } else if (!newHasClient && props.modelValue !== 'anonymous') {
        emit('update:modelValue', 'anonymous');
      }
    }
  }
);
</script>
