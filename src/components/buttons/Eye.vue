<template>
   <Button class="bg-gray-600 hover:bg-gray-700 text-white transition-colors" title="Ver" @click="navigateToModule">
      <Eye class="h-4 w-4" />
   </Button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import { Eye } from "lucide-vue-next";
import Button from "@components/ui/Button.vue";

const router = useRouter();

const props = defineProps<{
   id: string;
   route: string;
}>();

const emit = defineEmits<{
   (e: "click"): void;
}>();

const navigateToModule = () => {
   emit("click");
   router.push(`${props.route}/${props.id}`);
};
</script>
