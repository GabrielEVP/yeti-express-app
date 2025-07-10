<template>
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
        'bg-blue-600 border-blue-700 text-white dark:bg-blue-700 dark:border-blue-800 dark:text-white': selectedType === 'anonymous',
        'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-400 dark:text-blue-300': selectedType !== 'anonymous',
      }"
      @click="selectType('anonymous')"
      :disabled="is_edit_mode && !canChangeToAnonymous"
    >
      Cliente Anónimo
    </Button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Button } from '@components';

interface Props {
  modelValue: 'regular' | 'anonymous';
  is_edit_mode?: boolean;
  client_id?: string | null;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 'regular',
  is_edit_mode: false,
  client_id: null,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: 'regular' | 'anonymous'): void;
}>();

const selectedType = computed(() => props.modelValue);

const canChangeToRegular = computed(() => !props.client_id);
const canChangeToAnonymous = computed(() => props.client_id === null);

function selectType(type: 'regular' | 'anonymous') {
  if (props.is_edit_mode) {
    if (type === 'regular' && !canChangeToRegular.value) return;
    if (type === 'anonymous' && !canChangeToAnonymous.value) return;
  }

  emit('update:modelValue', type);
}
</script>
