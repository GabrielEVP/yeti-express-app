<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-50 flex items-center justify-center px-4">
    <DangerAlert :show="showError" :message="alertMessage" />
    <div class="relative max-w-md w-full bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl border border-white/20">
      <div class="p-8">
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16">
            <img :src="logo" alt="Logo" class="w-14 h-14 rounded-xl shadow-xl" />
          </div>
          <h2 class="text-3xl font-bold text-gray-800 mb-2">Bienvenido a Yeti Express</h2>
          <p class="text-gray-600 text-sm">
            {{ isLogin ? 'Accede a tu cuenta' : 'Crea tu Cuenta' }}
          </p>
        </div>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-5">
            <div v-if="!isLogin" class="transform transition-all duration-300 ease-in-out">
              <FieldForm label="Nombre Completo" id="name" v-model="form.name" type="text" placeholder="Ingresa tu nombre completo" required />
            </div>
            <FieldForm label="Email" id="email" v-model="form.email" type="email" placeholder="tu@email.com" required />
            <FieldForm label="Contraseña" id="password" v-model="form.password" type="password" placeholder="••••••••" required />
            <button
              type="submit"
              :disabled="isLoading"
              class="group relative w-full flex justify-center items-center py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus:ring-4 focus:ring-blue-500/25"
            >
              <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center">
                <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>

              <span :class="{ 'opacity-0': isLoading }" class="flex items-center">
                {{ isLogin ? 'Iniciar Sesión' : 'Crear Cuenta' }}
                <svg
                  class="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
            </button>
          </div>
        </form>
        <div class="mt-8 text-center">
          <button
            @click="toggleForm"
            class="relative text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 ease-in-out group"
          >
            <span class="relative z-10">
              {{ isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? ' }}
              <span class="text-blue-600 group-hover:text-blue-700">
                {{ isLogin ? 'Regístrate' : 'Inicia sesión' }}
              </span>
            </span>
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import logo from '@/assets/yeti.webp';
import { useRouter } from 'vue-router';
import { FieldForm, DangerAlert } from '@/components/';
import { login as loginService, register as registerService } from '@/views/users';
import { useAuthStore } from '@views/auth/store/Auth';
import { useAlert } from '@/composables/';

const router = useRouter();
const isLogin = ref(true);
const isLoading = ref(false);
const authStore = useAuthStore();
const { showError, alertMessage, triggerError } = useAlert();

const form = reactive({
  name: '',
  email: '',
  password: '',
});

function toggleForm() {
  isLogin.value = !isLogin.value;
  form.name = '';
  form.email = '';
  form.password = '';
}

async function handleSubmit() {
  try {
    isLoading.value = true;

    let response;
    if (isLogin.value) {
      response = await loginService(form.email, form.password);
    } else {
      response = await registerService(form.name, form.email, form.password);
    }

    if (response?.access_token && response?.user) {
      authStore.setAccessToken(response.access_token);
      authStore.setUser(response.user, response.type);
    }

    if (response.type == 'user') {
      router.push('/home');
    } else if (response.type == 'employee') {
      router.push('/deliveries');
    }
  } catch (error: any) {
    if (error.response) {
      triggerError(error.response.data.message || 'Error en la autenticación');
    } else {
      triggerError('Error en la autenticación');
    }
  } finally {
    isLoading.value = false;
  }
}
</script>
