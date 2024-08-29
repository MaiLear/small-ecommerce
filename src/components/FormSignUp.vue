<template>
  <p class="text-success text-center fs-4" v-show="responseMessage">{{ responseMessage }}</p>
  <form class="row row-cols-1 row-cols-md-2  p-2 w-100" method="post" id="signupForm" style="min-width:10rem;">
    <label
      >Nombre completo<input
        class="form-control col"
        type="text"
        name="name"
        v-model="nameInput"
    /></label>
    <label
      >Apellido<input
        class="form-control col"
        type="text"
        name="surname"
        v-model="surnameInput"
    /></label>

    <label
      >Correo Electronico<input
        class="form-control col"
        type="email"
        name="email"
        v-model="emailInput"
    /></label>

    <label
      >Contraseña<input
        class="form-control col"
        type="password"
        name="password"
        v-model="passwordInput"
    /></label>

    <button type="button" class="btn btn-primary mt-4 mx-auto" value="Registrarse" @click="(e)=>handleSubtmit(e,fetchOptions,validateForm)">Registrarse</button>
  </form>
  <small class=" d-block mb-3 text-danger"  v-if="validateForm">
    Todos los campos son requeridos
  </small>


  <div class="d-flex flext-column">
    <span style="font-size: 12px;" class="text-danger" v-for="err of errors">{{ err.toString() }}</span>
  </div>
</template>

<script setup>
import { usePathStore } from "../stores/paths";
import { ref, computed } from "vue";
import { handleSubtmit } from "@/composables/form";

const registerPath = ref(usePathStore().backendPaths.customer.customerPath);
const nameInput = ref("");
const surnameInput = ref("");
const emailInput = ref("");
const passwordInput = ref("");
const responseMessage = ref("");

const errors = ref({});


const fetchOptions = {
  route: registerPath.value,
  key: "register",
  fetchOptions: {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: "",
  },
  success: (response) => {
    console.log(response);
    nameInput.value = '';
    surnameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';

    responseMessage.value = response;

    setTimeout(()=>{
      responseMessage.value = false;
    },3000)
  },
  error: (err) => {
    errors.value = err.errors;
  },
};



const validateForm = computed(() => {
  return nameInput.value &&
    surnameInput.value &&
    emailInput.value &&
    passwordInput.value
    ? false
    : true;
});


</script>

<style></style>
