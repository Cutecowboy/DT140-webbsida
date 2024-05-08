<template>
    <h1>Redigera</h1>


    <form @submit.prevent="editProduct()">
    <label for="name" class="form-label">Produktnamn</label>
    <input type="text" v-model="name" class="form-control" required>

    <label for="brand" class="form-label">Produktmärke</label>
    <input type="text" v-model="brand" class="form-control" required>

    <label for="description" class="form-label">Produktbeskrivning</label>
    <input type="text" v-model="description" class="form-control" required>

    <label for="price" class="form-label">Pris</label>
    <input type="number" v-model="price" class="form-control" required>
    
    <label class='radio' v-for="(option, index) in options" :key="index">
      <input type="radio" v-model="this.status" :value="option.value">
      {{ option.label }}
    </label><br>


    <label for="category" class="form-label">Kategori</label>
    <select name="category" class="form-select" v-model="this.categoryname">
        <option v-for="category in categories" :category="category" :key="category.id">{{ category.categoryname }}</option>
    </select><br>
    <input type="file" accept="image/*" id="img1" @change="onFileSelected">
    <input type="file" accept="image/*" id="img2" @change="onFileSelected">
    <input type="file" accept="image/*" id="img3" @change="onFileSelected">

    <br>
    <input type="submit" class="btn btn-success mt-3" value="Redigera">
    </form>

    <h3>Bilder i inlägget OBS: gallery?</h3>
    <img class="img-fluid" :src="'http://127.0.0.1:8000/api/showPhoto/'+ this.photoName[0]" alt="">
    <img class="img-fluid" :src="'http://127.0.0.1:8000/api/showPhoto/'+ this.photoName[1]" alt="">
    <img class="img-fluid" :src="'http://127.0.0.1:8000/api/showPhoto/'+ this.photoName[2]" alt="">


</template>


<script>
import axios from 'axios';

