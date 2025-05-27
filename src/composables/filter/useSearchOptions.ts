import { ref, watch } from 'vue';

interface UseSearchOptions<TData> {
  fetchFn: (search: string) => Promise<TData[]>;
  autoSearch?: boolean;
}

export function useSearch<TData>({ fetchFn, autoSearch = true }: UseSearchOptions<TData>) {
  const searchQuery = ref('');

  const applySearch = async (): Promise<TData[]> => {
    try {
      const result = await fetchFn(searchQuery.value);
      return Array.isArray(result) ? result : [];
    } catch (e) {
      console.error('Error en la búsqueda:', e);
      return [];
    }
  };

  if (autoSearch) {
    watch(searchQuery, async (_newQuery, _oldQuery, onInvalidate) => {
      let isStale = false;
      onInvalidate(() => (isStale = true));
      const _ = await applySearch();
      if (isStale) return;
      // el componente decide qué hacer con los datos
    });
  }

  return {
    searchQuery,
    applySearch,
  };
}
