<template>
    <h1>Bokningar</h1>

    <div v-if="bookings.length == 0">
        <p>Du har inga bokade produkter!</p>
        <a href="/product">Gå till produkterna</a>
    </div>
    <div v-else>

        <h3>Mina bokningar</h3>
        <div class="row row-cols-1 row-cols-sm-2 g-3">
        
        <Book v-for="product in prod" :product="product" :key="product.id" />
        </div>
    </div>

</template>

<script>
import Book from '../components/Book.vue';

export default{
    components: {
        Book,
    },
    data(){
        return {
            bookings: [],
            products: [],
            photos: [],
            prod: [],
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
        async getBooking(){
            const resp = await fetch("http://127.0.0.1:8000/api/search/book/" + sessionStorage.getItem("userId"));
            
            
            const data = await resp.json(); 

            if(resp.status != 404){
                this.bookings = data;
            }
            console.log(data)
            // if any bookings
            if(data.length > 0){
                await this.getProducts();
                await this.getPhotos();
                
                for (let i = 0; i < this.products.length; i++) {
                    for (let j = 0; j < data.length; j++) {
                        console.log(this.products[i].book_id)
                        if(this.products[i].book_id == data[j].id){
                        this.prod.push(this.products[i]);
                        console.log("lägg till")
                    }
                    }
                    
                    
                }



            }
            console.log(this.prod, "detta prod")
        }
    },
    mounted(){
        this.getBooking();
    }
}

</script>