export default {

    data(){
        return {
            id: null,
            name: this.name,
            brand: this.brand,
            description: this.description,
            price: this.price,
            category_id: this.category_id,
            categoryname: this.categoryname,
            book_id: this.book_id,
            photo_id: this.photo_id,
            status: 0,
            product: [],
            categories: [],
            selectedFile: [null, null, null],
            photoName: ['def.png', 'def.png', 'def.png'],      

            options: [
                {value: 0, label:'Ej Bokad / Avboka'},
                {value: 1, label:'Bokad'} 
            ]
        }
    },
    methods: {

        // get only category
        async getData(){

            const resp = await fetch("http://127.0.0.1:8000/api/product/" + this.id, { 
            method: "GET",
            headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("APITOKEN")}`
            }});

            const data = await resp.json();
            this.product = data;
            this.name = data.name;
            this.brand = data.brand;
            this.description = data.description;
            this.price = data.price;
            this.category_id = data.category_id;
            this.book_id = data.book_id;
            this.photo_id = data.photo_id;
            

            console.log(data);


            const resp1 = await fetch("http://127.0.0.1:8000/api/categories/", {
            method: "GET",
            headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("APITOKEN")}`
            }});
            const data1 = await resp1.json();
            this.categories = data1;
            data1.forEach(cat => {
                if(cat.id == this.category_id){
                    console.log(data1)
                    this.categoryname == cat.categoryname
                }
            });

            const resp2 = await fetch("http://127.0.0.1:8000/api/book/" + this.book_id, {
            method: "GET",
            headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("APITOKEN")}`
            }});

            const data2 = await resp2.json();
            this.status = data2.status;

            const resp3 = await fetch("http://127.0.0.1:8000/api/photo/" + this.photo_id, {
            method: "GET",
            headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("APITOKEN")}`
            }});   
           
            const data3 = await resp3.json();
            console.log(data3);
            this.photoName[0] = data3.img1;
            this.photoName[1] = data3.img2;
            this.photoName[2] = data3.img3;

            console.log(this.photoName);
        },
        onFileSelected(event){
            console.log(event.target.id)
            console.log(event.target.files[0].name);
            console.log(event.target.files[0])

            if(event.target.id == "img1"){
                this.selectedFile[0] = event.target.files[0];
            }
            if(event.target.id == "img2"){
                this.selectedFile[1] = event.target.files[0];
            }
            if(event.target.id == "img3"){
                this.selectedFile[2] = event.target.files[0];
            }
        },
        async editProduct(){
            // conditions for creating the product
            if((this.name.length > 2) && (this.brand.length > 2) && (this.description.length > 5) && (this.price >= 1)){

                // max 3 images upload per product (OK if no photos)
                for (let i = 0; i < 3; i++) {
                    if(this.selectedFile[i] !== null){
                        // formdata for the image(s)
                        const fd = new FormData();
                        fd.append('image', this.selectedFile[i]);
                        fd.append('filename', this.selectedFile[i].name);
                        
                        await axios.post('http://127.0.0.1:8000/api/upload/', fd, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then(response => {
                            console.log('Image uploaded successfully:', response.data);
                            this.photoName[i] = this.selectedFile[i].name;
                            console.log(this.photoName);

                        })
                    }
                    
                }

                let productBody = {
                    name: this.name,
                    brand: this.brand,
                    description: this.description,
                    price: this.price,
                    category_id: this.category_id,
                    photo_id: this.photo_id,
                    book_id: this.book_id
                };
                let bookBody 
                if(this.status == 0){
                    bookBody = {
                    status: this.status,
                    user_id: 0
                    } 
                } else {
                    bookBody = {
                    status: this.status
                    }
                }
                
                let photoBody = 
                {
                    img1: this.photoName[0],
                    img2: this.photoName[1],
                    img3: this.photoName[2]
                };


                const resp = await fetch("http://127.0.0.1:8000/api/book/" + this.book_id, {
                        method: "PUT",
                        headers: {
                            "Accept": "application/json",
                            "Content-type": "application/json",
                            "Authorization": `Bearer ${sessionStorage.getItem("APITOKEN")}`
                        },
                        body: JSON.stringify(bookBody)
                    });
                
                const resp1 = await fetch("http://127.0.0.1:8000/api/product/" + this.id, {
                        method: "PUT",
                        headers: {
                            "Accept": "application/json",
                            "Content-type": "application/json",
                            "Authorization": `Bearer ${sessionStorage.getItem("APITOKEN")}`
                        },
                        body: JSON.stringify(productBody)
                    });
                    const resp2 = await fetch("http://127.0.0.1:8000/api/photo/" + this.photo_id, {
                        method: "PUT",
                        headers: {
                            "Accept": "application/json",
                            "Content-type": "application/json",
                            "Authorization": `Bearer ${sessionStorage.getItem("APITOKEN")}`
                        },
                        body: JSON.stringify(photoBody)
                    });

                    if((resp.status == 200) && (resp1.status == 200) && (resp2.status == 200)){
                        document.getElementById("message").innerHTML = "Produkten har uppdaterats!";
                        document.getElementById("message").style.display = "block";
                        setTimeout(this.timer, 10000);
                        
                    } else {

                    document.getElementById("message").innerHTML = "Produkten kunde inte uppdateras!"
                    document.getElementById("message").style.display = "block";
                    setTimeout(this.timer, 10000);
                    }




                }
                else {
                    document.getElementById("message").innerHTML = "Produkten kunde inte uppdateras!"
                    document.getElementById("message").style.display = "block";
                    setTimeout(this.timer, 10000);
                }
                
                
                
        },
        timer() {
            document.getElementById("message").style.display = "none";
        },
        restrict(){
            if(sessionStorage.getItem('roleId') !== '2'){
            window.location.href = "/?message=2";
        }
    }

    },
    mounted(){
        this.restrict();
        this.id = this.$route.params.id;
        this.getData();
    }
    

}

</script>
