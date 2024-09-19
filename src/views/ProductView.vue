<template>
    <div class="container mt-5">
        <RouterLink class="btn btn-light" :to="{name: 'home' }">Regresar</RouterLink>
        <h1>{{  product.name  }}</h1>
        <div class="row align-items-start mt-4" >
            <div class="card mb-2">
                <div class="card-body">
                    {{ product.description }}
                </div>
            </div>        
            <h3>Precio <span class="badge bg-secondary">{{ product.price }}</span></h3>
            <h4>Stock <span class="badge bg-secondary">{{ product.stock }}</span></h4>
        </div>   
    </div>
</template>


<script lang="ts">
    import { showProduct } from '../services/product';
    import { useRoute } from 'vue-router';
    export default{
        props:[],
        data(){
        return {
            product: {
                name: '',
                description: '',
                price: '',
                stock: '',
            }
        }
        },
        created(){           
            const route = useRoute();
            const { id }= route.params;
            this.showProduct(id);
        },
        methods : {
            async showProduct(id){                    
                let loader = this.$loading.show({});
                const resp= await showProduct(id);
                if(resp.success){
                    this.product= resp.data
                }else{          
                    this.$toast.error(resp.message);
                } 
                loader.hide();
            }            
        }
    }
</script>
