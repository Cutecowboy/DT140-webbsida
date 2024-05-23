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
        breadcrumb() {
            document.getElementById("breadcrumbs").innerHTML = `
            <li class="breadcrumb-item"><a href="/">Hem</a></li>
            <li class="breadcrumb-item active">Produkter</li>
            `
        },
        title() {
      document.getElementById("title").innerHTML += "Produkter"
        }
        
    },
    mounted() {
        this.getProducts();
        this.getPhotos();
        this.breadcrumb();
        this.title();
    }
}

</script>

<template>
    <h1>Produkter</h1>
    <div class="row row-cols-1 row-cols-sm-2 g-3 mt-3">
        
        <Product v-for="product in products" :product="product" :key="product.id" :photos="photo"/>
    </div>
<!--     <Addtodo @todoAdded="getTodos()" /> -->
</template>

<style scoped>
h2 {
    text-align: center;
    font-size: 2em;
}
</style>