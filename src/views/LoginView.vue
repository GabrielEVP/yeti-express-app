<template>
   <div class="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div class="max-w-md w-full bg-white shadow-md rounded-lg">
         <div class="p-6">
            <h2 class="text-2xl font-bold text-center text-gray-800 mb-8">
               {{ isLogin ? "Iniciar sesión" : "Crear cuenta" }}
            </h2>
            <form @submit.prevent="handleSubmit">
               <div class="space-y-4">
                  <div v-if="!isLogin">
                     <FieldForm label="Nombre" id="name" v-model="form.name" type="text" placeholder="Tu nombre" required />
                  </div>
                  <FieldForm label="Email" id="email" v-model="form.email" type="email" placeholder="tu@email.com" required />
                  <FieldForm label="Contraseña" id="password" v-model="form.password" type="password" placeholder="********" required />
                  <button
                     type="submit"
                     class="btn w-full bg-gray-800 hover:bg-gray-700 text-white border-2 border-gray-800 hover:border-gray-700 rounded-md py-2 transition-colors duration-300 ease-in-out font-semibold text-lg"
                  >
                     {{ isLogin ? "Iniciar sesión" : "Registrarse" }}
                  </button>
               </div>
            </form>
            <div class="mt-6 text-center">
               <a href="#" @click.prevent="toggleForm" class="text-sm text-gray-800 hover:text-gray-600 transition-colors duration-300 ease-in-out">
                  {{ isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión" }}
               </a>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { FieldForm } from "@/components/";
import { login as loginService, register as registerService } from "@/views/users";
import { useAuthStore } from "@/stores/Auth";

const router = useRouter();
const isLogin = ref(true);
const authStore = useAuthStore();

const form = reactive({
   name: "",
   email: "",
   password: "",
});

function toggleForm() {
   isLogin.value = !isLogin.value;
   form.name = "";
   form.email = "";
   form.password = "";
}

async function handleSubmit() {
   try {
      let response;
      if (isLogin.value) {
         response = await loginService(form.email, form.password);
      } else {
         response = await registerService(form.name, form.email, form.password);
      }

      if (response?.access_token && response?.user) {
         authStore.setAccessToken(response.access_token);
         authStore.setUser(response.user);
      }

      router.push("/home");
   } catch (error: any) {
      console.error("Error en autenticación:", error.response?.data || error.message);
   }
}
</script>
