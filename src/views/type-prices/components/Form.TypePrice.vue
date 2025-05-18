<template>
   <DangerAlert :show="showError" :message="alertMessage" />
   <SuccessAlert :show="showSuccess" :message="alertMessage" />
   <ModalForm :meta="meta" :isOpen="isOpen" :title="TypePriceId ? 'Editar tipo de precio' : 'Añadir nuevo tipo de precio'" @close="$emit('close')" @onSubmit="onSubmit">
      <FieldForm label="Nombre" name="name" id="name" required />
      <SelectForm label="Tipo de precio" id="type" :items="TYPEPRICESELECT" v-model="type" />
      <FieldForm label="Margen" name="margin" id="margin" required />
   </ModalForm>
</template>

<script setup lang="ts">
import { defineProps, watchEffect } from "vue";
import { useForm } from "vee-validate";
import { useAlert } from "@/composables/";
import { TypePrice, typePriceSchema, TYPEPRICESELECT, DEFAULTTYPEPRICEFORMVALUE, getTypePrice, postTypePrices, putTypePrices } from "@/views/type-prices/";
import { FieldForm, SelectForm, DangerAlert, SuccessAlert, ModalForm } from "@/components/";

const props = defineProps<{
   isOpen: boolean;
   TypePriceId?: string;
}>();

const emit = defineEmits<{
   (e: "close"): void;
   (e: "saved", data: TypePrice): void;
}>();

const { handleSubmit, defineField, setValues, meta } = useForm<TypePrice>({
   validationSchema: typePriceSchema,
   initialValues: { ...DEFAULTTYPEPRICEFORMVALUE },
});

const [type] = defineField("type");

const { showSuccess, showError, alertMessage, triggerSuccess, triggerError } = useAlert();

watchEffect(async () => {
   if (props.isOpen && props.TypePriceId) {
      const data = await getTypePrice(props.TypePriceId);
      if (data) setValues(data);
   } else {
      setValues({ ...DEFAULTTYPEPRICEFORMVALUE });
   }
});

const onSubmit = handleSubmit(async (values) => {
   let response: any;

   if (props.TypePriceId && props.TypePriceId !== "0") {
      response = await putTypePrices(values, props.TypePriceId);
   } else {
      response = await postTypePrices(values);
   }

   if (!response || response.status < 200 || response.status >= 300) {
      triggerError("Error al guardar el tipo de precio");
      return;
   }

   triggerSuccess("Tipo de precio guardado exitosamente");
   emit("saved", response.data);
   emit("close");
});
</script>
