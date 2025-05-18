import { useAlert } from "@/composables/useAlert";

interface UseDeleteWithFeedbackOptions<TID> {
   deleteFn: (id: TID) => Promise<any>;
   onSuccessMessage: string;
   onErrorMessage?: string;
}

export function useDeleteWithFeedback<TID>({ deleteFn, onSuccessMessage, onErrorMessage = "Error al eliminar elemento" }: UseDeleteWithFeedbackOptions<TID>) {
   const { triggerError, triggerSuccess } = useAlert();

   const deleteAndNotify = async (id: TID, onAfterDelete?: () => Promise<void> | void) => {
      try {
         await deleteFn(id);
         if (onAfterDelete) await onAfterDelete();
         triggerSuccess(onSuccessMessage);
      } catch (error) {
         triggerError(onErrorMessage);
      }
   };

   return {
      deleteAndNotify,
   };
}
