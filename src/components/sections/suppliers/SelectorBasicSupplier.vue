<template>
   <Selector ref="selectorRef" v-model="search" label="Proveedor" @openModal="openModalSupplierForm">
      <template #list>
         <ul class="max-h-60 overflow-auto py-1">
            <li
               v-for="(supplier, index) in filteredSuppliers"
               :key="index"
               class="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-800 dark:text-gray-200"
               @click="selectSupplier(supplier)"
            >
               {{ supplier.legalName }}
            </li>
         </ul>
      </template>
      <template #modal>
         <FormBasicSupplierModal :isOpen="isModalSupplierFormOpen" @close="closeModalSupplierForm" @addSupplier="addNewSupplier" />
      </template>
   </Selector>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineProps, watch, nextTick } from "vue";
import { Supplier, getSuppliers } from "@views/suppliers";
import Selector from "@components/forms/Selector.vue";
import FormBasicSupplierModal from "@components/sections/suppliers/FormBasicSupplierModal.vue";

const props = defineProps<{
   supplierId: string;
   supplierIdAttrs?: any;
}>();

const selectorRef = ref<InstanceType<typeof Selector>>();

const emit = defineEmits<{
   (event: "update:supplierId", value: string): void;
}>();

const search = ref<string>("");
const suppliers = ref<Supplier[]>([]);
const loaded = ref(false);

onMounted(async () => {
   const data = await getSuppliers();
   suppliers.value = Array.isArray(data) ? data : data ? [data] : [];
   loaded.value = true;

   if (props.supplierId) {
      await updateSupplierDisplay();
   }
});

const updateSupplierDisplay = async () => {
   if (!props.supplierId || !loaded.value || suppliers.value.length === 0) return;

   const supplierIdStr = String(props.supplierId);
   const selectedSupplier = suppliers.value.find((supplier) => String(supplier.id) === supplierIdStr);

   if (selectedSupplier) {
      search.value = selectedSupplier.legalName;
   }
};

watch(
   () => props.supplierId,
   async (newSupplierId) => {
      if (newSupplierId && loaded.value) {
         await updateSupplierDisplay();
      }
   },
   { immediate: true }
);

watch(
   () => suppliers.value,
   async () => {
      if (props.supplierId && loaded.value) {
         await nextTick();
         await updateSupplierDisplay();
      }
   }
);

const isModalSupplierFormOpen = ref(false);

const filteredSuppliers = computed(() => {
   return suppliers.value.filter((supplier) => supplier.legalName.toLowerCase().includes((search.value || "").toLowerCase()));
});

const selectSupplier = (supplier: any) => {
   search.value = supplier.legalName ?? "";
   selectorRef.value?.closeDropdown();
   emit("update:supplierId", String(supplier.id));
};

const openModalSupplierForm = () => {
   isModalSupplierFormOpen.value = true;
};

const closeModalSupplierForm = () => {
   isModalSupplierFormOpen.value = false;
};

const addNewSupplier = async (supplierData: any) => {
   suppliers.value.push(supplierData);
   selectSupplier(supplierData);
   emit("update:supplierId", String(supplierData.id));
   closeModalSupplierForm();
};
</script>
