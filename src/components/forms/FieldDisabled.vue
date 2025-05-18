<template>
   <Label :for="id">
      {{ label }}
      <InputDisabled :id="id" :placeholder="placeholder" v-model="inputValue" :type="props.type ?? 'text'" />
   </Label>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import { InputDisabled, Label } from "@/components/";

const props = defineProps<{
   id: string;
   label: string;
   modelValue?: string | Number;
   placeholder?: string;
   type?: string;
}>();

const emit = defineEmits<{
   (e: "update:modelValue", value: string): void;
}>();

const inputValue = computed({
   get: () => String(props.modelValue),
   set: (value) => emit("update:modelValue", value),
});
</script>
