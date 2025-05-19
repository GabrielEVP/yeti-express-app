<template>
   <DangerAlert :show="showError" :message="alertMessage" />
   <SuccessAlert :show="showSuccess" :message="alertMessage" />
   <SidebarBase :isSidebarExpanded="isSidebarExpanded" :isDarkMode="isDarkMode" @toggleSidebarState="toggleSidebarState">
      <template #header>
         <img :src="Logo" alt="Gava logo" class="rounded-xl shadow-md h-14 w-14 min-h-14 min-w-14" />
         <div :class="[isSidebarExpanded ? 'opacity-100 visible' : 'opacity-0 invisible', 'ml-3 transition-opacity duration-300 ease-in-out']">
            <div class="font-semibold text-black dark:text-white" v-if="isSidebarExpanded">Gava</div>
            <div class="text-xs text-gray-400 dark:text-gray-300" v-if="isSidebarExpanded">Software de facturación</div>
         </div>
      </template>
      <template #items>
         <nav class="flex-1 overflow-y-auto bg-white dark:bg-gray-800 py-4">
            <ul class="space-y-1 px-2">
               <MenuItems v-for="item in menuItems" :key="item.id" :item="item" :is-sidebar-open="isSidebarExpanded" />
            </ul>
         </nav>
         <div class="space-y-1 p-2 bg-white shadow-xl dark:bg-gray-800">
            <SidebarToggleMode :isSidebarExpanded="isSidebarExpanded" :isDarkMode="isDarkMode" @toggle="handleDarkModeToggle" />
         </div>
      </template>
      <template #footer>
         <SidebarUserMenu :user="user" :profile_image="avatarUrl" :isOpen="isSidebarExpanded" />
      </template>
      <template #content>
         <slot></slot>
      </template>
   </SidebarBase>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { useAuthStore } from "@/stores/Auth";
import { menuItems } from "@constants/SidebarContent";
import { SidebarBase, SidebarUserMenu, SidebarToggleMode, MenuItems, DangerAlert, SuccessAlert } from "@/components/";
import { getProfileImageUrl } from "@views/users";
import Logo from "@/assets/Gava.jpg";

import { useAlert } from "@/composables/";

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const isSidebarExpanded = ref(false);
const isDarkMode = ref(false);
const avatarUrl = ref("");

const { showSuccess, showError, alertMessage } = useAlert();

async function loadProfileImage() {
   if (!user.value?.profile_image) return;

   const timestamp = new Date().getTime();
   const imageUrl = await getProfileImageUrl(`${user.value.profile_image}?${timestamp}`);
   avatarUrl.value = imageUrl;
}

watch(
   () => user.value?.profile_image,
   () => {
      loadProfileImage();
   },
   { immediate: true }
);

function applyDarkMode(isDark: boolean) {
   const classList = document.documentElement.classList;
   isDark ? classList.add("dark") : classList.remove("dark");
   localStorage.setItem("darkMode", String(isDark));
}

function handleDarkModeToggle() {
   isDarkMode.value = !isDarkMode.value;
   applyDarkMode(isDarkMode.value);
}

function loadInitialPreferences() {
   const storedDarkMode = localStorage.getItem("darkMode");
   isDarkMode.value = storedDarkMode === "true" || (!storedDarkMode && window.matchMedia("(prefers-color-scheme: dark)").matches);
   applyDarkMode(isDarkMode.value);
   const storedSidebar = localStorage.getItem("sidebarExpanded");
   isSidebarExpanded.value = storedSidebar === "true";
}

function toggleSidebarState() {
   isSidebarExpanded.value = !isSidebarExpanded.value;
   localStorage.setItem("sidebarExpanded", String(isSidebarExpanded.value));
}

onMounted(() => {
   loadInitialPreferences();
   loadProfileImage();
});
</script>
