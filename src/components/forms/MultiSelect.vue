<template>
  <Label for="categories">
    Categorias
    <div class="space-y-2 dropdown-container">
      <button
        type="button"
        @click="toggleDropdown"
        :aria-expanded="isOpen"
        role="combobox"
        class="w-full flex items-center justify-between px-3 py-2 text-sm border rounded-md border-black dark:border-gray-600 hover:bg-neutral-50 dark:hover:bg-gray-700 transition-colors"
      >
        <span v-if="selectedValues.length" class="dark:text-white">
          {{ selectedValues.length }} categoría{{
            selectedValues.length > 1 ? "s" : ""
          }}
          seleccionada{{ selectedValues.length > 1 ? "s" : "" }}
        </span>
        <span v-else class="text-neutral-500 dark:text-gray-400">{{
          placeholder
        }}</span>
        <ChevronUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </button>
      <div v-if="isOpen" class="relative">
        <div
          class="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-neutral-200 dark:border-gray-700 rounded-md shadow-lg"
        >
          <div class="p-2 border-b border-neutral-200 dark:border-gray-700">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar categoría..."
              class="w-full px-2 py-1 text-sm bg-transparent border border-neutral-200 dark:border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-gray-500"
            />
          </div>
          <div class="max-h-64 overflow-y-auto">
            <template v-if="filteredCategories.length">
              <div
                v-for="category in filteredCategories"
                :key="category.value"
                @click="toggleCategory(category.value)"
                class="flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer hover:bg-neutral-50 dark:hover:bg-gray-700 dark:text-white"
                :class="{
                  'bg-neutral-50 dark:bg-gray-700': isSelected(category.value),
                }"
              >
                <div
                  class="flex h-4 w-4 items-center justify-center rounded-sm border"
                  :class="[
                    isSelected(category.value)
                      ? 'bg-neutral-900 dark:bg-gray-200 text-white dark:text-gray-800 border-neutral-300 dark:border-gray-600'
                      : 'border-neutral-300 dark:border-gray-600 opacity-50',
                  ]"
                >
                  <Check v-if="isSelected(category.value)" class="h-3 w-3" />
                </div>
                <span class="dark:text-white">{{ category.label }}</span>
              </div>
            </template>
            <div
              v-else
              class="px-2 py-3 text-sm text-center text-neutral-500 dark:text-white"
            >
              No se encontraron categorías.
            </div>
          </div>
        </div>
      </div>
      <div v-if="selectedCategories.length" class="flex flex-wrap gap-1">
        <div
          v-for="category in selectedCategories"
          :key="category.value"
          class="flex items-center gap-1 rounded-md bg-neutral-50 dark:bg-gray-700 px-2 py-1 text-sm border border-neutral-200 dark:border-gray-600 dark:text-white"
        >
          <span>{{ category.label }}</span>
          <button
            @click.stop="removeCategory(category.value)"
            class="h-4 w-4 p-0 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-gray-600 rounded-full"
          >
            <X class="h-3 w-3" />
            <span class="sr-only">Eliminar {{ category.label }}</span>
          </button>
        </div>
      </div>
    </div>
  </Label>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { Check, X } from "lucide-vue-next";
import { Label } from "@components";

interface Category {
  value: string;
  label: string;
}

interface Props {
  categories: Category[];
  placeholder?: string;
  modelValue?: string[];
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Seleccionar categorías",
  modelValue: () => [],
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string[]): void;
}>();

const isOpen = ref(false);
const searchQuery = ref("");
const selectedValues = ref<string[]>([...props.modelValue]);

const filteredCategories = computed(() =>
  searchQuery.value
    ? props.categories.filter((c) =>
        c.label.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    : props.categories
);

const selectedCategories = computed(() =>
  props.categories.filter((c) => selectedValues.value.includes(c.value))
);

const toggleDropdown = () => (isOpen.value = !isOpen.value);
const isSelected = (value: string) => selectedValues.value.includes(value);

const toggleCategory = (value: string) => {
  selectedValues.value = isSelected(value)
    ? selectedValues.value.filter((v) => v !== value)
    : [...selectedValues.value, value];
};

const removeCategory = (value: string) => {
  selectedValues.value = selectedValues.value.filter((v) => v !== value);
};

const handleClickOutside = (event: MouseEvent) => {
  if (!(event.target as HTMLElement).closest(".dropdown-container")) {
    isOpen.value = false;
  }
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));
</script>
