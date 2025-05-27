import { useModal } from '@/composables/modal/useModal';
import { useDeleteWithFeedback } from '@/composables/modal/useDeleteModal';

interface UseDeleteWithModalOptions<TID> {
  deleteFn: (id: TID) => Promise<any>;
  successMessage: string;
  errorMessage?: string;
  onAfterDelete?: () => Promise<void> | void;
}

export function useDeleteWithModal<TID = string>({
  deleteFn,
  successMessage,
  errorMessage,
  onAfterDelete,
}: UseDeleteWithModalOptions<TID>) {
  const modal = useModal();

  const { deleteAndNotify } = useDeleteWithFeedback<TID>({
    deleteFn,
    onSuccessMessage: successMessage,
    onErrorMessage: errorMessage,
  });

  const confirmDelete = async () => {
    if (!modal.selectedId.value) return;
    await deleteAndNotify(modal.selectedId.value as TID, async () => {
      modal.close();
      if (onAfterDelete) await onAfterDelete();
    });
  };

  return {
    ...modal,
    confirmDelete,
  };
}
