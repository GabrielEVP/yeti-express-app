<template>
  <div class="w-full h-full flex items-center justify-center py-16">
    <div class="space-y-4 text-center">
      <svg
        class="mx-auto h-12 w-12 animate-spin text-blue-600 dark:text-blue-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        role="img"
        aria-label="Cargando"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
      <div class="text-sm text-gray-600 dark:text-gray-300">Cargando información...</div>
    </div>
  </div>
</template>
