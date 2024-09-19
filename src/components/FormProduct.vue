<template>
    <div class="form">
        <h4>{{ action == 'new' ? 'Nuevo Producto' : 'Actualizar Producto' }}</h4>
        <hr>
        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Nombre del producto</label>
            <input type="text" class="form-control" v-model="product.name">
        </div>
        <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Descripción del producto</label>
            <textarea type="text" class="form-control" rows="5" v-model="product.description"></textarea>
        </div>
        <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Precio</label>
            <input type="number" class="form-control" step="0.01" v-model="product.price">
        </div>
        <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Stock</label>
            <input type="number" class="form-control" v-model="product.stock">
        </div>
        <button type="button" class="btn btn-primary me-3" v-if="action == 'new'" @click="saveProduct()">Guardar</button>
        <button type="button" class="btn btn-primary me-3" v-else @click="updateProduct()">Actualizar</button>
        <button type="button" class="btn btn-secondary" @click="cancelForm()">Cancelar</button>
    </div>
</template>


<script lang="ts">
    import Swal from 'sweetalert2/dist/sweetalert2.js';
    import 'sweetalert2/src/sweetalert2.scss';
    export default{
        props:['product', 'action'],
        data(){
            return {
            }
        },
        mounted(){
            
        },
        methods : {
            updateProduct(){
                if(!this.validateForm()){
                    return;
                }
                this.$emit('update_product', this.product);
            },
            saveProduct(){
                if(!this.validateForm()){
                    return;
                }
                this.$emit('create_product', this.product);
            },
            cancelForm(){
                this.$emit('cancel_form');
            },
            validateForm(){
                let message= '';
                if(this.product.name == undefined || this.product.name == ''){
                    message += '<h6>El nombre es requerido</h6>';
                }

                if(this.product.description == undefined ||  this.product.description == ''){
                    message += '<h6>La descripción es requerida</h6>';
                }

                if(this.product.price == undefined){
                    message += '<h6>El precio es requerido</h6>';
                }else if(this.product.price == ''){
                    message += '<h6>El precio es requerido</h6>';
                }else if(isNaN(this.product.price) && typeof this.product.price != 'number'){
                    message += '<h6>El precio debe ser numérico</h6>';
                }else if(this.product.price < 0){
                    message += '<h6>El precio no puede ser menor que 0</h6>';
                }else if(this.product.price > 99999999.99){
                    message += '<h6>El precio no puede ser mayor que 99.999.999,99</h6>';
                }

                if(this.product.stock == undefined){
                    message += '<h6>El stock es requerido</h6>';
                }else if(isNaN(this.product.stock) && typeof this.product.stock != 'number'){
                    message += '<h6>El stock debe ser numérico</h6>';
                }else if(this.product.stock == ''){
                    message += '<h6>El stock es requerido</h6>';
                }else if(this.product.stock < 0){
                    message += '<h6>El stock no puede ser menor que 0</h6>';
                }

                if(message != ''){
                    Swal.fire({
                        title: 'Errores de validación',
                        html: message,
                        icon: 'error',
                        confirmButtonText: 'Cerrar',
                        confirmButtonColor: '#0d6efd'
                    });
                    return false;
                }

                return true;
            }
        }
    }
</script>