<template>
  <Field v-if="props.name" :name="props.name" :validateOnInput="true" v-slot="{ field }">
    <label class="inline-flex items-center gap-2 cursor-pointer">
      <input
        :id="id"
        v-bind="field"
        type="radio"
        @blur="field.onBlur"
        class="bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-black"
      />
      <span class="text-gray-900 dark:text-gray-100">
        <slot />
      </span>
    </label>
  </Field>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Field } from 'vee-validate';

const props = defineProps<{
  name: string;
  id: string;
}>();
</script>
