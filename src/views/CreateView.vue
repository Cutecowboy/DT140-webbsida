<template>

<h1>Lägg till en produkt</h1>

<Form />
</template>


<script>
import Form from '../components/Form.vue';

export default {
    components: {
        Form
    },
    methods:{
        restrict(){
        if(sessionStorage.getItem('roleId') !== '1'){
            window.location.href = "/?message=5";
        }
    },
    breadcrumb() {
            document.getElementById("breadcrumbs").innerHTML = `
            <li class="breadcrumb-item"><a href="/">Hem</a></li>
            <li class="breadcrumb-item active">Skapa</li>
            `
        },
        title() {
      document.getElementById("title").innerHTML = "Lampshopen Vintage - Skapa"
    }
    },
    mounted(){
        this.restrict();
        this.breadcrumb();
        this.title();
    }
} 

</script>


