<template>
  <Field
    v-if="name"
    :name="name"
    :validateOnInput="true"
    v-slot="{ value, meta, errorMessage, handleChange }"
  >
    <div class="form-group">
      <Label :for="id">
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
        <select
          :id="id"
          :value="value"
          @change="handleChange"
          class="w-full px-3 py-2 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-black"
        >
          <option v-if="placeholder" value="" disabled hidden>
            {{ placeholder }}
          </option>
          <slot></slot>
          <option v-for="(item, index) in items" :key="index" :value="item.value">
            {{ item.label }}
          </option>
        </select>
      </Label>
      <span class="text-sm text-red-600 block min-h-[1.5rem]">
        {{ errorMessage || ' ' }}
      </span>
    </div>
  </Field>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Field } from 'vee-validate';
import { Label } from '@/components';
import { SelectOption } from '@/models';

defineProps<{
  id?: string;
  label: string;
  name?: string;
  items: SelectOption[];
  required?: boolean;
  placeholder?: string;
}>();
</script>
