<template>
  <div class="space-y-4">
    <div class="flex items-center gap-3">
      <div class="w-1 h-6 bg-gradient-to-b bg-blue-500 rounded-full"></div>
      <h3 class="text-base font-bold text-gray-700 dark:text-gray-200 tracking-wide">
        <slot name="title"/>
      </h3>
    </div>
    <div class="relative">
      <div class="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-750 rounded-2xl"></div>
      <div class="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-600/50 shadow-sm">
        <p class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap font-medium">
          <slot name="content" />
        </p>
      </div>
    </div>
  </div>
</template>
