<template>
  <div class="grid grid-cols-2 gap-4 mt-3 mb-4">
    <Button
      type="button"
      :class="{
        'bg-blue-600 border-blue-700 text-white dark:bg-blue-700 dark:border-blue-800 dark:text-white': selectedType === 'regular',
        'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-400 dark:text-blue-300': selectedType !== 'regular'
      }"
      @click="selectType('regular')"
      :disabled="isEditMode && !canChangeToRegular"
    >
      Cliente Regular
    </Button>
    <Button
      type="button"
      :class="{
        'bg-blue-600 border-blue-700 text-white dark:bg-blue-700 dark:border-blue-800 dark:text-white': selectedType === 'anonymous',
        'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900/30 dark:border-blue-400 dark:text-blue-300': selectedType !== 'anonymous'
      }"
      @click="selectType('anonymous')"
      :disabled="isEditMode && !canChangeToAnonymous"
    >
      Cliente Anónimo
    </Button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Button } from '@/components';

interface Props {
  modelValue: 'regular' | 'anonymous';
  isEditMode?: boolean;
  clientId?: string | null;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 'regular',
  isEditMode: false,
  clientId: null
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: 'regular' | 'anonymous'): void;
}>();

const selectedType = computed(() => props.modelValue);

const canChangeToRegular = computed(() => !props.clientId);
const canChangeToAnonymous = computed(() => props.clientId === null);

function selectType(type: 'regular' | 'anonymous') {
  if (props.isEditMode) {
    if (type === 'regular' && !canChangeToRegular.value) return;
    if (type === 'anonymous' && !canChangeToAnonymous.value) return;
  }

  emit('update:modelValue', type);
}
</script>
