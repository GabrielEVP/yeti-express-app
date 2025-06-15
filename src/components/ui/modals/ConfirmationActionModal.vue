<template>
  <Transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition ease-in duration-150"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <Card class="w-full max-w-sm lg:max-w-lg p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Confirmar acción</h2>
        <Text>
          {{ message }}
        </Text>
        <div class="flex justify-end space-x-4 mt-5">
          <CancelButton @click="onCancel" />
          <Confirmation @click="onConfirm" />
        </div>
      </Card>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { Card, Text, CancelButton } from '@/components/';
import Confirmation from '@components/buttons/Confirmation.vue';
const props = defineProps<{
  isOpen: boolean;
  message: string;
}>();

const emit = defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();

const onCancel = () => {
  emit('cancel');
};

const onConfirm = async () => {
  emit('confirm');
  emit('cancel');
};
</script>
