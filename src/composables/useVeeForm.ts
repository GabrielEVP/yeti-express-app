import { useForm } from "vee-validate";
import { useRouter } from "vue-router";
import { useAlert } from "@/composables/useAlert";
import { redirectToLastOrDefault } from "@/composables/";
import type { GenericObject } from "vee-validate";
import type { PartialDeep } from "type-fest";

interface CrudFormOptions<T extends GenericObject, ID> {
   id?: ID;
   getById: (id: ID) => Promise<T>;
   create: (values: T) => Promise<any>;
   update: (values: T, id: ID) => Promise<any>;

   defaultRoute: string;
   messages: {
      createError: string;
      updateError: string;
      createSuccess: string;
      updateSuccess: string;
   };
   validation: {
      schema: any;
      initialValues: PartialDeep<T>;
   };
}

export function useVeeForm<T extends GenericObject, ID = string>({ id, getById, create, update, defaultRoute, messages, validation }: CrudFormOptions<T, ID>) {
   const router = useRouter();
   const { triggerError, triggerSuccess } = useAlert();

   const { handleSubmit, setValues, meta } = useForm<T>({
      validationSchema: validation.schema,
      initialValues: validation.initialValues,
   });

   const initializeForm = async () => {
      if (!id) return;
      const data = await getById(id);
      setValues(data as PartialDeep<T>);
   };

   const onSubmit = handleSubmit(async (values) => {
      const isEdit = Boolean(id);
      const { createError, updateError, createSuccess, updateSuccess } = messages;

      try {
         const response = isEdit ? await update(values, id!) : await create(values);

         if (!response || response.status < 200 || response.status >= 300) {
            triggerError(isEdit ? updateError : createError);
            return;
         }

         const successMessage = isEdit ? updateSuccess : createSuccess;
         triggerSuccess(successMessage);
         redirectToLastOrDefault(router, defaultRoute);
      } catch {
         triggerError(isEdit ? updateError : createError);
      }
   });

   return { initializeForm, onSubmit, meta };
}
