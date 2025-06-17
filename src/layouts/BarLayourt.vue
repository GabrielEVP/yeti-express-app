<template>
  <DangerAlert :show="showError" :message="alertMessage" />
  <SuccessAlert :show="showSuccess" :message="alertMessage" />
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
    <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" @click="closeMobileMenu"></div>
    <aside
      :class="[
        'fixed left-0 top-0 h-full transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 shadow-lg flex flex-col z-50',
        'w-20 lg:w-20',
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ]"
    >
      <div class="p-2 flex items-center justify-center shrink-0 border-b border-gray-200 dark:border-gray-700">
        <img :src="logo" alt="Logo" class="rounded-xl object-cover" />
      </div>
      <nav class="flex-1 overflow-y-auto m-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <ul class="p-2 space-y-2">
          <li v-for="item in isUser ? navigationItemsUser : navigationItemsEmployee" :key="item.route">
            <NavigationItem :item="item" @click="closeMobileMenu" />
          </li>
        </ul>
      </nav>
      <div class="shrink-0 border-t border-gray-200 dark:border-gray-700">
        <!-- Dark mode toggle -->
        <div class="p-3 flex justify-center">
          <ToggleDarkMode :isDarkMode="isDarkMode" @toggle="toggleDarkMode" />
        </div>
        <div class="p-2 flex justify-center">
          <SidebarProfileMenu :items="isUser ? profileMenuItemsUser : profileMenuItemsEmployee" />
        </div>
      </div>
    </aside>
    <button
      @click="toggleMobileMenu"
      class="fixed bottom-6 right-6 z-50 lg:hidden bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
      aria-label="Toggle menu"
    >
      <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
    <main class="transition-all duration-300 ml-0 lg:ml-20 min-h-screen">
      <div class="p-2 sm:p-6">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Package, HomeIcon, UsersIcon, ClipboardIcon, IdCard, Truck, Bike, SquareChartGantt, Banknote, WalletMinimal } from 'lucide-vue-next';
import logo from '@/assets/LogoYeti.png';
import { DangerAlert, SidebarProfileMenu, SuccessAlert } from '@/components/';
import NavigationItem from '@/components/ui/sidebars/SidebarItems.vue';
import ToggleDarkMode from '@/components/ui/sidebars/SidebarToggleMode.vue';
import { useAlert } from '@/composables/';
import { useAuthStore } from '@stores';
import { storeToRefs } from 'pinia';
import { UserIcon, LogOutIcon } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const { isUser } = storeToRefs(authStore);

const router = useRouter();
const { showSuccess, showError, alertMessage } = useAlert();

const isDarkMode = ref(false);
const isMobileMenuOpen = ref(false);

const navigationItemsUser = [
  { route: '/home', title: 'Inicio', icon: HomeIcon },
  { route: '/deliveries', title: 'Deliverys', icon: Package },
  { route: '/clients', title: 'Clientes', icon: UsersIcon },
  { route: '/couriers', title: 'Repartidor', icon: Truck },
  { route: '/employees', title: 'Empleados', icon: IdCard },
  { route: '/services', title: 'Servicios', icon: SquareChartGantt },
  { route: '/company-bills', title: 'Gastos', icon: Banknote },
  { route: '/debts', title: 'Cuentas por cobrar', icon: WalletMinimal },
];

const profileMenuItemsUser = [
  {
    label: 'Perfil',
    icon: UserIcon,
    action: () => {
      router.push('/users/edit');
      closeMobileMenu();
    },
  },
  {
    label: 'Cerrar sesión',
    icon: LogOutIcon,
    action: () => {
      authStore.clearUser();
      router.push('/');
      closeMobileMenu();
    },
  },
];

const navigationItemsEmployee = [
  { route: '/deliveries', title: 'Deliverys', icon: ClipboardIcon },
  { route: '/clients', title: 'Clientes', icon: UsersIcon },
  { route: '/couriers', title: 'Repartidor', icon: Bike },
  { route: '/services', title: 'Servicios', icon: SquareChartGantt },
  { route: '/company-bills', title: 'Gastos', icon: Banknote },
];

const profileMenuItemsEmployee = [
  {
    label: 'Cerrar sesión',
    icon: LogOutIcon,
    action: () => {
      authStore.clearUser();
      router.push('/');
      closeMobileMenu();
    },
  },
];

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value;
  updateDarkMode();
}

function updateDarkMode() {
  const classList = document.documentElement.classList;
  if (isDarkMode.value) {
    classList.add('dark');
  } else {
    classList.remove('dark');
  }
  localStorage.setItem('darkMode', String(isDarkMode.value));
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;

  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
  document.body.style.overflow = '';
}

onMounted(() => {
  const storedMode = localStorage.getItem('darkMode');
  isDarkMode.value = storedMode === 'true' || (!storedMode && window.matchMedia('(prefers-color-scheme: dark)').matches);
  updateDarkMode();

  const storedSidebar = localStorage.getItem('sidebarExpanded');
  if (storedSidebar !== null) {
    isMobileMenuOpen.value = storedSidebar === 'true';
  }
});
</script>
