<script>
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
            photo: []

        }
    },
    methods: {
        async getProduct(id){
            const resp = await fetch("http://127.0.0.1:8000/api/product/" + id);
            const data = await resp.json(); 

            this.product = data;
            console.log(data);
        },
        async getPhoto(id){
            const resp = await fetch("http://127.0.0.1:8000/api/photo/" + id);
            const data = await resp.json(); 

            this.photo = data;
            console.log(data);
        },
    },
    mounted(){
        this.getProduct(this.query);
        this.getPhoto(this.query);
    }
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