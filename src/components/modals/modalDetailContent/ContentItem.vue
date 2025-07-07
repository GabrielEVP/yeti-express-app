<template>
  <div class="group flex flex-col py-4 border-b border-gray-100 dark:border-gray-700 rounded-lg gap-3">
    <div class="flex items-center gap-3">
      <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
      <span class="text-sm font-semibold text-gray-600 dark:text-gray-300 tracking-wide">
        <slot name="title" />
      </span>
    </div>
    <div class="text-sm text-gray-900 dark:text-white font-medium break-words word-wrap ml-5">
      <slot name="content" />
    </div>
  </div>
</template>
