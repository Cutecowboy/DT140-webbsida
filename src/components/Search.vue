<template>
    
    <div class="col">
    <RouterLink :to="`/productinfo/${product.id}`" class="noLink">
        <div class="card" >
            <img v-if="assignPhoto(product.photo_id, this.photos) !== null" :src="this.imagePath" :alt="'Bild av märket ' + product.name" class="card-img-top">
            <img v-else :src="'../src/assets/def.png'">
            <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <h6 class="card-subtitle">{{ product.price + " kr" }}</h6>
                <p class="card-text">{{ product.description }}</p>
                
            </div>
        </div>
    
   
 

    </RouterLink>
</div>
</template>

<script>
//import Photo from "../components/Photo.vue";
import axios from 'axios';
export default{
    data(){
        return {
        photos: [],
        imagePath: ""
    }
    },

    props: {
        product: Object,
    },
    methods: {
        async getPhotos(){
            const resp = await fetch("http://127.0.0.1:8000/api/photo");
            const data = await resp.json(); 

            this.photos = data;
            console.log(data);
        },
        
        assignPhoto(prodId, photos){
            photos.forEach(async p => {
                console.log(p)
                if(prodId == p.id){
                    // found id, now search on laravel
                    
                    const resp = await fetch("http://127.0.0.1:8000/api/showPhoto/" + p.img1);
                    if(resp.status == 200){
                        console.log("allt funkar")
                        return this.imagePath= "http://127.0.0.1:8000/api/showPhoto/" + p.img1;

                    } else return null;


                } else { 
                    return null
                }
            });

        },
        roleId(){
            console.log(sessionStorage.getItem("roleId"))
            return sessionStorage.getItem("roleId");
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
        async bookStatus(id){
            console.log("bokningsstatus", id)
            const resp = await fetch("http://127.0.0.1:8000/api/book/" + id, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            }
            });
            const data = await resp.json()

            if(data.status === 1){
                console.log("returnar sanningens mamma", data)
                return true;
            } else return false;

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
    },
    mounted(){
        this.getPhotos();
    }
}
</script>