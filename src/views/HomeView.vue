<template>
  <div class="w-100 image-container d-flex align-items-center" style="height: 100vh;">
    <div class="p-5">
      <h1 class="text-light title">IMPULSA TU ESTILO</h1>
      <h2 class="display-6 subtitle" style="color: gray;">con nuestros productos</h2>
          <RouterLink :to="{name: 'shop'}" class="btn btn-dark mt-3 px-4">Explorar</RouterLink>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style>
.image-container {
  background-image: url("../../public/images/background-home.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}

.title{
  font-size: 60px;
}


@media (max-width: 765px){
  .title{
    font-size: 55px
  }
  .subtitle{
    font-size: 35px;
  }
}

</style>
