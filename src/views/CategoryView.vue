<template>
    <h1>Kategorier</h1>

    <h4 class="mt-3">Vad vill du göra?</h4>

    <button class="btn btn-success mt-2 me-3 mb-2" @click="toggler(1)">Lägg till</button>
    <button class="btn btn-warning mt-2 me-3 mb-2" @click="toggler(2)">Redigera</button>
    <button class="btn btn-danger mt-2 mb-2" @click="toggler(3)">Ta bort</button>

    <form id="form-1" style="display: none;" @submit.prevent="addCategory()">
        <label for="categoryname" class="form-label">Kategori namn</label>
        <input class="form-control" type="text" v-model="categoryname" name="categoryname" id="" required>
        <input type="submit" class="btn btn-success mt-3" value="Lägg till">
    </form>

    <div id="form-2" style="display: none;">
    <label for="category" class="form-label">Vilken kategori vill du redigera</label>
    <select @change="toggler(4)" name="category" class="form-select" v-model="this.categoryname">
        <option v-for="category in categories" :category="category" :key="category.id">{{ category.categoryname }}</option>
        </select>
        <form id="form-4" style="display: none;" @submit.prevent="editCategory()">

        <label for="editcatname" class="form-label">Ny kategori namn</label>
        <input class="form-control" type="text" v-model="editcatname" name="editcatname" id="" required>
        <input type="submit" class="btn btn-success mt-3" value="Redigera">
        </form>
    </div>

    <div id="form-3" style="display: none;">
        <label for="category" class="form-label">Vilken kategori vill du ta bort</label>
        <select name="category" class="form-select" v-model="this.categoryname">
            <option v-for="category in categories" :category="category" :key="category.id">{{ category.categoryname }}</option>
        </select>

        <button class="btn btn-danger mt-3" @click="deleteCategory()">Ta bort</button>


    </div>

</template>




<script>
export default {
    data(){
        return{
            categories: this.categories,
            categoryname: this.categoryname,
            editcatname: this.editcatname
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
        async addCategory(){
            console.log(this.categoryname)
            let dummy = 0;
            // control if the category already exists
            this.categories.forEach(cat => {
                if(cat.categoryname.toUpperCase() == this.categoryname.toUpperCase()){
                    dummy++;

                } 
            });

            if(dummy == 0){
                let catBody = {
                        categoryname: this.categoryname
                    }
                    const resp = await fetch("http://127.0.0.1:8000/api/categories/", {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-type": "application/json",
                            "Authorization": `Bearer ${sessionStorage.getItem("APITOKEN")}`
                        },
                        body: JSON.stringify(catBody)
                    });    
                    if(resp.status == 201){
                        document.getElementById("message").innerHTML = "Kategorin har lagts till!";
                        document.getElementById("message").style.display = "block";
                        setTimeout(this.timer, 10000);
                        this.getCategory();
                        this.categoryname = "";
                    } else {
                        document.getElementById("message").innerHTML = "Kategorin kunde inte läggas in!"
                        document.getElementById("message").style.display = "block";
                        setTimeout(this.timer, 10000);
                    }
            } else{
                    document.getElementById("message").innerHTML = "Kategorin existerar redan!"
                        document.getElementById("message").style.display = "block";
                        setTimeout(this.timer, 10000);
                
            }



        },
        async editCategory(){
            let dummy = 0;
            let id = 0;
            // control if the category already exists
            this.categories.forEach(cat => {
                if(cat.categoryname.toUpperCase() == this.editcatname.toUpperCase()){
                    dummy++;

                } 
                if(cat.categoryname == this.categoryname){
                    id = cat.id;
                }
            });

            if(dummy == 0){


                let catBody = {
                        categoryname: this.editcatname
                    }
                    const resp = await fetch("http://127.0.0.1:8000/api/categories/" + id , {
                        method: "PUT",
                        headers: {
                            "Accept": "application/json",
                            "Content-type": "application/json",
                            "Authorization": `Bearer ${sessionStorage.getItem("APITOKEN")}`
                        },
                        body: JSON.stringify(catBody)
                    });    
                    if(resp.status == 200){
                        document.getElementById("message").innerHTML = "Kategorin har lagts till!";
                        document.getElementById("message").style.display = "block";
                        setTimeout(this.timer, 10000);
                        this.getCategory();
                        this.categoryname = "";
                        this.editcatname = "";
                    } else {
                        document.getElementById("message").innerHTML = "Kategorin kunde inte läggas in!"
                        document.getElementById("message").style.display = "block";
                        setTimeout(this.timer, 10000);
                    }
            } else{
                    document.getElementById("message").innerHTML = "Kategorin existerar redan!"
                        document.getElementById("message").style.display = "block";
                        setTimeout(this.timer, 10000);
                
            }
        },

        async deleteCategory(){
            if(confirm("Är du säker på att du vill ta bort produkten?")){
                let id = 0;
                //find the id
                this.categories.forEach(cat => {
                
                if(cat.categoryname == this.categoryname){
                    id = cat.id;
                }
                
                
                });

                const resp = await fetch("http://127.0.0.1:8000/api/categories/" + id , {
                    method: "DELETE",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${sessionStorage.getItem("APITOKEN")}`
                    }
                });

                if(resp.status == 200){
                    document.getElementById("message").innerHTML = "Kategorin har tagits bort!";
                    document.getElementById("message").style.display = "block";
                    setTimeout(this.timer, 10000);
                    this.getCategory();
                    this.categoryname = "";

                } else {
                    document.getElementById("message").innerHTML = "Något gick fel test igen!";
                    document.getElementById("message").style.display = "block";
                    setTimeout(this.timer, 10000);

                }             
            }
        },
        test(){
            console.log(this.categoryname)
            
        },
        timer() {
            document.getElementById("message").style.display = "none";
        },
        toggler(i){
            if((i > 0) && (i<4)){
                let form = document.getElementById('form-' + i);
                if(form.style.display == "none"){
                    form.style.display = "block";
                    console.log("hej")
                } else {
                    form.style.display = "none";

                }
             
            }else if (i == 4){
                let form = document.getElementById('form-' + i);
                form.style.display = "block";
                this.editcatname = this.categoryname;
            }
        },
        restrict(){
        if(sessionStorage.getItem('roleId') !== '1'){
            window.location.href = "/?message=2";
        }
        
    },
    breadcrumb() {
            document.getElementById("breadcrumbs").innerHTML = `
            <li class="breadcrumb-item"><a href="/">Hem</a></li>
            <li class="breadcrumb-item active">Kategori</li>
            `
        },
        title() {
      document.getElementById("title").innerHTML += "Kategorier"
    }
    },
    mounted(){
        this.restrict();
        this.getCategory();
        this.breadcrumb();
        this.title();
    }
}
</script>