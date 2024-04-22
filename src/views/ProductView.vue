<script>
import Product from '../components/Product.vue';

export default {
    components: {
        Product,
    },  
    data() {
        return {
            products: [],
            photos: []

        }
    },
    methods: {
        async getProducts(){
            const resp = await fetch("http://127.0.0.1:8000/api/product");
            const data = await resp.json(); 

            this.products = data;
            console.log(data);
        },
        async getPhotos(){
            const resp = await fetch("http://127.0.0.1:8000/api/photo");
            const data = await resp.json(); 

            this.photos = data;
            console.log(data);
        },


        deleteProduct(id){
            console.log(id)

            // gör ajax anrop och ta bort den med den givna id'n 

            /* const resp = await fetch("LÄNK/" + id, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }
            });
            
            const data = await resp.json();

            this.getTodos();
            */

        }
    },
    mounted() {
        this.getProducts(),
        this.getPhotos()
    }
}

</script>

<template>
    <h2>Att göra lista</h2>

    <Product v-for="product in products" :product="product" :key="product.id" :photos="photo"/>

<!--     <Addtodo @todoAdded="getTodos()" /> -->
</template>

<style scoped>
h2 {
    text-align: center;
    font-size: 2em;
}
</style>