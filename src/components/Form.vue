<template>
    
<form @submit.prevent="addProduct()">
    <label for="name" class="form-label">Produktnamn</label>
    <input type="text" v-model="name" class="form-control" id="name" required>

    <label for="brand" class="form-label mt-2">Produktmärke</label>
    <input type="text" v-model="brand" class="form-control" id="brand" required>

    <label for="description" class="form-label mt-2">Produktbeskrivning</label>
    <input type="text" v-model="description" class="form-control" id="description" required>

    <label for="price" class="form-label mt-2">Pris</label>
    <input type="number" v-model="price" class="form-control" id="price" required>

    <label for="category" class="form-label mt-2">Kategori</label>
    <select name="category" class="form-select" v-model="this.categoryname" id="category">
        <option v-for="category in categories" :category="category" :key="category.id">{{ category.categoryname }}</option>
    </select>
    
    <label for="img1" class="form-label mt-2">Bild 1</label><br>
    <input type="file" accept="image/*" id="img1" @change="onFileSelected"><br>

    <label for="img2" class="form-label mt-2">Bild 2</label><br>
    <input type="file" accept="image/*" id="img2" @change="onFileSelected"><br>

    <label for="img3" class="form-label mt-2">Bild 3</label><br>
    <input type="file" accept="image/*" id="img3" @change="onFileSelected"><br>

<input type="submit" class="btn btn-success mt-3" value="Lägg till">

</form>

</template>


<script>
import axios from 'axios';
export default{
    data(){
        return{
            name: this.name,
            brand: this.brand,
            description: this.description,
            price: this.price,
            category_id: this.category_id,
            categoryname: this.categoryname,
            book_id: this.book_id,
            photo_id: this.photo_id,
            categories: [],
            selectedFile: [null, null, null],
            photoName: ['def.png', 'def.png', 'def.png']       
        }
    },

    methods: {

        // get only category
        async getCategory(){
            const resp1 = await fetch("http://127.0.0.1:8000/api/categories/", {
            method: "GET",
            headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("APITOKEN")}`
            }});
            const data1 = await resp1.json();
            this.categories = data1;

        },


        async addProduct(){
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
                            this.photoName[i] = this.selectedFile[i].name;

                        })
                    }
                    
                }

                // picture are now uploaded to API, proceed to create entries in book and photo, store the assigned ID values in the data 
                let dummy = 0

                const resp = await fetch("http://127.0.0.1:8000/api/book/", {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-type": "application/json",
                            "Authorization": `Bearer ${sessionStorage.getItem("APITOKEN")}`
                        }
                    });
                // if created
                if(resp.status === 201){
                    dummy++
                    let data = await resp.text();
                    
                    // store the newly created id
                    this.book_id = JSON.parse(data).id;
                }

                // insert the uploaded files name 
                let photoBody = {
                    img1: this.photoName[0],
                    img2: this.photoName[1],
                    img3: this.photoName[2]
                };

                const resp1 = await fetch("http://127.0.0.1:8000/api/photo/", {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-type": "application/json",
                            "Authorization": `Bearer ${sessionStorage.getItem("APITOKEN")}`
                        },
                        body: JSON.stringify(photoBody)
                    });
                
                // if new created
                if(resp1.status === 201){
                    dummy++
                    let data = await resp1.text();
                    // store new id 
                    this.photo_id = JSON.parse(data).id;
                }

                // if everything went good until this part, continue creating the product 
                if(dummy == 2){
                    // get the category id based on which category was chosen on the select meny
                    this.categories.forEach(cat => {
                        if(cat.categoryname == this.categoryname){
                            this.category_id = cat.id;
                        }
                    });

                    let productBody = {
                        name: this.name,
                        brand: this.brand,
                        description: this.description,
                        price: this.price,
                        category_id: this.category_id,
                        photo_id: this.photo_id,
                        book_id: this.book_id
                    };


                    const resp2 = await fetch("http://127.0.0.1:8000/api/product/", {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-type": "application/json",
                            "Authorization": `Bearer ${sessionStorage.getItem("APITOKEN")}`
                        },
                        body: JSON.stringify(productBody)
                    });

                    if(resp2.status == 201){
                        document.getElementById("message").innerHTML = "Produkten har lagts till!";
                        document.getElementById("message").style.display = "block";
                        setTimeout(this.timer, 10000);
                        this.name = "";
                        this.brand = "";
                        this.description = "";
                        this.price = "";
                        this.category_id = "";
                        this.photo_id = "";
                        this.book_id = "";
                        this.selectedFile = [null, null, null];
                        this.photoName = ['def.png', 'def.png', 'def.png'];      


                    } else {

                        document.getElementById("message").innerHTML = "Produkten kunde inte läggas  in!"
                        document.getElementById("message").style.display = "block";
                        setTimeout(this.timer, 10000);
                    }

                }

            }
            else {
                document.getElementById("message").innerHTML = "Produkten kunde inte läggas  in!"
                document.getElementById("message").style.display = "block";
                setTimeout(this.timer, 10000);
            }




        },
        onFileSelected(event){


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
        timer() {
            document.getElementById("message").style.display = "none";
        }
    },
    mounted() {
        this.getCategory();
    }
}
</script>