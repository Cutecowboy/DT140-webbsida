<template>
    <h1>Administration</h1>
    <h4 class="mt-3">Vad vill du göra?</h4>
    <button class="btn btn-success mt-2 me-3 mb-2" @click="toggler(1)">Redigera</button>
    <button class="btn btn-danger mt-2 mb-2" @click="toggler(2)">Ta bort</button>

    <div id="form-1" style="display: none;">
    <label for="user" class="form-label">Vilken användare vill du redigera</label>
    <select @change="toggler(4)" name="user" id="user" class="form-select" v-model="this.email">
        <option v-for="user in users" :user="user" :key="user.id" :value="user.id">{{ user.email }}</option>
    </select>
 
        <form id="form-4" style="display: none;" @submit.prevent="editUser()">
            <label for="name" class="form-label">Namn</label>
            <input class="form-control" type="text" v-model="username" name="name" id="name" required>
            <label for="email" class="form-label">E-post</label>
            <input class="form-control" type="email" v-model="email" name="email" id="email" required>
            <label for="role" class="form-label">Roll</label>
            <select v-model="role" class="form-select" name="role" id="role">
                <option :value="1">Administratör</option>
                <option :value="2">Användare</option>
            </select>
            
            
            <input type="submit" class="btn btn-success mt-3" value="Redigera">
            
        </form>
    </div>

    <div id="form-2" style="display: none;">
        <label for="user2" class="form-label">Vilken användare vill du ta bort</label>
        <select @change="toggler(5)" name="user2" id="user2" class="form-select" v-model="this.email">
            <option v-for="user in users" :user="user" :key="user.id" :value="user.id">{{ user.email }}</option>
        </select>
        <form id="form-5" style="display: none;" @submit.prevent="">
            <label for="name2" class="form-label">Namn</label>
            <input class="form-control" type="text" v-model="username" name="name2" id="name2" readonly >
            <label for="email2" class="form-label">E-post</label>
            <input class="form-control" type="email" v-model="email" name="email2" id="email2" readonly>
            <label for="role2" class="form-label">Roll</label>
            <input v-if="this.role == 1" class="form-control" type="text" value="Administratör" id="role2" readonly>
            <input v-else class="form-control" type="text" value="Användare" id="role2" readonly>
            
            
            <button @click="deleteUser()" class="btn btn-danger mt-3">Ta bort</button>
            
        </form>
    </div>





</template>

<script>

export default {
    data(){
        return {
            users: [],
            username: this.username,
            email: this.email,
            role_id: this.role_id,
            role: this.role,
            userid: this.userid
        }
    },
    methods: {
        async getUsers(){
            const resp = await fetch("http://127.0.0.1:8000/api/users", {
                method: "GET",
            headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("APITOKEN")}`
            }});  
            const data = await resp.json();
            this.users = data;
        },
        async editUser(){
            let userBody = {
                name: this.username,
                email: this.email,
                role_id: this.role
            }

            const resp = await fetch("http://127.0.0.1:8000/api/users/" + this.userid, {
                method: "PUT",
                headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("APITOKEN")}`
                },
                body: JSON.stringify(userBody)
            });  

            if(resp.status == 401){
                document.getElementById("message").innerHTML = "Något gick fel!";
                    document.getElementById("message").style.display = "block";
                    document.getElementById("message").style.marginTop = "2rem";
                    setTimeout(this.timer, 10000);

            } else{
                document.getElementById("message").innerHTML = "Du har nu uppdaterat användaren!";
                    document.getElementById("message").style.display = "block";
                    document.getElementById("message").style.marginTop = "2rem";
                    setTimeout(this.timer, 10000);
                    this.username = "";
                    this.email = "";
                    this.role = "";
                this.getUsers();
                

            }

        },
        async deleteUser(){
            if(confirm("Är du säker på att du vill ta bort användaren?")){
                    const resp = await fetch("http://127.0.0.1:8000/api/users/" + this.userid, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("APITOKEN")}`
                }
                });
                if(resp.status === 200){
                    document.getElementById("message").innerHTML = "Användaren är nu borttagen!";
                    document.getElementById("message").style.display = "block";
                    setTimeout(this.timer, 10000);
                    this.getUsers();
                    this.username = "";
                    this.email = "";
                    this.role = "";
                    
                } else {
                    document.getElementById("message").innerHTML = "Något gick fel när användaren skulle tas bort!";
                    document.getElementById("message").style.display = "block";
                    setTimeout(this.timer, 10000);
                }
            };
        },
        timer() {
            document.getElementById("message").style.display = "none";
        },

        
        toggler(i){
            if((i > 0) && (i<4)){
                if(i == 1){
                    if(document.getElementById('form-2').style.display == "block"){
                        document.getElementById('form-2').style.display = "none";
                        document.getElementById('form-5').style.display = "none";
                    }
                }
                if(i == 2){
                    if(document.getElementById('form-1').style.display == "block"){
                        document.getElementById('form-1').style.display = "none";
                        document.getElementById('form-4').style.display = "none";
                    }
                }
                let form = document.getElementById('form-' + i);
                if(form.style.display == "none"){
                    form.style.display = "block";
                } else {
                    form.style.display = "none";

                }
             
            }else if ((i == 4) || (i==5)){
                this.users.forEach(u => {
                    if(u.id == event.target.value){
                        this.userid = u.id;
                        this.username = u.name;
                        this.email = u.email;
                        this.role_id = u.role_id;
                        if(this.role_id == 1){
                            this.role = 1
                        } else {
                            this.role = 2
                        }
                    }
                });
                



                let form = document.getElementById('form-' + i);
                form.style.display = "block";
                this.editcatname = this.categoryname;
            }
        },
        breadcrumb() {
            document.getElementById("breadcrumbs").innerHTML = `
            <li class="breadcrumb-item"><a href="/">Hem</a></li>
            <li class="breadcrumb-item active">Administrera</li>
            `
        },
        title() {
      document.getElementById("title").innerHTML = "Lampshopen Vintage - Administrera"
    },
    restrict(){
        if(sessionStorage.getItem('roleId') !== '1'){
            window.location.href = "/?message=5";
        }
    },
    },
    mounted(){
        this.restrict();
        this.getUsers();
        this.breadcrumb();
        this.title();
    }
}



</script>