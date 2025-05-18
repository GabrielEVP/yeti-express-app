// src/stores/alertStore.ts
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export type AlertType = "success" | "error";

export interface AlertState {
   show: boolean;
   message: string;
   type: AlertType;
}

export const useAlertStore = defineStore("alert", () => {
   const show: Ref<boolean> = ref(false);
   const message: Ref<string> = ref("");
   const type: Ref<AlertType> = ref("success");
   let timeoutId: ReturnType<typeof setTimeout> | null = null;

   function triggerAlert(newType: AlertType, newMessage: string) {
      if (timeoutId) clearTimeout(timeoutId);

      type.value = newType;
      message.value = newMessage;
      show.value = true;

      timeoutId = setTimeout(() => {
         show.value = false;
         message.value = "";
         timeoutId = null;
      }, 3000);
   }

   function triggerSuccess(msg: string) {
      triggerAlert("success", msg);
   }

   function triggerError(msg: string) {
      triggerAlert("error", msg);
   }

   return {
      show,
      message,
      type,
      triggerSuccess,
      triggerError,
   };
});
