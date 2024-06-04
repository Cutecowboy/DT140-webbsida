<template>
    <img src="../assets/def.png" alt="">
</template>

<script>
export default {
    data(){
        photos: []
    },
    methods: {
        async getPhotos(){
            const resp = await fetch("http://127.0.0.1:8000/api/photo");
            const data = await resp.json(); 

            this.photos = data;
        }

    },
    mounted(){
        this.getPhotos();
    }
}


</script>