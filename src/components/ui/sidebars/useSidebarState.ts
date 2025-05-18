import { ref } from "vue";

export function useSidebarState() {
  const isOpen = ref(true);

  function toggleSidebar() {
    isOpen.value = !isOpen.value;
  }

  return { isOpen, toggleSidebar };
}
