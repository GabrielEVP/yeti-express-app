<template>
   <DangerAlert :show="showError" :message="alertMessage" />
   <SuccessAlert :show="showSuccess" :message="alertMessage" />
   <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <aside :class="['fixed left-0 h-full transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 shadow-lg', isSidebarExpanded ? 'w-64' : 'w-20']">
         <div class="p-3 flex items-center">
            <img :src="logo" alt="Logo" class="w-14 h-14 rounded-xl shadow-md" />
            <span v-show="isSidebarExpanded" class="ml-4 text-black dark:text-gray-300 whitespace-nowrap"> Gava </span>
         </div>
         <hr class="border-gray-200 dark:border-gray-700 mx-3" />
         <nav class="py-4">
            <ul class="p-4 space-y-4 flex flex-col">
               <li v-for="item in navigationItems" :key="item.route">
                  <NavigationItem :item="item" :isSidebarExpanded="isSidebarExpanded" />
               </li>
            </ul>
         </nav>
         <div class="absolute bottom-0 w-full pb-4 flex flex-col">
            <hr class="border-gray-200 dark:border-gray-700 mb-4" />
            <div class="flex p-4">
               <ToggleDarkMode :isSidebarExpanded="isSidebarExpanded" :isDarkMode="isDarkMode" @toggle="toggleDarkMode" />
            </div>
            <hr class="border-gray-200 dark:border-gray-700 mb-4" />
            <div class="relative px-3">
               <ProfileMenu :isSidebarExpanded="isSidebarExpanded" :items="profileMenuItems" />
            </div>
         </div>
      </aside>
      <main :class="['transition-all duration-300', isSidebarExpanded ? 'ml-64' : 'ml-20']" class="p-6">
         <slot></slot>
      </main>
   </div>
</template>

<script setup lang="ts">
import logo from "@/assets/yeti.webp";
import { ref, onMounted } from "vue";
import { HomeIcon, UsersIcon, ClipboardIcon, BookUser, PackageSearch, UserIcon, LogOutIcon } from "lucide-vue-next";
import NavigationItem from "@/components/ui/sidebars/SidebarItems.vue";
import ToggleDarkMode from "@/components/ui/sidebars/SidebarToggleMode.vue";

const { showSuccess, showError, alertMessage } = useAlert();
import { DangerAlert, SuccessAlert } from "@/components/";
import { useAlert } from "@/composables/";

const isDarkMode = ref(false);
const isSidebarExpanded = ref(false);

const navigationItems = [
   { route: "/home", title: "Inicio", icon: HomeIcon },
   { route: "/deliveries", title: "Deliverys", icon: ClipboardIcon },
   { route: "/clients", title: "Clientes", icon: UsersIcon },
   { route: "/employees", title: "Empleados", icon: BookUser },
   { route: "/couriers", title: "Repartidor", icon: PackageSearch },
];

const profileMenuItems = [
   { label: "Mi Perfil", icon: UserIcon, action: () => handleProfileClick() },
   {
      label: "Cerrar Sesión",
      icon: LogOutIcon,
      action: () => handleLogoutClick(),
   },
];

function handleProfileClick() {
   console.log("Profile clicked");
}

function handleLogoutClick() {
   console.log("Logout clicked");
}

function toggleDarkMode() {
   isDarkMode.value = !isDarkMode.value;
   updateDarkMode();
}

function updateDarkMode() {
   const classList = document.documentElement.classList;
   isDarkMode.value ? classList.add("dark") : classList.remove("dark");
   localStorage.setItem("darkMode", String(isDarkMode.value));
}

onMounted(() => {
   const storedMode = localStorage.getItem("darkMode");
   isDarkMode.value = storedMode === "true" || (!storedMode && window.matchMedia("(prefers-color-scheme: dark)").matches);
   updateDarkMode();

   const storedSidebar = localStorage.getItem("sidebarExpanded");
   if (storedSidebar !== null) {
      isSidebarExpanded.value = storedSidebar === "true";
   }
});
</script>
