<template>
<div class="card w-100">
    <img :src="cardImage" alt="producto" class="card-img-top w-100 h-100">
    <div class="card-body">
        <h6>{{ props.product.name }}</h6>
        <span>⭐⭐⭐⭐⭐</span>
        <span class="text-success d-block">{{ props.product.price }}</span>
    </div>
    <div class="card-footer">
        <RouterLink :product="props.product" class="btn btn-primary" :to="{name: 'product', params: {id:props.product.id}}">Comprar</RouterLink>
    </div>
</div>
</template>

<script setup>
import {defineProps, defineEmits,ref, onMounted} from 'vue'
import { usePathStore } from '@/stores/paths';

const pathStore = usePathStore();
const basePath = ref(pathStore.path);
const cardImage = ref('');



const props = defineProps({
    product:{
        require: true,
    }
})



const emits = defineEmits();

onMounted(()=>{
    cardImage.value = `${basePath.value}${props.product.image}`
    
})




</script>


<style>
</style>