<template>
  <Button
    type="button"
    @click="handleClick"
    :class="active
      ? 'bg-green-600 hover:bg-green-700 text-white transition-colors'
      : 'bg-gray-400 hover:bg-gray-500 text-white transition-colors'"
    :title="active ? 'Desactivar repartidor' : 'Activar repartidor'"
  >
    <ToggleRight v-if="active" class="h-4 w-4" />
    <ToggleLeft v-else class="h-4 w-4" />
  </Button>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';
import { ToggleLeft, ToggleRight } from 'lucide-vue-next';
import Button from '@components/ui/Button.vue';

const props = defineProps<{
  active: boolean;
}>();

const emit = defineEmits<{
  (e: 'click'): void;
}>();

const handleClick = () => {
  emit('click');
};
</script>
