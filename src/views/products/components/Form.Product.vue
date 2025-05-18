<template>
   <SideBar>
      <DangerAlert :show="showError" :message="alertMessage" />
      <div class="flex justify-center items-center min-h-screen">
         <Card class="w-full max-w-4xl mx-auto p-6">
            <form @submit.prevent="onSubmit" class="h-full">
               <h2 class="text-xl font-semibold text-gray-900 dark:text-white border-b pb-2 mb-4">Información del Producto</h2>
               <FieldForm label="Nombre del producto" name="number" id="number" required />
               <MultiSelectForm :categories="productCategories" v-model="selectedCategories" class="dropdown-container mb-3" />
               <TextAreaForm label="Descripción" name="description" id="description" rows="32" />
               <div class="grid lg:grid-cols-2 grid-cols-1 gap-6">
                  <FieldForm label="Codigo de barras" name="barcode" id="barcode" />
                  <FieldForm label="Codigo de referencia" name="referenceCode" id="referenceCode" />
               </div>
               <div class="grid lg:grid-cols-3 grid-cols-1 gap-6">
                  <FieldForm type="number" label="IVA" name="taxRate" id="taxRate" />
                  <FieldForm type="number" label="Precio de compra" name="purchasePrice" id="purchasePrice" />
                  <PriceDropdownForm />
               </div>
               <div class="grid lg:grid-cols-2 grid-cols-1 gap-6">
                  <FieldForm type="number" label="Stock" name="stockQuantity" id="stockQuantity" />
                  <FieldForm type="number" label="Unidades por grupo" name="unitsPerBox" id="unitsPerBox" />
               </div>
               <div class="space-x-2 flex justify-end">
                  <CancelButton @click="router.back()" />
                  <AcceptButton :disabled="!meta.valid" />
               </div>
            </form>
         </Card>
      </div>
   </SideBar>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useForm } from "vee-validate";
import { useAlert } from "@/composables/";
import { Product, ProductSchema, productAppRoutes, PRODUCTFORMSTATE, getProduct, postProducts, putProducts } from "@/views/products/";
import { SideBar, Card, FieldForm, MultiSelectForm, PriceDropdownForm, TextAreaForm, AcceptButton, CancelButton, DangerAlert } from "@/components/";

const route = useRoute();
const ProductId = route.params.id as string;

onMounted(async () => {
   if (ProductId) {
      const data = (await getProduct(ProductId)) as Product;
      setValues({ ...data });
   }
});

const { handleSubmit, setValues, meta } = useForm<Product>({
   validationSchema: ProductSchema,
   initialValues: { ...PRODUCTFORMSTATE },
});

const router = useRouter();
const { showError, alertMessage, triggerError } = useAlert();

const onSubmit = handleSubmit(async (values) => {
   let response: any;
   let errorMessage: string;

   if (ProductId) {
      errorMessage = "Error al actualizar la producto";
      response = await putProducts(values, ProductId);
   } else {
      errorMessage = "Error al crear la producto";
      response = await postProducts(values);
   }

   if (!response || response.status < 200 || response.status >= 300) {
      triggerError(errorMessage);
   } else {
      await router.push({
         path: productAppRoutes.list,
         state: {
            successMessage: ProductId ? "Presupuesto actualizada correctamente" : "Presupuesto creada correctamente",
         },
      });
   }
});
const selectedCategories = ref<string[]>([]);

const productCategories = [
   { value: "electronics", label: "Electrónica" },
   { value: "clothing", label: "Ropa" },
   { value: "home", label: "Hogar" },
   { value: "books", label: "Libros" },
   { value: "sports", label: "Deportes" },
   { value: "beauty", label: "Belleza" },
   { value: "toys", label: "Juguetes" },
   { value: "garden", label: "Jardín" },
   { value: "automotive", label: "Automotriz" },
   { value: "office", label: "Oficina" },
];
</script>
