<script>
import router from '@/router';

export default class FetchService{
   constructor(){
    this.response  = [];
   }
    

    setResponse(key,value){
        this.response[key] = value;
    }

    getResponse(key){
        return this.response[key];
    }

    unauthenticated(){
        router.push({name:'login'})
    }

 

    async fetchAll(options){
        let {route,key,fetchOptions = {},success,error} = options;
        try{
            const response = await fetch(route,fetchOptions);
            const json = await response.json();
            console.log(json);
            
            
            if(response.status == 401 && !json.errors){
                this.unauthenticated()
                return;
            };
            
            if(json.errors) throw{ errors: json.errors};
            this.setResponse(key,json);
            success(this.getResponse(key));
        }
        catch(err){
            error(err);
        }
    }
}
</script>