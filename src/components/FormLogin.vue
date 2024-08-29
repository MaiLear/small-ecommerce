<template>
  <form  class="row row-cols-1 gap-2 p-4 w-100" method="post">
    <label>
      Correo
      <input
        type="email"
        class="form-control"
        placeholder="Ingrese su correo"
        name="email"
        v-model="emailInput"
      />
    </label>
    <label>
      Contraseña
      <input
        type="password"
        class="form-control"
        placeholder="Ingrese su contraseña"
        name="password"
        v-model="passwordInput"
      />
    </label>
    <button type="button" class="btn btn-success" @click="(e)=>handleSubtmit(e,fetchOptions,validateForm)">Iniciar sesion</button>
    <small class="text-danger d-block mb-3" v-if="validateForm">Todos los campos son requeridos</small>

    <div class="d-flex flext-column">
    <small class="text-danger" v-for="err of errors">{{ err.toString() }}</small>
  </div>

    <RouterLink class="text-center" :to="{ name: 'signup' }"
      >Registrate</RouterLink
    >
  </form>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { ref, computed } from "vue";
import { usePathStore } from "@/stores/paths";
import { handleSubtmit } from "../composables/form.js";
import router from "@/router/index.js";
import { useAuthStore } from "@/stores/auth.js";
import { useCustomerStore } from "@/stores/customer.js";

const loginPath = ref(usePathStore().backendPaths.customer.login);
const authStore = useAuthStore();
const customerStore = useCustomerStore();
const emailInput = ref('');
const passwordInput = ref('');

const errors = ref({});


const fetchOptions = {
  route: loginPath.value,
  key: "login",
  fetchOptions: {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: "",
  },
  success: (response) => {
    const token = response.access_token;
    const user =  response.user;
    authStore.setToken('token',token);
    customerStore.setCustomer('customer',user);
    router.push({name: 'shop'})

  },
  error: (err) => {
    console.log(err);
    errors.value = err.errors;  
  },
};


const validateForm = computed(()=>{
  
  return emailInput.value && passwordInput.value ? false : true;
})

</script>

<style></style>
