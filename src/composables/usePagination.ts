import {ref, computed } from 'vue';

interface PaginatedData<T> {
   items: T[];
   currentPage: number;
   perPage: number;
   total: number;
}

export function usePagination<T>() {
   const paginatedData = ref<PaginatedData<T>>({ 
      items: [],
      currentPage: 1,
      perPage: 15,
      total: 0
   });

   const startIndex = computed(() => (paginatedData.value.currentPage - 1) * paginatedData.value.perPage);
   const endIndex = computed(() => Math.min(startIndex.value + paginatedData.value.perPage, paginatedData.value.total));
   const totalPages = computed(() => Math.ceil(paginatedData.value.total / paginatedData.value.perPage));

   const updatePage = (page: number) => {
      paginatedData.value.currentPage = page;
      return { page, perPage: paginatedData.value.perPage };
   };

   const setPaginatedData = (data: PaginatedData<T>) => {
      paginatedData.value = data;
   };

   return {
      paginatedData,
      startIndex,
      endIndex,
      totalPages,
      updatePage,
      setPaginatedData
   };
}
