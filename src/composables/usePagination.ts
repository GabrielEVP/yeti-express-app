import { ref, computed, Ref } from "vue";

export function usePagination<T>(items: Ref<T[]>, itemsPerPage: number) {
   const currentPage = ref(1);

   const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
   const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, items.value.length));
   const totalPages = computed(() => Math.ceil(items.value.length / itemsPerPage));

   const paginatedItems = computed(() => {
      return items.value.slice(startIndex.value, endIndex.value);
   });

   const updatePage = (page: number) => {
      currentPage.value = page;
   };

   return {
      currentPage,
      startIndex,
      endIndex,
      totalPages,
      paginatedItems,
      updatePage,
   };
}
