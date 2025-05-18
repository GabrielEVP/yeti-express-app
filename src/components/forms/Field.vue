<template>
   <Field v-if="props.name" :name="props.name" :validateOnInput="true" v-slot="{ field, meta, errorMessage }">
      <div class="form-group">
         <Label :for="id">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
            <Input :id="id" v-bind="field" :type="type" @blur="field.onBlur" />
         </Label>
         <span class="text-sm block min-h-[1.5rem]" :class="meta.touched && errorMessage ? 'text-red-600' : 'invisible'">
            {{ errorMessage || " " }}
         </span>
      </div>
   </Field>
   <div v-else class="form-group">
      <Label :for="id">
         {{ label }}
         <span v-if="required" class="text-red-500">*</span>
         <Input :id="id" v-model="inputValue" :type="type" />
      </Label>
   </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import { Field } from "vee-validate";
import { Label, Input } from "@/components";

const props = defineProps<{
   label: string;
   name?: string;
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
   get: () => String(props.modelValue ?? ""),
   set: (value) => emit("update:modelValue", value),
});
</script>
