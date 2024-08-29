<template>
  <header>
    <nav
      :class="
        handleDropdown
          ? 'w-100 d-flex justify-content-between align-items-center text-light bg-dark'
          : 'w-100 d-flex justify-content-end text-light bg-dark'
      "
      style="max-height: 80px;"
    >
      <div class="dropdown" v-show="handleDropdown">
        <button
          class="btn btn-secondary dropdown-toggle ms-3"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ customerFullName }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><button class="dropdown-item" @click="authStore.logout()">Logout</button></li>
        </ul>
      </div>
      <ul class="list-unstyled d-flex align-items-center h-100 me-4">
        <li class="nav-item p-4">
          <RouterLink class="nav-link" :to="{name: 'home'}">Inicio</RouterLink>
        </li>
        <li class="nav-item p-4">
          <RouterLink class="nav-link" :to="{ name: 'shop' }">Tienda</RouterLink>
        </li>
        <li>
          <RouterLink
            class="btn"
            v-show="!handleDropdown"
            :to="{ name: 'login' }"
            style="background-color: mediumslateblue"
          >
            Iniciar sesion
          </RouterLink>
        </li>
      </ul>
    </nav>

  </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { computed, ref } from "vue";
import { useCustomerStore } from "@/stores/customer";
import { useAuthStore } from "@/stores/auth";

const customerStore = ref(useCustomerStore());
const authStore = ref(useAuthStore());
const token = ref('');
let customerFullName = ref("");

const handleDropdown = computed(() => {
  token.value = authStore.value.getToken('token');
  

  if (!token.value) return false;
  
  const customer = customerStore.value.getCustomer('customer');
  customerFullName.value = `${customer.name} ${customer.surname}`;

  return true;
});
</script>

<style></style>
