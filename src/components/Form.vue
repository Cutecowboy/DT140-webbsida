<template>
    
<form @submit.prevent="addProduct()">
    <label for="name" class="form-label">Produktnamn</label>
    <input type="text" v-model="name" class="form-control" required>

    <label for="brand" class="form-label">Produktmärke</label>
    <input type="text" v-model="brand" class="form-control" required>

    <label for="description" class="form-label">Produktbeskrivning</label>
    <input type="text" v-model="description" class="form-control" required>

    <label for="price" class="form-label">Pris</label>
    <input type="number" v-model="price" class="form-control" required>

    <label for="category" class="form-label">Kategori</label>
    <select name="category" class="form-select" v-model="this.categoryname">
        <option v-for="category in categories" :category="category" :key="category.id">{{ category.categoryname }}</option>
    </select>
    <input type="file" accept="image/*" id="img1" @change="onFileSelected">
    <input type="file" accept="image/*" id="img2" @change="onFileSelected">
    <input type="file" accept="image/*" id="img3" @change="onFileSelected">

<input type="submit" class="btn btn-success mt-3" value="Lägg till">

</form>
{{ category_id }}
{{ photo_id }}
{{ book_id }}
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



        // get data of bookings, photos and categories before making a new product,
        async getData(){
            const resp = await fetch("http://127.0.0.1:8000/api/book/", {
                method: "GET",
                headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("APITOKEN")}`
                }});
            
            const resp1 = await fetch("http://127.0.0.1:8000/api/categories/", {
            method: "GET",
            headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("APITOKEN")}`
            }});
            const resp2 = await fetch("http://127.0.0.1:8000/api/photo/", {
            method: "GET",
            headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("APITOKEN")}`
            }});
            
            const data = await resp.json();
            const data1 = await resp1.json();
            const data2 = await resp2.json();


            // get the length of objects.
            let len1 = data.length;
            let len2 = data1.length;
            let len3 = data2.length;
            
            // index to find the id of the newly made booking, and photo.
            this.book_id = data[len1-1].id;
            this.category_id = data1[len2-1].id;
            this.photo_id = data2[len3-1].id;


            console.log("har utfört detta!")
        },
        async addProduct(){
            this.getData();

            for (let i = 0; i < 3; i++) {
                if(this.categories[i] !== null){
                    // formdata for the image(s)
                    const fd = new FormData();
                    fd.append('image', this.selectedFile[i]);
                    fd.append('filename', this.selectedFile[i].name);
                    
                    axios.post('http://127.0.0.1:8000/api/upload/', fd, {
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


        }
    },
    mounted() {
        this.getCategory();
    }
}
</script>