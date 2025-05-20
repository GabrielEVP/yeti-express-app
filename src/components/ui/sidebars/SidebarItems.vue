<template>
   <div class="relative group">
      <router-link :to="item.route" v-slot="{ isActive }">
         <div
            :class="[
               'relative flex items-center p-3 rounded-xl transition-all duration-200 w-full',
               isActive ? 'bg-primary-100 dark:bg-primary-900 text-gray-400 dark:text-gray-500' : 'hover:bg-gray-100 dark:hover:bg-gray-700',
            ]"
         >
            <component
               :is="item.icon"
               :class="['w-6 h-6 flex-shrink-0', isActive ? 'text-primary-600 dark:text-primary-400' : 'text-black dark:text-gray-300 group-hover:text-primary-500 dark:group-hover:text-primary-400']"
            />
            <div
               class="absolute left-full ml-2 py-1 p-4 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-501 whitespace-nowrap z-10"
            >
               {{ item.title }}
               <div class="absolute top-1/2 -left-1 -mt-1 border-4 border-transparent border-r-gray-900 dark:border-r-gray-700"></div>
            </div>
         </div>
      </router-link>
   </div>
</template>

<script setup lang="ts">
defineProps<{
   item: { route: string; title: string; icon: any };
}>();
</script>
