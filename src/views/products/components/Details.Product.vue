<template>
  <SideBar>
    <div class="space-y-8 text-gray-900 dark:text-gray-100">
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 class="text-3xl font-bold tracking-tight">Productos :</h1>
        </div>
        <div class="flex gap-2">
          <ActionsButton title="Acciones" :datas="sectionActions" />
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card class="md:col-span-2 dark:bg-gray-800 dark:text-gray-100">
          <div class="p-6">
            <h2 class="text-xl font-semibold flex items-center gap-2 mb-4">
              <Building2 class="h-5 w-5" />
              Información de la Producto
            </h2>
            <div class="space-y-5">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SectionText
                  title="Número de Producto"
                  :content="product.description"
                />
                <SectionText
                  title="Fecha de Emisión"
                  :content="product.barcode"
                />
                <SectionText
                  title="Cliente"
                  :content="clientNames[product.referenceCode]"
                />
                <SectionText
                  title="Importe Total"
                  :content="product.taxRate + ' %'"
                />
                <SectionText
                  title="Total Impuestos"
                  :content="product.purchasePrice + ' €'"
                />
              </div>
            </div>
          </div>
        </Card>
        <TimeLineActivity />
      </div>
    </div>
  </SideBar>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Building2 } from "lucide-vue-next";
import { Product, getProduct, PRODUCTFORMSTATE } from "@views/products";
import {
  SideBar,
  SectionText,
  Card,
  ActionsButton,
  TimeLineActivity,
} from "@components";

const route = useRoute();
const productId = route.params.id as string;

const product = ref<Product>(PRODUCTFORMSTATE);
const clientNames = ref<Record<string, string>>({});

onMounted(async () => {
  const data = await getProduct(productId);
  product.value = data as Product;
});

const sectionActions = [
  {
    content: "Editar Producto",
    url: `/products/edit/${productId}`,
  },
];
</script>
