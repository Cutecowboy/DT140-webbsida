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
let urlParam = new URLSearchParams(window.location.search)

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
            message: urlParam.get("message")
        }
    },
    methods: {
        async getProducts(){
            const resp = await fetch("http://127.0.0.1:8000/api/product");
            const data = await resp.json(); 

            this.products = data;
        },
        async getPhotos(){
            const resp = await fetch("http://127.0.0.1:8000/api/photo");
            const data = await resp.json(); 

            this.photos = data;
        },
        async getBooking(){
            const resp = await fetch("http://127.0.0.1:8000/api/search/book/" + sessionStorage.getItem("userId"));
            
            if(resp.status != 404){
                
            
                const data = await resp.json(); 

                this.bookings = data;
                
                
                // if any bookings
                if(data.length > 0){
                    await this.getProducts();
                    await this.getPhotos();
                    
                    for (let i = 0; i < this.products.length; i++) {
                        for (let j = 0; j < data.length; j++) {
                            if(this.products[i].book_id == data[j].id){
                            this.prod.push(this.products[i]);
                        }
                        }
                        
                        
                    }



                }
            }
        },
        restrict(){
        if(sessionStorage.getItem('roleId') !== '2'){
            window.location.href = "/?message=6";
        }
    },
    checkMessage(message) {
            if ((message !== undefined) && (message !== null)) {
                if(message == 1){
                    document.getElementById("message").innerHTML = "Du har nu avbokat produkten!";
                    document.getElementById("message").style.display = "block";
                    setTimeout(this.timer, 10000);
                }
            }

        },
    breadcrumb() {
            document.getElementById("breadcrumbs").innerHTML = `
            <li class="breadcrumb-item"><a href="/">Hem</a></li>
            <li class="breadcrumb-item active">Bokningar</li>
            `
        },
        title() {
      document.getElementById("title").innerHTML = "Lampshopen Vintage - Bokningar"
    }
    
    },
    mounted(){
        this.restrict();
        this.getBooking();
        this.breadcrumb();
        this.title();
        this.checkMessage(this.message)

    }
}

</script>