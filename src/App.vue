<template>
<mainLayout>
  <template v-slot:main>
    <RouterView/>
  </template>
 
</mainLayout>
</template>

<script setup> 
import mainLayout from '@/layouts/mainLayout.vue'
import {RouterView} from 'vue-router'



</script>

<style></style>
