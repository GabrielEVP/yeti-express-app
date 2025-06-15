<template>
  <div class="form-group">
    <Label :for="id">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </Label>
    <select
      :id="id"
      :value="modelValue"
      @change="handleChange"
      :disabled="disabled"
      :class="[
        'w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2',
        disabled
          ? 'bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-white border-black dark:bg-gray-700 dark:border-gray-600 dark:text-white text-black',
      ]"
    >
      <option v-if="placeholder" value="" disabled hidden>
        {{ placeholder }}
      </option>
      <slot></slot>
      <option v-for="(item, index) in items" :key="index" :value="item.value">
        {{ item.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { Label } from '@/components';

interface SelectOption {
  label: string;
  value: string;
}

defineProps<{
  id?: string;
  label: string;
  items: SelectOption[];
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  modelValue?: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  emit('update:modelValue', target.value);
}
</script>
