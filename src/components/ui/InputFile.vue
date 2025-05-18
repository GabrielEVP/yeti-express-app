<template>
   <div class="w-full max-w-md mx-auto">
      <div class="flex flex-col gap-2">
         <Label for="file-upload"> Seleccionar archivo </Label>
         <div class="flex items-center gap-3">
            <button
               type="button"
               @click="triggerFileInput"
               class="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
               <UploadIcon class="h-4 w-4" />
               Examinar
            </button>
            <div class="text-sm text-gray-600 truncate">
               {{ fileName || "Ningún archivo seleccionado" }}
            </div>
         </div>
         <input ref="fileInputRef" id="file-upload" type="file" class="sr-only" @change="handleFileChange" aria-label="Seleccionar archivo" />
         <p class="text-xs text-gray-500 mt-1">{{ acceptFormat }}</p>
      </div>
   </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { UploadIcon } from "lucide-vue-next";
import { Label } from "@/components/";

defineProps<{
   acceptFormat: string;
}>();

const fileName = ref<string | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);

const handleFileChange = (event: Event) => {
   const input = event.target as HTMLInputElement;
   const file = input.files?.[0];

   if (file) {
      fileName.value = file.name;
   }
};

const triggerFileInput = () => {
   fileInputRef.value?.click();
};
</script>
