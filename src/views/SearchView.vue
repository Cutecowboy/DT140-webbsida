<template>
    <h1>Sök</h1>
        <h2>hej</h2>
            <div v-for="product in products" :product="product" :key="product.id" class="col">
                <h1>hej</h1>
                <RouterLink :to="`/productinfo/${product.id}`" class="noLink">
                    <div class="card" >
                        <img :src="'../src/assets/def.png'">
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
    let urlParam = new URLSearchParams(window.location.search)
    
    export default {
     
      data() {
        return {
          products: [],
          query: urlParam.get("query"),
          photos: []

    
        }
      },
    
      methods: {
        // fetch the games in the database
        async searchProduct(query) {
          const resp = await fetch("http://127.0.0.1:8000/api/search/product/" + query, {
            method: "GET",
            headers: {
              "Accept": "application/json",
              "Content-type": "application/json",
              "Authorization": `Bearer ${sessionStorage.getItem("APITOKEN")}`
            }
          });
          const data = await resp.json();
    
          this.product = data;
          if(this.product.length == 0){
            document.querySelector('.row').innerHTML = `
            <p>Din sökning gav inga resultat!</p>
            <a href='/'>Gå tillbaka till startsidan</a>
            `
          }
          console.log(this.product)
        },
        async getPhotos(){
            const resp = await fetch("http://127.0.0.1:8000/api/photo");
            const data = await resp.json(); 

            this.photos = data;
            console.log(data);
        },
    
        // delete the game if admin presses delete message
        async deleteGame(id) {
          if (confirm("Vill du ta bort spelet?")) {
    
            let token = this.getToken();
    
            const resp = await fetch("http://127.0.0.1:8000/api/game/" + id, {
              method: "DELETE",
              headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
              }
            });
    
            if (resp.status === 200) {
              document.getElementById("message").innerHTML = "Spelet är borttagen!";
              document.getElementById("message").style.display = "block";
              setTimeout(this.timer, 10000);
              this.searchGame(this.query);
            } else {
              document.getElementById("message").innerHTML = "Något gick fel när spelet skulle tas bort!";
              document.getElementById("message").style.display = "block";
              setTimeout(this.timer, 10000);
            }
    
          };
        },
    
        // edit the game 
        async editGame(id) {
          window.location.href = "/edit?id=" + id;
        },  

        // add breadcrumbs to the page
        breadcrumb() {
          document.getElementById("breadcrumbs").innerHTML = `
          <li class="breadcrumb-item"><a href='/'>Hem</a></li>
          <li class=breadcrumb-item active>Sök</li>
          `
        },
        // message timer, after 10 seconds hide the message div 
        timer() {
          document.getElementById("message").style.display = "none";
        }
    
      },
      mounted() {
        this.breadcrumb();
        this.searchProduct(this.query);
        this.getPhotos()

      }
    }
    </script>
    
    <style>
    </style>