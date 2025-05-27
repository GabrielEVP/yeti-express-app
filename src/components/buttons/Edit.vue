<template>
  <Button
    class="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
    title="Editar"
    @click="handleClick"
  >
    <Pencil class="h-4 w-4" />
  </Button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { Pencil } from 'lucide-vue-next';
import { Button } from '@components';

const router = useRouter();

const props = defineProps<{
  route?: string;
}>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const handleClick = () => {
  emit('click');
  if (props.route) {
    router.push(`${props.route}`);
  }
};
</script>
