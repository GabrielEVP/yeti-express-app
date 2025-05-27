import { ref, computed, watch } from 'vue';

interface FilterSortSearchOptions<TFilter, TData> {
  columns: string[];
  fetchFn: (filters: TFilter) => Promise<TData[]>;
  dataRef: { value: TData[] };
}

export function useFilterSortSearch<TFilter extends Record<string, any>, TData>({
  columns,
  fetchFn,
  dataRef,
}: FilterSortSearchOptions<TFilter, TData>) {
  const searchQuery = ref('');
  const sort = ref<{ column: string; order: 'asc' | 'desc' }>({
    column: columns[0],
    order: 'asc',
  });

  const dynamicFilters = ref<Record<string, any>>({});

  const filters = computed<TFilter>(() => {
    return {
      search: searchQuery.value,
      sort: { column: sort.value.column, order: sort.value.order },
      ...dynamicFilters.value,
    } as unknown as TFilter;
  });

  const applyFilters = async () => {
    const result = await fetchFn(filters.value);
    dataRef.value = Array.isArray(result) ? result : [];
  };

  const handleSort = (config: { column: string; order: 'asc' | 'desc' }) => {
    sort.value = config;
    applyFilters();
  };

  const setDynamicFilters = (values: Partial<TFilter>) => {
    dynamicFilters.value = {
      ...dynamicFilters.value,
      ...values,
    };

    applyFilters();
  };

  watch(searchQuery, applyFilters);

  return {
    searchQuery,
    filters,
    applyFilters,
    handleSort,
    dynamicFilters,
    setDynamicFilters,
  };
}
