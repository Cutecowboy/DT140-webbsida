<template>

<!-- if user or not logged in -->
<div v-if="roleId() !== '2'">


    <h1>hej</h1>
    <p>asd</p>
    <h2>{{ Product.name }}</h2>
    <div> {{ Product.name }}
    <p>{{Product.brand}}</p>
    <p>{{ Product.description }}</p>
    <p>{{ Photo.img1 }}</p>
    </div>
</div>
<div v-else>
    <h1>Administrera produkten: {{ Product.name }}</h1>
    <p>{{Product.brand}}</p>
    <p>{{ Product.description }}</p>
    p
</div>

    <div>
        <VueCarousel>
      
        <img :src="'../src/assets/' + Photo.img1" alt="Image 1">
        <!-- <img :src="'../src/assets/' + Photo.img2" alt="Image 2">
      
        <img :src="'../src/assets/' + Photo.img3" alt="Image 3"> -->
        </VueCarousel>
    </div>

<div v-if="roleId() === '1'">

    <form @submit.prevent="bookProduct(Product.book_id)">
    
    <input type="submit" class="btn btn-success mt-3" value="Reservera">
    </form>
</div>

<div v-else-if="roleId() === '2'">

    <div class="mb-4">
        <div>
            <RouterLink :to="`/editProduct/${Product.id}`">
            <button class="btn btn-warning mt-3">Redigera</button>
            </RouterLink>
            <button @click="deleteGame(Product.id)" class="btn btn-danger mt-3 ms-3">Ta bort</button>

        </div>

</div>
    <form v-if="bookStatus(Product.id)" @submit.prevent="editBooking(Product.book_id)">
    <label for="">Denna produkt är bokad</label><br>
        
    <input type="submit" class="btn btn-danger mt-3" value="Avboka bokningen">
    </form>

    

</div>





</template>

<script>
import { VueCarousel } from 'vue-carousel';

export default{
    components: {
        VueCarousel
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
                if(sessionStorage.getItem("roleId") == '1'){
                            

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
                        document.getElementById("message").innerHTML = "Du har nu avbokat produkten!";
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
        timer() {
            document.getElementById("message").style.display = "none";
        },
        roleId(){
            console.log(sessionStorage.getItem("roleId"))
            return sessionStorage.getItem("roleId");
        },
        async bookStatus(id){
            const resp = await fetch("http://127.0.0.1:8000/api/book/" + id, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            }
            });
            const data = await resp.json()

            if(data.status == 1){
                return true;
            } else return false;

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
                this.$router.push('/product?message=10');
            } else {
                document.getElementById("message").innerHTML = "Något gick fel när spelet skulle tas bort!";
                document.getElementById("message").style.display = "block";
                setTimeout(this.timer, 10000);
            }

            }
        },
        /* timer() {
        document.getElementById("message").style.display = "none";
        } */
    
    }
}
</script>