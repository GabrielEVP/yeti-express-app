<template>
  <Field v-if="props.name" :name="props.name" :validateOnInput="true" v-slot="{ field }">
    <input :id="id" v-bind="field" type="hidden" :value="props.value" @blur="field.onBlur" />
  </Field>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Field } from 'vee-validate';

const props = defineProps<{
  name: string;
  id: string;
  value?: string | number;
}>();
</script>
