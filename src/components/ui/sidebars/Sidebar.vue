<template>
  <DangerAlert :show="showError" :message="alertMessage" />
  <SuccessAlert :show="showSuccess" :message="alertMessage" />
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
    <aside
      class="fixed left-0 h-full transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 shadow-lg flex flex-col w-20"
    >
      <div class="p-3 flex items-center shrink-0">
        <img :src="logo" alt="Logo" class="w-14 h-14 rounded-xl shadow-md" />
      </div>
      <hr class="border-gray-200 dark:border-gray-700 mx-3 shrink-0" />
      <nav class="py-4">
        <ul class="p-4 space-y-4 flex flex-col">
          <li v-for="item in navigationItems">
            <NavigationItem :item="item" />
          </li>
        </ul>
      </nav>
      <div class="bottom-0 fixed shrink-0 pb-4">
        <hr class="border-gray-200 dark:border-gray-700 mb-4" />
        <div class="flex p-4">
          <ToggleDarkMode :isDarkMode="isDarkMode" @toggle="toggleDarkMode" />
        </div>
        <hr class="border-gray-200 dark:border-gray-700 mb-4" />
        <div class="relative px-3"></div>
      </div>
    </aside>
    <main class="transition-all duration-300 ml-20 p-6">
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  HomeIcon,
  UsersIcon,
  ClipboardIcon,
  BookUser,
  Bike,
  SquareChartGantt,
} from 'lucide-vue-next';
import logo from '@/assets/yeti.webp';
import { DangerAlert, SuccessAlert } from '@/components/';
import NavigationItem from '@/components/ui/sidebars/SidebarItems.vue';
import ToggleDarkMode from '@/components/ui/sidebars/SidebarToggleMode.vue';
import { useAlert } from '@/composables/';

const { showSuccess, showError, alertMessage } = useAlert();

const isDarkMode = ref(false);
const isSidebarExpanded = ref(false);

const navigationItems = [
  { route: '/home', title: 'Inicio', icon: HomeIcon },
  { route: '/deliveries', title: 'Deliverys', icon: ClipboardIcon },
  { route: '/clients', title: 'Clientes', icon: UsersIcon },
  { route: '/couriers', title: 'Repartidor', icon: Bike },
  { route: '/employees', title: 'Empleados', icon: BookUser },
  { route: '/services', title: 'Servicios', icon: SquareChartGantt },
];

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value;
  updateDarkMode();
}

function updateDarkMode() {
  const classList = document.documentElement.classList;
  isDarkMode.value ? classList.add('dark') : classList.remove('dark');
  localStorage.setItem('darkMode', String(isDarkMode.value));
}

onMounted(() => {
  const storedMode = localStorage.getItem('darkMode');
  isDarkMode.value =
    storedMode === 'true' ||
    (!storedMode && window.matchMedia('(prefers-color-scheme: dark)').matches);
  updateDarkMode();

  const storedSidebar = localStorage.getItem('sidebarExpanded');
  if (storedSidebar !== null) {
    isSidebarExpanded.value = storedSidebar === 'true';
  }
});
</script>
