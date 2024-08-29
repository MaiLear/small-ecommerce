import {computed,ref} from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = ref(useAuthStore());
const token = ref('');




export const checkIfAuth = computed((key)=>{
    token.value = authStore.getToken(key);
    return !token ? false : true;
})