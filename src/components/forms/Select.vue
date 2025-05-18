<template>
   <Field v-if="name" :name="name" :validateOnInput="true" v-slot="{ field, meta, errorMessage }">
      <div class="form-group">
         <Label :for="id">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
            <select
               :id="id"
               v-bind="field"
               class="w-full px-3 py-2 bg-white border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-black"
            >
               <slot></slot>
               <option v-for="(item, index) in items" :key="index" :value="item.value">
                  {{ item.label }}
               </option>
            </select>
         </Label>
         <span v-if="meta.touched && errorMessage" class="text-sm text-red-600 block mt-1">
            {{ errorMessage }}
         </span>
      </div>
   </Field>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { Field } from "vee-validate";
import { Label } from "@/components";
import { SelectOption } from "@/models";

defineProps<{
   label: string;
   name?: string;
   id?: string;
   required?: boolean;
   modelValue?: string | number;
   items: SelectOption[];
}>();
</script>
