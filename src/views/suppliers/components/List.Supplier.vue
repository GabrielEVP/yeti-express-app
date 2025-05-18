<template>
   <SideBar>
      <ConfirmationModal :isOpen="isOpen" message="¿Estás seguro que quieres eliminar este Proveedor?" @confirm="handleDeleteConfirmation" @cancel="close" />
      <Card class="p-3">
         <div class="mx-auto grid gap-4 items-center grid-cols-1 md:flex md:flex-wrap">
            <div class="flex-grow flex gap-2">
               <SearchForm v-model="searchQuery" placeholder="Buscar Proveedor" @input="applyFilters" />
               <div class="relative">
                  <FilterButton>
                     <SelectForm name="type" label="Tipo de proveedor" :items="[...TYPECONTACTSELECT]" @change="applySelectFilters">
                        <option value="">Todos</option>
                     </SelectForm>
                     <SelectForm name="country" label="País" :items="[...COUNTRIES]" @change="applySelectFilters">
                        <option value="">Todos</option>
                     </SelectForm>
                  </FilterButton>
               </div>
            </div>
            <NewButton label="Nuevo Proveedor" :URL="supplierAppRoutes.new" />
         </div>
      </Card>
      <TableDashboard
         :headers="[...SUPPLIERTABLEHEADERS]"
         :currentPage="currentPage"
         :totalPages="totalPages"
         :startIndex="startIndex"
         :endIndex="endIndex"
         :totalItems="suppliers.length"
         @updatePage="updatePage"
         @sort="handleSort"
      >
         <TableRow v-for="(supplier, id) in paginatedItems" :key="supplier.id">
            <TableContent class="text-black dark:text-white">
               {{ supplier.legalName }}
            </TableContent>
            <TableContent class="text-gray-600 dark:text-gray-300">
               {{ supplier.registrationNumber }}
            </TableContent>
            <TableContent>
               <Bagde :class="getContactTypeClass(supplier.type)">
                  {{ getContactTypeText(supplier.type) }}
               </Bagde>
            </TableContent>

            <TableContent>
               <div class="flex gap-1 justify-center">
                  <EyeButton :id="String(supplier.id)" route="/suppliers" />
                  <EditButton :id="String(supplier.id)" route="/suppliers/edit" />
                  <TrashButton @click="open(supplier.id)" />
               </div>
            </TableContent>
         </TableRow>
      </TableDashboard>
   </SideBar>
</template>

<script setup lang="ts">
import { TYPECONTACTSELECT, COUNTRIES } from "@/constants/";
import { getContactTypeText, getContactTypeClass } from "@/utils/";
import { SUPPLIERTABLEHEADERS, supplierAppRoutes, useSupplierList } from "@views/suppliers";
import { SideBar, Card, TableContent, TableRow, TableDashboard, Bagde, SearchForm, FilterButton, SelectForm, NewButton, TrashButton, EditButton, EyeButton, ConfirmationModal } from "@/components/";

const {
   suppliers,
   searchQuery,
   applySelectFilters,
   currentPage,
   totalPages,
   startIndex,
   endIndex,
   paginatedItems,
   isOpen,
   updatePage,
   handleSort,
   applyFilters,
   open,
   close,
   handleDeleteConfirmation,
} = useSupplierList();
</script>
