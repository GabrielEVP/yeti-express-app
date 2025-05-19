<template>
   <SideBar>
      <ConfirmationModal :isOpen="isOpen" message="¿Estás seguro que quieres eliminar este Cliente?" @confirm="handleDeleteConfirmation" @cancel="close" />
      <Card class="p-3">
         <div class="mx-auto grid gap-4 items-center grid-cols-1 md:flex md:flex-wrap">
            <div class="flex-grow flex gap-2">
               <SearchForm v-model="searchQuery" placeholder="Buscar Cliente" @input="applyFilters" />
               <div class="relative">
                  <FilterButton> </FilterButton>
               </div>
            </div>
            <NewButton label="Nuevo Cliente" :URL="clientAppRoutes.new" />
         </div>
      </Card>
      <TableDashboard
         :headers="[...CLIENTTABLEHEADERS]"
         :currentPage="currentPage"
         :totalPages="totalPages"
         :startIndex="startIndex"
         :endIndex="endIndex"
         :totalItems="clients.length"
         @updatePage="updatePage"
         @sort="handleSort"
      >
         <TableRow v-for="(client, id) in paginatedItems" :key="client.id">
            <TableContent class="text-black dark:text-white">
               {{ client.legalName }}
            </TableContent>
            <TableContent class="text-gray-600 dark:text-gray-300">
               {{ client.registrationNumber }}
            </TableContent>
            <TableContent>
               <div class="flex gap-1 justify-center">
                  <EyeButton :id="String(client.id)" route="/clients" />
                  <EditButton :id="String(client.id)" route="/clients/edit" />
                  <TrashButton @click="open(client.id)" />
               </div>
            </TableContent>
         </TableRow>
      </TableDashboard>
   </SideBar>
</template>

<script setup lang="ts">
import { CLIENTTABLEHEADERS, clientAppRoutes, useClientList } from "@/views/clients";
import { SideBar, Card, TableContent, TableRow, TableDashboard, SearchForm, FilterButton, NewButton, TrashButton, EditButton, EyeButton, ConfirmationModal } from "@/components/";

const { clients, searchQuery, applySelectFilters, currentPage, totalPages, startIndex, endIndex, paginatedItems, isOpen, updatePage, handleSort, applyFilters, open, close, handleDeleteConfirmation } =
   useClientList();
</script>
