import { ref } from 'vue';

export function useModal<T = string>() {
  const isOpen = ref(false);
  const selectedId = ref<T | null>(null);

  const open = (id: T) => {
    isOpen.value = true;
    selectedId.value = id;
  };

  const close = () => {
    isOpen.value = false;
    selectedId.value = null;
  };

  return {
    isOpen,
    selectedId,
    open,
    close,
  };
}
