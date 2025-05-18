import { computed } from "vue";
import { useAuthStore } from "@/stores";

export function useUserId() {
   const authStore = useAuthStore();
   const userId = computed(() => authStore.user?.id ?? "");

   return { userId };
}
