<template>
   <DangerAlert :show="showError" :message="alertMessage" />
   <SuccessAlert :show="showSuccess" :message="alertMessage" />
   <ModalForm :meta="meta" :isOpen="isOpen" :title="TypePaymentId ? 'Editar tipo de precio' : 'Añadir nuevo tipo de precio'" @close="$emit('close')" @onSubmit="onSubmit">
      <FieldForm label="Nombre" name="name" id="name" required />
   </ModalForm>
</template>

<script setup lang="ts">
import { defineProps, watchEffect } from "vue";
import { useForm } from "vee-validate";
import { useAlert } from "@/composables/";
import { TypePayment, typePaymentSchema, TYPEPAYMENTDEFAULTFORMVALUE, getTypePayment, postTypePayments, putTypePayments } from "@/views/type-payments/";
import { FieldForm, DangerAlert, SuccessAlert, ModalForm } from "@/components/";

const props = defineProps<{
   isOpen: boolean;
   TypePaymentId?: string;
}>();

const emit = defineEmits<{
   (e: "close"): void;
   (e: "saved", data: TypePayment): void;
}>();

const { handleSubmit, setValues, meta } = useForm<TypePayment>({
   validationSchema: typePaymentSchema,
   initialValues: { ...TYPEPAYMENTDEFAULTFORMVALUE },
});

const { showSuccess, showError, alertMessage, triggerSuccess, triggerError } = useAlert();

watchEffect(async () => {
   if (props.isOpen && props.TypePaymentId) {
      const data = await getTypePayment(props.TypePaymentId);
      if (data) setValues(data);
   }
});

const onSubmit = handleSubmit(async (values) => {
   let response: any;

   if (props.TypePaymentId && props.TypePaymentId !== "0") {
      response = await putTypePayments(values, props.TypePaymentId);
   } else {
      response = await postTypePayments(values);
   }

   if (!response || response.status < 200 || response.status >= 300) {
      triggerError("Error al guardar el tipo de precio");
      return;
   }

   triggerSuccess("Tipo de pago guardado exitosamente");
   emit("saved", response.data);
   emit("close");
});
</script>
