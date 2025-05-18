<template>
   <Field :name="name" :validateOnInput="true" v-slot="{ field, meta, errorMessage }">
      <div class="form-group">
         <Label :for="id"
            >{{ label }}
            <span v-if="required" class="text-red-500">*</span>
            <Input :id="id" v-bind="field" :type="type" @blur="field.onBlur" />
         </Label>
         <span v-if="meta.touched && errorMessage" class="text-sm text-red-600 block mt-1">
            {{ errorMessage }}
         </span>
      </div>
   </Field>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import { Field } from "vee-validate";
import { Label, Input } from "@/components";

const props = defineProps<{
   label: string;
   name: string;
   id?: string;
   type?: string;
   placeholder?: string;
   required?: boolean;
   modelValue?: string | number;
   min?: string;
   max?: string;
}>();

const emit = defineEmits<{
   (e: "update:modelValue", value: string): void;
}>();

const inputValue = computed({
   get: () => String(props.modelValue),
   set: (value) => emit("update:modelValue", value),
});
</script>
