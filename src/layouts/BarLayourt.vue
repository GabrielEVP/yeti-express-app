<template>
  <DangerAlert :show="showError" :message="alertMessage" />
  <SuccessAlert :show="showSuccess" :message="alertMessage" />
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
      @click="closeMobileMenu"
    ></div>
    <aside
      :class="[
        'fixed left-0 h-full transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 shadow-lg flex flex-col w-20 z-50',
        'md:translate-x-0',
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      ]"
    >
      <div class="p-3 flex items-center shrink-0">
        <img :src="logo" alt="Logo" class="w-14 h-14 rounded-xl shadow-md" />
      </div>
      <hr class="border-gray-200 dark:border-gray-700 mx-3 shrink-0" />
      <nav class="py-6 flex-1">
        <ul class="p-4 space-y-4 flex flex-col">
          <li
            v-for="item in isUser ? navigationItemsUser : navigationItemsEmployer"
            :key="item.route"
          >
            <NavigationItem :item="item" @click="closeMobileMenu" />
          </li>
        </ul>
      </nav>
      <div class="shrink-0 pb-4">
        <hr class="border-gray-200 dark:border-gray-700 mb-4" />
        <div class="flex p-4">
          <ToggleDarkMode :isDarkMode="isDarkMode" @toggle="toggleDarkMode" />
        </div>
        <hr class="border-gray-200 dark:border-gray-700 mb-4" />
        <div class="relative px-3"></div>
      </div>
    </aside>
    <button
      @click="toggleMobileMenu"
      class="fixed bottom-4 right-4 z-50 md:hidden bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors duration-200"
    >
      <svg
        v-if="!isMobileMenuOpen"
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    <main :class="['transition-all duration-300 p-6', 'ml-0 md:ml-20']">
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
  Banknote,
  WalletMinimal,
} from 'lucide-vue-next';
import logo from '@/assets/yeti.webp';
import { DangerAlert, SuccessAlert } from '@/components/';
import NavigationItem from '@/components/ui/sidebars/SidebarItems.vue';
import ToggleDarkMode from '@/components/ui/sidebars/SidebarToggleMode.vue';
import { useAlert } from '@/composables/';
import { useAuthStore } from '@stores';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();

const { isUser } = storeToRefs(authStore);

const { showSuccess, showError, alertMessage } = useAlert();

const isDarkMode = ref(false);
const isSidebarExpanded = ref(false);
const isMobileMenuOpen = ref(false);

const navigationItemsUser = [
  { route: '/home', title: 'Inicio', icon: HomeIcon },
  { route: '/deliveries', title: 'Deliverys', icon: ClipboardIcon },
  { route: '/clients', title: 'Clientes', icon: UsersIcon },
  { route: '/couriers', title: 'Repartidor', icon: Bike },
  { route: '/employees', title: 'Empleados', icon: BookUser },
  { route: '/services', title: 'Servicios', icon: SquareChartGantt },
  { route: '/company-bills', title: 'Gastos', icon: Banknote },
  { route: '/debts', title: 'Cuentas por cobrar', icon: WalletMinimal },
];

const navigationItemsEmployer = [
  { route: '/deliveries', title: 'Deliverys', icon: ClipboardIcon },
  { route: '/clients', title: 'Clientes', icon: UsersIcon },
  { route: '/couriers', title: 'Repartidor', icon: Bike },
  { route: '/services', title: 'Servicios', icon: SquareChartGantt },
  { route: '/company-bills', title: 'Gastos', icon: Banknote },
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

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
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
