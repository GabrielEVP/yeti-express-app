<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4">
    <div
      class="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-7xl h-full max-h-[95vh] sm:max-h-[90vh] flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <div class="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Ticket de Delivery</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 font-medium">#{{ deliveryId }}</p>
          </div>
        </div>

        <div class="flex items-center space-x-2">
          <!-- Botón de descarga -->
          <button
            @click="$emit('download')"
            class="flex items-center space-x-2 px-3 sm:px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span class="hidden sm:inline">Descargar</span>
          </button>

          <!-- Botón de cerrar -->
          <button
            @click="$emit('close')"
            class="flex items-center justify-center w-10 h-10 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Contenido del modal -->
      <div class="flex-1 overflow-hidden bg-gray-50 dark:bg-gray-800">
        <div v-if="ticketUrl" class="h-full p-2 sm:p-4">
          <!-- Visor PDF -->
          <div class="h-full bg-white dark:bg-gray-900 rounded-lg shadow-inner border border-gray-200 dark:border-gray-700 overflow-hidden">
            <iframe :src="ticketUrl" class="w-full h-full" type="application/pdf" frameborder="0">
              <!-- Fallback para navegadores que no soportan PDF -->
              <div class="flex flex-col items-center justify-center h-full p-8 text-center">
                <div class="w-20 h-20 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-6">
                  <svg class="w-10 h-10 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No se puede mostrar el PDF</h4>
                <p class="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
                  Tu navegador no soporta la visualización de PDF. Puedes descargar el archivo para verlo en tu dispositivo.
                </p>
                <button
                  @click="$emit('download')"
                  class="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span>Descargar PDF</span>
                </button>
              </div>
            </iframe>
          </div>
        </div>

        <div v-else class="flex items-center justify-center h-full">
          <div class="flex flex-col items-center space-y-4">
            <div class="relative">
              <div class="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin"></div>
              <div
                class="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"
              ></div>
            </div>

            <div class="text-center">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Cargando ticket...</h4>
              <p class="text-gray-600 dark:text-gray-400">Por favor espera mientras se carga el documento</p>
            </div>
          </div>
        </div>
      </div>

      <div class="hidden sm:block border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-6 py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Usa Ctrl+rueda del ratón para hacer zoom</span>
          </div>
          <div class="text-sm text-gray-500 dark:text-gray-400">PDF Viewer</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

interface Props {
  isOpen: boolean;
  ticketUrl: string;
  ticketBlob: Blob | null;
  deliveryId: string;
}

defineProps<Props>();

defineEmits<{
  close: [];
  download: [];
}>();

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    document.dispatchEvent(new CustomEvent('close-modal'));
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown);
  document.body.style.overflow = 'hidden';
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown);
  document.body.style.overflow = 'auto';
});
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-overlay {
  animation: fadeIn 0.2s ease-out;
}

iframe {
  -webkit-overflow-scrolling: touch;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
