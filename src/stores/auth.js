import {defineStore} from 'pinia'
import {ref} from 'vue'

export  const useAuthStore = defineStore('auth',()=>{
    const token = ref('')

    const setToken = (key,newToken)=>{
        localStorage.setItem(key,newToken)
        token.value = newToken;
    }

    const getToken = (key)=>{
        token.value = localStorage.getItem(key)
        return token.value
    }

    const logout =()=>{
        token.value = '';
        localStorage.clear();
    }


    return {setToken,getToken,logout}
})
