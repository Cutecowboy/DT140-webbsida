<template>
    <RouterLink :to="`/productinfo/${product.id}`" class="noLink">
    <h2>{{ product.name }}</h2>
    <div> {{ product.name }}
    <p>{{product.brand}}</p>
    <p>{{ product.description }}</p>
    <img v-if="assignPhoto(product.photo_id, this.photos) !== null" :src="this.imagePath" :alt="'Bild av märket ' + product.name">
    <img v-else :src="'../src/assets/def.png'">
    <p>{{ this.imagePath }}</p>

 

    </div>
    </RouterLink>
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

        }

    },
    mounted(){
        this.getPhotos();
    }
}
</script>