import { ref } from 'vue';

export function useModal() {
  const isOpen = ref(false);
  const selectedId = ref<string>('');

  const open = (id: string) => {
    isOpen.value = true;
    selectedId.value = id;
  };

  const close = () => {
    isOpen.value = false;
    selectedId.value = '';
  };

  return {
    isOpen,
    selectedId,
    open,
    close,
  };
}
