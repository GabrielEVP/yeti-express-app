<template>
  <div class="form-group">
    <Label :for="id">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
      <Input
        :id="id"
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :min="min"
        :max="max"
      />
    </Label>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import { Label, Input } from '@/components';

const props = defineProps<{
  label: string;
  id?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  modelValue: string | number;
  min?: string;
  max?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const inputValue = computed({
  get: () => String(props.modelValue ?? ''),
  set: (value) => emit('update:modelValue', value),
});
</script>
