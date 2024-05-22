<script>
import $ from 'jquery';
import Watch from '../components/Watch.vue';
let urlParam = new URLSearchParams(window.location.search)




export default {
    components: {
        Watch,
    },  
    data() {
        return {
            query:  window.location.href.split("/").slice(-1)[0],
            product: [],
            photo_id: 0,
            photo: []

        }
    },
    methods: {
        async getProduct(id){
            const resp = await fetch("http://127.0.0.1:8000/api/product/" + id);
            const data = await resp.json(); 

            this.product = data;
            this.photo_id = this.product.photo_id;
            console.log(this.photo_id, "photo id uppe i vyn"),
            console.log(data);
            const resp1 = await fetch("http://127.0.0.1:8000/api/photo/" + this.photo_id);
            const data1 = await resp1.json(); 

            this.photo = data1;
            console.log(data);
            this.breadcrumb();
            this.title(data.name)

        },
        
        breadcrumb() {
            document.getElementById("breadcrumbs").innerHTML = `
            <li class="breadcrumb-item"><a href="/">Hem</a></li>
            <li class="breadcrumb-item active"><a href="/product">Produkter</a></li>
            <li class="breadcrumb-item active">${this.product.name}</li>
            `
        },
        title(name) {
      document.getElementById("title").innerHTML += name
    }
        
    },
    mounted(){
        this.getProduct(this.query);
/*         this.getPhoto(this.photo_id);
 */    }
}
</script>

<template>
    <h2>Hej</h2>

    <Watch :Product="this.product" :Photo="this.photo"/>

<!--     <Addtodo @todoAdded="getTodos()" /> -->
</template>

<style scoped>
h2 {
    text-align: center;
    font-size: 2em;
}
</style>