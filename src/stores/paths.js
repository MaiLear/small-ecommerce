import {ref} from 'vue'
import {defineStore} from 'pinia'

export const usePathStore = defineStore('backendPath',()=>{
    const path = ref('http://127.0.0.1:8000');
    const backendPaths = {
      customer : {
        customerPath: `${path.value}/api/customers`,
        get login(){
          return `${this.customerPath}/auth/client`
        } 
      },
      product: {
        productPath: `${path.value}/api/products`
      },
      sale:{
        salePath: `${path.value}/api/sales`
      }
    }
  
    return {path,backendPaths}
  })