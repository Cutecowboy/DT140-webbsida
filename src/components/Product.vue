<template>

    <div class="col">
    <RouterLink :to="`/productinfo/${product.id}`" class="noLink">
        <div class="card" >
            <div class="ratio-1x1">

                <img v-if="assignPhoto(product.photo_id, this.photos) !== null" :src="this.imagePath" :alt="'Bild av märket ' + product.name" class="card-img-top">
                <img v-else :src="'../src/assets/def.png'">
            </div>

            <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <h6 class="card-subtitle">{{ product.price + " kr" }}</h6>
                <p v-if="product.description.length < 80" class="card-text">{{ product.description }}</p>
                <p v-else class="card-text">{{product.description.slice(0,80) + "...."}}</p>
                <div v-if="roleId() == '1'">
        
                    <RouterLink :to="`/editProduct/${product.id}`">
                        <button class="btn btn-warning mt-3">Redigera</button>
                    </RouterLink>
                    <button @click="deleteGame(product.id)" class="btn btn-danger mt-3 ms-3">Ta bort</button>



                </div>
            </div>
        </div>
    
   
 

    </RouterLink>
</div>
</template>

<script>
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
        },
        
        assignPhoto(prodId, photos){
            photos.forEach(async p => {
                if(prodId == p.id){
                    // found id, now search on laravel
                    
                    const resp = await fetch("http://127.0.0.1:8000/api/showPhoto/" + p.img1);
                    if(resp.status == 200){
                        return this.imagePath= "http://127.0.0.1:8000/api/showPhoto/" + p.img1;

                    } else return null;


                } else { 
                    return null
                }
            });

        },
        roleId(){
            return sessionStorage.getItem("roleId");
        },
        async deleteGame(id){
            if(confirm("Är du säker på att du vill ta bort produkten?")){
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
        async bookStatus(id){
            const resp = await fetch("http://127.0.0.1:8000/api/book/" + id, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            }
            });
            const data = await resp.json()

            if(data.status === 1){
                return true;
            } else return true;
             

        },
        async editBooking(id){
            // prompt user to make choice of booking
            if(confirm("Är du säker på att du vill avboka bokningen?")){
                // fetch username info via API token, API calling or via sessionStorage
                let userId = sessionStorage.getItem("userId");
          
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
                        "Authorization": `Bearer ${sessionStorage.getItem("APITOKEN")}`
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
<style scoped>
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