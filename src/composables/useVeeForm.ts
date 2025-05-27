import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { useAlert } from '@/composables/useAlert';
import { redirectToLastOrDefault } from '@/composables/';
import type { GenericObject } from 'vee-validate';
import type { PartialDeep } from 'type-fest';

interface CrudFormOptions<T extends GenericObject, ID> {
  id?: ID;
  getById?: (id: ID) => Promise<T>;
  create?: (values: T) => Promise<any>;
  update?: (values: T, id: ID) => Promise<any>;
  modal?: boolean;
  defaultRoute?: string;
  messages: {
    createError?: string;
    updateError?: string;
    createSuccess?: string;
    updateSuccess?: string;
  };
  validation: {
    schema: any;
    initialValues: PartialDeep<T>;
  };
}

export function useVeeForm<T extends GenericObject, ID = string>({
  id,
  getById,
  create,
  update,
  defaultRoute,
  messages,
  validation,
  modal,
}: CrudFormOptions<T, ID>) {
  const router = useRouter();
  const { triggerError, triggerSuccess } = useAlert();

  const { handleSubmit, setValues, meta, errors, setFieldValue, values } = useForm<T>({
    validationSchema: validation.schema,
    initialValues: validation.initialValues,
  });

  const initializeForm = async () => {
    if (!id || !getById) return;

    try {
      const data = await getById(id);
      setValues(data as PartialDeep<T>);
    } catch (error) {
      triggerError('No se pudo cargar el registro o no existe');
      if (defaultRoute) {
        redirectToLastOrDefault(router, defaultRoute);
      }
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    const isEdit = Boolean(id);

    try {
      if (isEdit) {
        if (!update) {
          triggerError('No se definió la función de actualización.');
          return;
        }

        const res = await update(values, id!);
        if (!res || res.status < 200 || res.status >= 300) {
          triggerError(messages.updateError ?? 'Error al actualizar');
          return;
        }

        triggerSuccess(messages.updateSuccess ?? 'Actualizado correctamente');
      } else {
        if (!create) {
          triggerError('No se definió la función de creación.');
          return;
        }

        const res = await create(values);
        if (!res || res.status < 200 || res.status >= 300) {
          triggerError(messages.createError ?? 'Error al crear');
          return;
        }

        triggerSuccess(messages.createSuccess ?? 'Creado correctamente');

        if (modal) {
          return res;
        }
      }

      if (defaultRoute) {
        redirectToLastOrDefault(router, defaultRoute);
      }
    } catch {
      triggerError(
        isEdit
          ? (messages.updateError ?? 'Error al actualizar')
          : (messages.createError ?? 'Error al crear')
      );
    }
  });

  return { initializeForm, onSubmit, meta, errors, setFieldValue, values };
}
