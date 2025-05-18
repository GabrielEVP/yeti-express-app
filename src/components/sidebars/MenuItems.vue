<template>
   <li class="relative" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
      <component
         :is="item.url ? 'router-link' : 'div'"
         :to="item.url"
         @click="onHeaderClick"
         :class="[isSidebarOpen ? 'px-4 pl-4' : '']"
         class="flex justify-center items-center text-sm cursor-pointer rounded-md z-20 h-10 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
         <div class="w-6 h-6 text-gray-900 dark:text-gray-100" :class="isSidebarOpen ? 'mr-2' : ''">
            <component v-if="item.icon" :is="item.icon" />
         </div>
         <span v-if="isSidebarOpen" class="flex-1 text-black dark:text-white">
            {{ item.title }}
         </span>
         <div v-if="isSidebarOpen && hasChildren">
            <component :is="isOpen ? ChevronDown : ChevronRight" class="w-4 h-4 text-gray-900 dark:text-gray-100" />
         </div>
      </component>
      <SidebarDropdown
         v-if="hasChildren"
         :is-visible="!isSidebarOpen && isDropdownOpen"
         :children="item.children"
         :dropdown-styles="dropdownStyles"
         @mouseenter="cancelClose"
         @mouseleave="onMouseLeave"
      />
      <transition
         enter-active-class="transition duration-100 ease-out"
         enter-from-class="transform scale-95 opacity-0"
         enter-to-class="transform scale-100 opacity-100"
         leave-active-class="transition duration-75 ease-in"
         leave-from-class="transform scale-100 opacity-100"
         leave-to-class="transform scale-95 opacity-0"
      >
         <ul v-show="isOpen && isSidebarOpen" class="mt-1 space-y-1 pl-4 relative z-10" @click.stop>
            <li v-for="child in item.children" :key="child.id" :class="[isSidebarOpen ? 'pl-4' : '']">
               <SidebarItems :is-open="isOpen" :item="child" :is-sidebar-open="isSidebarOpen" />
            </li>
         </ul>
      </transition>
   </li>
</template>

<script setup lang="ts" name="MenuItem">
import { ref, computed } from "vue";
import { ChevronDown, ChevronRight } from "lucide-vue-next";
import SidebarDropdown from "@components/ui/sidebars/SidebarDropdown.vue";
import SidebarItems from "@components/ui/sidebars/SidebarItems.vue";

const props = defineProps<{ item: any; isSidebarOpen: boolean }>();

const isOpen = ref(false);
const isDropdownOpen = ref(false);
const dropdownStyles = ref({ top: "0px", left: "0px" });

const hasChildren = computed(() => (props.item.children?.length ?? 0) > 0);

function onHeaderClick(e: MouseEvent) {
   e.stopPropagation();
   if (!hasChildren.value) return;
   if (props.isSidebarOpen) {
      isOpen.value = !isOpen.value;
   } else {
      isDropdownOpen.value = !isDropdownOpen.value;
      if (isDropdownOpen.value) positionDropdown(e.currentTarget as HTMLElement);
   }
}

async function positionDropdown(target: HTMLElement) {
   const rect = target.getBoundingClientRect();
   dropdownStyles.value = { top: `${rect.top}px`, left: `${rect.right}px` };
}

function onMouseEnter(e: MouseEvent) {
   if (!props.isSidebarOpen && hasChildren.value) {
      isDropdownOpen.value = true;
      positionDropdown(e.currentTarget as HTMLElement);
   }
}

function onMouseLeave() {
   if (!props.isSidebarOpen && hasChildren.value) {
      isDropdownOpen.value = false;
   }
}

function cancelClose() {
   isDropdownOpen.value = true;
}
</script>
