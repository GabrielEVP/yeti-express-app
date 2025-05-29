<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
    <aside
      class="fixed left-0 h-full transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 shadow-lg flex flex-col w-20"
    >
      <slot></slot>
    </aside>
  </div>
</template>
