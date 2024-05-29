<template>

<!-- not ADMIN -->
<div v-if="roleId() !== '1'">

    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 ">
                <div class="row mb-3">
                    <div class="col-12">
                        <h2>{{Product.name}}</h2>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-12">
                        <h5 class="text-muted">Märke: {{Product.brand}}</h5>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-12">
                        <h4 class="text-success">{{Product.price}} SEK</h4>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-12">
                        <p>{{Product.description}}</p>
                    </div>
                </div>
                <div class="row">

<!-- Large Image -->
<div class="col-12 mb-4 big">
    <a :href="getPath(0, this.Photo.id)"  data-lightbox="gallery">
        <img :src="getPath(0, this.Photo.id)" :alt="'Image 1'" class="img-fluid">
        </a>                </div>
</div>
<div class="row">
<!-- First Small Image -->
<div class="col-6 small">
    <a :href="getPath(1, this.Photo.id)"  data-lightbox="gallery">
        <img :src="getPath(1, this.Photo.id)" :alt="'Image 2'" class="img-fluid">
        </a>                </div>
<!-- Second Small Image -->
<div class="col-6 small">
    <a :href="getPath(2, this.Photo.id)"  data-lightbox="gallery">
        <img :src="getPath(2, this.Photo.id)" :alt="'Image 3'" class="img-fluid">
        </a>                


</div>
</div>

    
            </div>
        </div>
    </div>


    


 


    
</div>
<div v-else>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 ">
                <div class="row mb-3">
                    <div class="col-12">
                        <h2>Administrera produkten: {{ Product.name }}</h2>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-12">
                        <h5 class="text-muted">Märke: {{Product.brand}}</h5>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-12">
                        <h4 class="text-success">{{Product.price}} SEK</h4>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-12">
                        <h4 class="text-danger" v-if="bookStatus(this.Product.book_id)">Bokad</h4>
                        <h4 class="text-success" v-else>Bokningsbar</h4>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col-12">
                        <p>{{Product.description}}</p>
                    </div>
                </div>
                <div class="row">

                    <!-- Stora Image -->
                    <div class="col-12 mb-4 big">
                        <a :href="getPath(0)"  data-lightbox="gallery">
                            <img :src="getPath(0)" :alt="'Image 1'" class="img-fluid">
                            </a>                </div>
                    </div>
                    <div class="row">
                    <!-- lilla Image -->
                    <div class="col-6 small">
                        <a :href="getPath(1)"  data-lightbox="gallery">
                            <img :src="getPath(1)" :alt="'Image 2'" class="img-fluid">
                        </a>                
                    </div>
                    <!-- lilla Image -->
                    <div class="col-6 small">
                        <a :href="getPath(2)"  data-lightbox="gallery">
                            <img :src="getPath(2)" :alt="'Image 3'" class="img-fluid">
                        </a>                  
                    </div>

                </div>
            </div>
        </div>
    </div>


</div>

          
        



<div v-if="roleId() === '2'">
        <form class="mt-4" @submit.prevent="bookProduct(this.Product.book_id)">
    
        <input  v-if="bookStatus(this.Product.book_id)" type="submit" class="btn btn-success mt-3" id="boka" value="Reservera">
        <button type="button" class="btn btn-danger" id="avbokning" @click="unbook(this.Product.book_id)">Avboka</button>
        <button type="button" class="btn btn-success btn-lg" disabled id="avboka">Reserverad</button>

        </form>

    
</div>

<div v-else-if="roleId() === '1'">

    <div class="mb-4">
        <div>
            <RouterLink :to="`/editProduct/${Product.id}`">
            <button class="btn btn-warning mt-3">Redigera</button>
            </RouterLink>
            <button @click="deleteGame(Product.id)" class="btn btn-danger mt-3 ms-3">Ta bort</button>

        </div>

</div>
<div>
    <form v-if="bookStatus(this.Product.book_id) == true" @submit.prevent="editBooking(this.Product.book_id)">
    <label for="">Denna produkt är bokad</label><br>
        
    <input type="submit" class="btn btn-danger mt-3" value="Avboka bokningen">
    </form>
</div>   
</div>
<div class="mt-3" v-else>
    <a href="/login">Logga in för att boka</a>
</div>






</template>

<script>

