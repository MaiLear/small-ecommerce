<template>
<Menu/>


<div class="w-100" style="height: 86.9vh">
<slot name="main"></slot>
</div>

</template>

<script setup>
import Menu from '@/components/Menu.vue'
import {RouterView} from 'vue-router'
</script>