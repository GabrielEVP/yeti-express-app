<template>
  <ModalDetail v-if="clientData" :is-open="isOpen" @close="handleCloseModal">
    <div class="relative overflow-hidden">
      <ModalTitleModal>Detalle del Cliente</ModalTitleModal>
      <div class="relative px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        <div class="text-center py-4 sm:py-6 relative">
          <div class="relative">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 tracking-wide uppercase">Nombre</p>
            <div class="relative inline-block">
              <p class="text-3xl sm:text-4xl font-black text-black dark:text-white">
                {{ clientData.legalName }}
              </p>
              <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r bg-black dark:bg-white rounded-full"></div>
            </div>
          </div>
        </div>
        <div class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
          <div class="space-y-4 sm:space-y-5">
            <ModalContentItem>
              <template #title>Numero de documento</template>
              <template #content>{{ clientData.registrationNumber }}</template>
            </ModalContentItem>
            <ModalContentItem>
              <template #title>Tipo de Cliente</template>
              <template #content>{{ formatClientType(clientData.type as ClientType) }}</template>
            </ModalContentItem>
            <ModalContentItem>
              <template #title>Credito</template>
              <template #content>{{ clientData.allowCredit }}</template>
            </ModalContentItem>
            <ModalContentItem>
              <template #title>Fecha de Creación</template>
              <template #content>{{ formatDateCustom(clientData.createdAt) }}</template>
            </ModalContentItem>
            <ModalContentItem>
              <template #title>Fecha de Actualización</template>
              <template #content>{{ formatDateCustom(clientData.updatedAt) }}</template>
            </ModalContentItem>
          </div>
        </div>
        <ModalSpecialContentItem>
          <template #title>Notas</template>
          <template #content>{{ clientData.notes }}</template>
        </ModalSpecialContentItem>
        <div
          v-if="clientData.emails && clientData.emails.length > 0"
          class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-100 dark:border-gray-700 shadow-sm"
        >
          <div class="flex items-center gap-3 mb-4 sm:mb-6">
            <Mail class="h-5 w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
            <span class="font-semibold text-lg text-gray-900 dark:text-white">Emails ({{ clientData.emails.length }})</span>
          </div>
          <div class="space-y-3">
            <div class="space-y-2">
              <div
                v-for="(emailItem, index) in clientData.emails"
                :key="index"
                class="group hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-xl p-3 sm:p-4 transition-all duration-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
              >
                <p class="text-gray-800 dark:text-gray-200">
                  {{ emailItem.email }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="clientData.phones && clientData.phones.length > 0"
          class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-100 dark:border-gray-700 shadow-sm"
        >
          <div class="flex items-center gap-3 mb-4 sm:mb-6">
            <Phone class="h-5 w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
            <span class="font-semibold text-lg text-gray-900 dark:text-white">Teléfonos ({{ clientData.phones.length }})</span>
          </div>
          <div class="space-y-3">
            <div class="space-y-2">
              <div
                v-for="(phoneItem, index) in clientData.phones"
                :key="index"
                class="group hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-xl p-3 sm:p-4 transition-all duration-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
              >
                <p class="text-gray-800 dark:text-gray-200">
                  {{ phoneItem.phone }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="clientData.addresses && clientData.addresses.length > 0"
          class="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-100 dark:border-gray-700 shadow-sm"
        >
          <div class="flex items-center gap-3 mb-4 sm:mb-6">
            <MapPin class="h-5 w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
            <span class="font-semibold text-lg text-gray-900 dark:text-white">Direcciones ({{ clientData.addresses.length }})</span>
          </div>
          <div class="space-y-3">
            <div class="space-y-2">
              <div
                v-for="(address, index) in clientData.addresses"
                :key="index"
                class="group hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-xl p-3 sm:p-4 transition-all duration-200 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
              >
                <p class="text-gray-800 dark:text-gray-200">
                  {{ address.address }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ModalDetail>
</template>

<script setup lang="ts">
import { formatDateCustom } from '@/utils/';
import { ModalContentItem, ModalDetail, ModalSpecialContentItem, ModalTitleModal } from '@/components/';
import { Mail, MapPin, Phone } from 'lucide-vue-next';
import { Client, ClientType, formatClientType } from '@/views/clients/';

defineProps<{
  isOpen: boolean;
  clientData: Client | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const handleCloseModal = () => {
  emit('close');
};
</script>