export default{
    data() {
        return {
            photos: ['def.png', 'def.png', 'def.png'],
             id: this.$route.params.id,
             photo_id: 0,
             enlargedImgSrc: ''
         }
    },

    props:{
        Product: Object,
        Photo: Object
    },
    methods: {
        async bookProduct(id){
            // prompt user to make choice of booking
            if(confirm("Är du säker på att du vill boka produkten?")){
                // fetch username info via API token, API calling or via sessionStorage
                let userId = sessionStorage.getItem("userId");
                console.log(userId, "my userID")

             

                // check that user has to be logged in as a user before booking
                if(sessionStorage.getItem("roleId") == '2'){
                            

                // book body, set status to booked via status = 1, send userid 
                let bookBody = {
                    status: 1,
                    user_id: userId
                }

                // send query
                const resp = await fetch("http://127.0.0.1:8000/api/book/" + id, {

                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(bookBody)
                });

                const data = await resp.json()
                if (resp.status === 200) {
                        document.getElementById("message").innerHTML = "Du har nu bokat produkten!";
                        document.getElementById("message").style.display = "block";
                        setTimeout(this.timer, 10000);
                    } else {
                        document.getElementById("message").innerHTML = "Något gick fel vid bokningen, testa igen!"
                        document.getElementById("message").style.display = "block";
                        setTimeout(this.timer, 10000);
                    }
            } else {
                console.log("user is not logged in!")
            }
        }
        

        },
        async editBooking(id){
            // prompt user to make choice of booking
            if(confirm("Är du säker på att du vill avboka bokningen?")){
                // fetch username info via API token, API calling or via sessionStorage
                let userId = sessionStorage.getItem("userId");
                console.log(userId, "my userID")
          
                // book body, set status to booked via status = 1, send userid 
                let bookBody = {
                    status: 0,
                    user_id: userId
                }

                // send query
                const resp = await fetch("http://127.0.0.1:8000/api/book/" + id, {

                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(bookBody)
                });

                const data = await resp.json()
                if (resp.status === 200) {
                        document.getElementById("message").innerHTML = "Du har nu avbokat produkten!";
                        document.getElementById("message").style.display = "block";
                        setTimeout(this.timer, 10000);
                    } else {
                        document.getElementById("message").innerHTML = "Något gick fel vid bokningen, testa igen!"
                        document.getElementById("message").style.display = "block";
                        setTimeout(this.timer, 10000);
                    }
            
        }     
        },    

      

        getPath(i){
            this.photos[0] = this.Photo.img1
            this.photos[1] = this.Photo.img2
            this.photos[2] = this.Photo.img3

            return "http://127.0.0.1:8000/api/showPhoto/" + this.photos[i];
        },
        timer() {
            document.getElementById("message").style.display = "none";
        },
        roleId(){
            console.log(sessionStorage.getItem("roleId"))
            return sessionStorage.getItem("roleId");
        },
        async bookStatus(id){
            console.log("bokningsstatus", id)
            if(id != undefined){
            const resp = await fetch("http://127.0.0.1:8000/api/book/" + id, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            }
            });
            if(resp.status != 404){
                const data = await resp.json()
                console.log(data.status)
                if(data.status == 1){
                    if(data.user_id == sessionStorage.getItem("userId")){
                        console.log("min bokning");
                        document.getElementById("boka").style.display = "none";
                        document.getElementById("avboka").style.display = "none";

                        return true;
                    } else {
                    console.log("returnerar sant")
                    if(sessionStorage.getItem("roleId") != "1"){

                    document.getElementById("boka").style.display = "none";
                    }
                        return true;
                    }
                } else 
                {
                    console.log("returnerar falskt")
                    if(sessionStorage.getItem("roleId") != "1"){
                    document.getElementById("avboka").style.display = "none";
                    document.getElementById("avbokning").style.display = "none";
                    }

                    return false;
                }
            }
            }

        },
        async deleteGame(id){
            if(confirm("Är du säker på att du vill ta bort produkten?")){
                console.log("du tar bort")
                const resp = await fetch("http://127.0.0.1:8000/api/product/" + id, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("APITOKEN")}`
            }
            });

            if(resp.status === 200){
                this.$router.push('/product?message=1');
            } else {
                document.getElementById("message").innerHTML = "Något gick fel när spelet skulle tas bort!";
                document.getElementById("message").style.display = "block";
                setTimeout(this.timer, 10000);
            }

            }
        },
        async checkItem(id){
            const resp = await fetch("http://127.0.0.1:8000/api/product/" + id);
            if(resp.status == 404){
                window.location.href = "/?message=7"
            } 

        },
        async unbook(id){
            if(confirm("Är du säker på att du vill avboka produkten?")){
                let bookBody = {
                    status: 0,
                    user_id: 0
                }
                const resp = await fetch("http://127.0.0.1:8000/api/book/" + id, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("APITOKEN")}`
            },
            body: JSON.stringify(bookBody)
            });

            if(resp.status === 200){
            window.location.href = "/bookings?message=1"            
            } else {
                document.getElementById("message").innerHTML = "Något gick fel när spelet skulle tas bort!";
                document.getElementById("message").style.display = "block";
                setTimeout(this.timer, 10000);
            }

            }
        }
  

        /* timer() {
        document.getElementById("message").style.display = "none";
        } */
    
    },
    mounted(){
        this.checkItem(this.id)
    }
}
</script>
<style scoped>
        .small{
            max-width: 200px;

        }
        .ratio-1x1 {
            position: relative;
            width: 100%;
            padding-bottom: 100%; /* 1:1 Aspect Ratio */
        }
        .ratio-1x1 img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover; /*  ensure image cover the container without error */
            
        }

</style>