<template>
   <div
      ref="userMenuWrapper"
      @click="toggleUserMenu"
      class="p-4 cursor-pointer bg-gray-50 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 shadow-xl relative"
      :class="[!isOpen ? 'flex justify-center ' : '']"
   >
      <div href="#" class="flex items-center space-x-3">
         <div class="">
            <img v-if="profile_image" :src="profile_image" :alt="user.name" class="w-14 h-14 min-h-14 min-w-14 object-cover rounded-xl" />
            <span v-else>{{ user.name }}</span>
         </div>

         <div v-show="isOpen">
            <div class="font-medium text-gray-900 dark:text-gray-100">{{ user.name }}</div>
            <div class="text-xs flex items-center gap-1 text-gray-400 dark:text-gray-500">{{ user.email }}</div>
         </div>
      </div>

      <div v-if="userMenuOpen" class="absolute left-full bottom-5 mt-0 ml-2 bg-white dark:bg-gray-700 shadow-lg rounded-md w-48 z-20 transition-all duration-200 ease-in-out">
         <ul class="space-y-2 p-2">
            <li>
               <router-link to="/users" class="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md py-1 px-2">
                  <UserRound class="w-4 h-4" />
                  <span>Mi perfil</span>
               </router-link>
            </li>
            <li>
               <router-link to="/users" class="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md py-1 px-2">
                  <LogOut class="w-4 h-4" />
                  <span>Salir</span>
               </router-link>
            </li>
         </ul>
      </div>
   </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps } from "vue";
import { UserRound, LogOut } from "lucide-vue-next";
import { User } from "@views/users";

defineProps<{
   user: User;
   profile_image: string;
   isOpen: boolean;
}>();

const userMenuOpen = ref(false);

const userMenuWrapper = ref<HTMLElement | null>(null);

const toggleUserMenu = () => {
   userMenuOpen.value = !userMenuOpen.value;
};

const closeUserMenuIfClickedOutside = (event: MouseEvent) => {
   if (userMenuWrapper.value && !userMenuWrapper.value.contains(event.target as Node)) {
      userMenuOpen.value = false;
   }
};

onMounted(() => {
   document.addEventListener("click", closeUserMenuIfClickedOutside);
});

onUnmounted(() => {
   document.removeEventListener("click", closeUserMenuIfClickedOutside);
});
</script>
