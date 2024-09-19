<template>
  <div class="container mt-5">
    <h1>{{ products.length > 0 ? 'Nuestros Productos' : 'No hay productos para mostrar' }}</h1>
    <hr>
    <div class="container">
      <button type="button" class="btn btn-info" @click="newProduct()">Crear Producto</button>
    </div>
    <div class="row align-items-start mt-4" v-if="!show_form">
      <div class="col-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card product">
          <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <p class="card-text">{{ item.description }}</p>
            <h6>Precio: <strong>{{ item.price }}</strong></h6>
            <h6>Cantidad: <strong>{{ item.stock }}</strong></h6>
            <div class="actions">
              <a href="#" class="btn btn-primary" @click.prevent="editProduct(item)">Editar</a>
              <a href="#" class="btn btn-danger" @click.prevent="deleteProduct(item.id)">Eliminar</a>
            </div>
          </div>
          <RouterLink class="btn btn-outline-dark see-more" :to="{name: 'product', params: { id: item.id }}">
            Ver
          </RouterLink>          
        </div>
      </div>      
    </div>    
    <FormProduct v-if="show_form" :product="product" :action="action" @create_product="createProduct(product)" @update_product="updateProduct(product)" @cancel_form="cancelForm()"/>
  </div>
</template>

<script lang="ts">    
    import Swal from 'sweetalert2/dist/sweetalert2.js'
    import 'sweetalert2/src/sweetalert2.scss'
    import { 
      listProducts, 
      updateProduct, 
      deleteProduct, 
      createProduct } 
    from '../services/product';
    import FormProduct from '../components/FormProduct.vue';
    export default{
      components: {FormProduct},
      props:[],
      data(){
        return {
          products: [],
          product: {},
          show_form: false,
          action: 'new'
        }
      },
      async created(){
        var loader = this.$loading.show({});
        await this.listProducts();
        loader.hide();
      },
      methods : {
        async listProducts(){          
          const resp= await listProducts();
          if(resp.success){
            this.products= resp.data
          }else{          
            this.messageError(resp);
          }          
        },
        async deleteProduct(id: number){
          const respSwal= Swal.fire({  
              icon: 'question',
              html: `<h2>¿Está seguro de eliminar este producto?</h2>`, 
              showCancelButton: true,
              cancelButtonText: 'Cancelar',
              confirmButtonText: 'Aceptar',              
              confirmButtonColor: '#0d6efd'
          }).then((result: any) => {
            if (result.isConfirmed) {
              this.confirmDelete(id);
            }
          });
        },
        async confirmDelete(id: number){
          let loader = this.$loading.show({});
          const resp= await deleteProduct(id);
          if(resp.success){
            this.$toast.success(resp.message);
            await this.listProducts();
          }else{          
            this.messageError(resp);
          }	            
          loader.hide();
        },
        newProduct(){
          this.action= 'new';
          this.show_form= true;
          this.product= {};
        },
        editProduct(item: {}){
          this.product= item;
          this.action= 'update';
          this.show_form= true;
        },
        async cancelForm(){
          this.show_form= false;
          if(this.action == 'update'){
            await this.listProducts();
          }
        },
        async createProduct(product: any){
          let loader = this.$loading.show({});
          const resp= await createProduct(product);
          if(resp.success){
            this.$toast.success(resp.message);
            await this.listProducts();
            this.show_form= false;
          }else{
            this.messageError(resp);
          }          
          loader.hide();
        },
        async updateProduct(product: any){          
          let loader = this.$loading.show({});
          const resp= await updateProduct(product, product.id);
          if(resp.success){
            this.$toast.success(resp.message);
            await this.listProducts();
            this.show_form= false;
          }else{          
            this.messageError(resp);
          }	          
          loader.hide();
        },
        messageError(response: any){
          if(response.data){
            let message= '';
            Object.keys(response.data).forEach(function(item){
              message += '<h6>' + response.data[item][0] + '</h6>';
            });
            Swal.fire({
                title: response.message,
                html: message,
                icon: 'error',
                confirmButtonText: 'Cerrar',
                confirmButtonColor: '#0d6efd'
            });
          }else{
            this.$toast.error(response.message);
          }
        }
      }
    }
</script>

