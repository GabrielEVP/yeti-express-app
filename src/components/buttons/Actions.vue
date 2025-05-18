<template>
   <div class="relative w-max mx-auto" v-click-outside="hideDropdown">
      <Button type="button" @click.stop="toggleDropdown" class="flex items-center shadow-md px-5 py-2.5 text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-600">
         <span class="mr-4">{{ title }}</span>
         <ChevronUp v-if="isOpen" class="h-4 w-4" />
         <ChevronDown v-else class="h-4 w-4" />
      </Button>

      <ul v-show="isOpen" class="absolute right-0.5 block shadow-lg bg-white dark:bg-gray-800 py-2 z-[1000] min-w-full w-max rounded max-h-96 overflow-auto">
         <router-link v-for="data in datas" :to="data.url">
            <li :key="data.url" class="dropdown-item py-2.5 px-5 hover:bg-blue-50 dark:hover:bg-gray-700 text-slate-900 dark:text-white text-sm font-medium cursor-pointer">
               {{ data.content }}
            </li>
         </router-link>
      </ul>
   </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
import { useRouter } from "vue-router";
import { ChevronDown, ChevronUp } from "lucide-vue-next";
import Button from "@components/ui/Button.vue";

const props = defineProps<{
   title: string;
   datas: Array<{ content: string; url: string }>;
}>();

const isOpen = ref(false);
const router = useRouter();

function toggleDropdown() {
   isOpen.value = !isOpen.value;
}

function hideDropdown() {
   isOpen.value = false;
}

declare global {
   interface HTMLElement {
      _clickOutside?: (event: MouseEvent) => void;
   }
}

const vClickOutside = {
   mounted(el: HTMLElement, binding: any) {
      el._clickOutside = (event: MouseEvent) => {
         if (!(el === event.target || el.contains(event.target as Node))) {
            binding.value(event);
         }
      };
      document.addEventListener("click", el._clickOutside);
   },
   unmounted(el: HTMLElement) {
      if (el._clickOutside) {
         document.removeEventListener("click", el._clickOutside);
      }
   },
};

if (typeof defineOptions === "function") {
   defineOptions({
      directives: {
         clickOutside: vClickOutside,
      },
   });
}
</script>
