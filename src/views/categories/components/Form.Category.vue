<template>
   <DangerAlert :show="showError" :message="alertMessage" />
   <SuccessAlert :show="showSuccess" :message="alertMessage" />
   <ModalForm :meta="meta" :isOpen="isOpen" :title="categoryId ? 'Editar categoria' : 'Añadir nuevo categoria'" @close="$emit('close')" @onSubmit="onSubmit">
      <FieldForm label="Nombre" name="name" id="name" required />
   </ModalForm>
</template>

<script setup lang="ts">
import { defineProps, watchEffect } from "vue";
import { useForm } from "vee-validate";
import { useAlert } from "@/composables/";
import { Category, categorySchema, CATEGORYDEFAULTFORMVALUE, getCategory, postCategories, putCategories } from "@/views/categories/";
import { FieldForm, DangerAlert, SuccessAlert, ModalForm } from "@/components/";

const props = defineProps<{
   isOpen: boolean;
   categoryId?: string;
}>();

const emit = defineEmits<{
   (e: "close"): void;
   (e: "saved", data: Category): void;
}>();

const { handleSubmit, setValues, meta } = useForm<Category>({
   validationSchema: categorySchema,
   initialValues: { ...CATEGORYDEFAULTFORMVALUE },
});

const { showSuccess, showError, alertMessage, triggerSuccess, triggerError } = useAlert();

watchEffect(async () => {
   if (props.isOpen && props.categoryId) {
      const data = await getCategory(props.categoryId);
      if (data) setValues(data);
   }
});

const onSubmit = handleSubmit(async (values) => {
   let response: any;

   if (props.categoryId && props.categoryId !== "0") {
      response = await putCategories(values, props.categoryId);
   } else {
      response = await postCategories(values);
   }

   if (!response || response.status < 200 || response.status >= 300) {
      triggerError("Error al guardar el categoria");
      return;
   }

   triggerSuccess("Tipo de pago guardado exitosamente");
   emit("saved", response.data);
   emit("close");
});
</script>
