import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useCustomerStore = defineStore('customer',()=>{
    const customer = ref({});

    const setCustomer=(key,newCustomer)=>{
        // customer.value = newCustomer;
        const formatCustomer = JSON.stringify(newCustomer);
        localStorage.setItem(key,formatCustomer)

    }

    const getCustomer =(key)=>{
        const foundCustomer = localStorage.getItem(key);
        if(!foundCustomer) return false;
        const formatCustomer = JSON.parse(foundCustomer);
        customer.value = formatCustomer;
        return customer.value;
    }

    return {setCustomer,getCustomer}
})