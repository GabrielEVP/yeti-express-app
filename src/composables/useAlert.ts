import { computed } from "vue";
import { useAlertStore } from "@/stores/";

export function useAlert() {
   const alertStore = useAlertStore();

   return {
      showSuccess: computed(() => alertStore.show && alertStore.type === "success"),
      showError: computed(() => alertStore.show && alertStore.type === "error"),
      alertMessage: computed(() => alertStore.message),
      triggerSuccess: alertStore.triggerSuccess,
      triggerError: alertStore.triggerError,
   };
}
