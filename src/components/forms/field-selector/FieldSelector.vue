<template>
   <div class="relative w-full">
      <Field v-if="props.name" :name="props.name" :validateOnInput="true" v-slot="{ field }">
         <div class="form-group">
            <Label :for="id">
               {{ label }}
               <Input :id="id" type="text" :value="props.displayValue" @focus="toggleClient" @blur="field.onBlur" />
               <button type="button" class="absolute right-2 bottom-1 transform -translate-y-1/2" @click="toggleClient">
                  <ChevronDown class="w-5 h-5 dark:text-white" />
               </button>
            </Label>
         </div>
         <div v-if="props.isOpen" class="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 shadow-lg rounded-md">
            <slot></slot>
         </div>
      </Field>
   </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { Field } from "vee-validate";
import { ChevronDown } from "lucide-vue-next";
import { Label, Input } from "@/components";

const props = defineProps<{
   label: string;
   name: string;
   id: string;
   isOpen: boolean;
   displayValue: string;
   placeholder?: string;
}>();

const emit = defineEmits<{
   (e: "toggle", name: string): void;
}>();

function toggleClient() {
   emit("toggle", props.name);
}
</script>
