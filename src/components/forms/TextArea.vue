<template>
  <Field
    v-if="props.name"
    :name="props.name"
    :validateOnInput="true"
    v-slot="{ field, meta, errorMessage }"
  >
    <div class="form-group">
      <Label :for="id">
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
        <textarea
          :id="id"
          v-bind="field"
          :rows="4"
          :placeholder="placeholder"
          class="w-full px-3 py-2 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-black"
        />
      </Label>
      <span
        class="text-sm block min-h-[1.5rem]"
        :class="meta.touched && errorMessage ? 'text-red-600' : 'invisible'"
      >
        {{ errorMessage || ' ' }}
      </span>
    </div>
  </Field>

  <div v-else class="form-group">
    <Label :for="id">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
      <textarea
        :id="id"
        v-model="inputValue"
        :rows="12"
        :placeholder="placeholder"
        class="w-full px-3 py-2 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-black"
      />
    </Label>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';
import { Field } from 'vee-validate';
import { Label } from '@/components';

const props = defineProps<{
  id: string;
  label: string;
  name?: string;
  modelValue?: string | null;
  placeholder?: string;
  required?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const inputValue = computed({
  get: () => props.modelValue ?? '',
  set: (value) => emit('update:modelValue', value),
});
</script>
