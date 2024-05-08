<template>
    <nav class="navbar navbar-expand-xl navbar-dark bg-dark mb-3" id="header">
        <div class="container-fluid">
            <a class="navbar-brand text-light" href="/">Ted's spelbutik</a>
            <button @click="toggleNav()" class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarBasic" aria-controls="navbarBasic" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse collapse hide" id="navbarBasic" style="">
                <ul class="navbar-nav me-auto mb-2 mb-xl-0">
                    <li class="nav-item">
                        <a id="nav-1" class="nav-link" aria-current="page" href="/">Hem</a>
                    </li>
                    <li class="nav-item">
                        <a id="nav-2" class="nav-link" href="/product">Produkter</a>
                    </li>
                   
                    <div v-if="checkRoleStatus('1')" style="display: flex;">
                    <li class="nav-item">
                        <a id="nav-3" class="nav-link" href="/category">Kategori</a>
                    </li>
                    <li class="nav-item">
                        <a id="nav-4" class="nav-link" href="/skapa">Skapa</a>
                    </li>
                    <li class="nav-item">
                        <a id="nav-5" class="nav-link" href="/admin">Administrera</a>
                    </li>
                    </div>
                    <div v-if="checkRoleStatus('2')" style="display: flex;">
                        <li class="nav-item">
                        <a id="nav-4" class="nav-link" href="/bookings">Bokningar</a>
                    </li>
                    </div>
                    <li class="nav-item">
                        <a id="nav-6" class="nav-link" href="/about">Om oss</a>
                    </li>
                    
                    <li v-if="checkLogin() == true" class="nav-item">
                        <a @click="logoutUser()" class='nav-link' href="#">Logga ut</a>
                    </li>
                    <li v-else class="nav-item">
                        <a class='nav-link' href="/login">Logga in</a>
                    </li>
                </ul>
                <form @submit.prevent="searchGame()" class="d-flex">
                    <input v-model="this.search" class="form-control me-2" type="search" placeholder="Sök efter produkter"
                        aria-label="Search">
                    <button class="btn btn-outline-light" type="submit">Sök</button>
                </form>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            search: this.search
        }
    },

    methods: {
        // hamburgermenu toggles via this method once user clicks the menu
        toggleNav() {

            let toggle = document.getElementById('navbarBasic');
            let cname = "navbar-collapse collapse "
            // check whether the className is cname + show, if so then hide it else show it
            toggle.className = toggle.className === cname + "show" ? cname + "hide" : cname + "show";

        },
        // logout the user if it confirms that it wants to logout
        logoutUser() {
            if (confirm("Vill du logga ut?")) {
                sessionStorage.clear()
                window.location.href = "/login?message=1";
            }
        },
        // search for a game
        searchGame() {

            window.location.href = "/search?query=" + this.search

        },
        // check which navbar that should be active
        checkNavActive(){
            let path = window.location.pathname;
            let navItems;
            if(sessionStorage.getItem('roleId') == 1){
                navItems = ["/", "/product", "/category", "/skapa", "/admin", "/about"];
            } else if (sessionStorage.getItem('roleId') == 2){
                navItems = ["/", "/product", "/category", "/bookings", "/admin", "/about"];

            } else {
                navItems = ["/", "/product", "", "", "", "/about"];

            }

            for (let i = 0; i < navItems.length; i++) {
                if(path == navItems[i]){
                    document.getElementById(`nav-${i+1}`).classList.add("active");
                }
                
            }

        },
        // check if user is logged in or not, and what role
        async checkRole(){
            if (sessionStorage.getItem("APITOKEN") !== null) {
                const resp = await fetch("http://127.0.0.1:8000/api/roleid/" + sessionStorage.getItem("userId") , {
                method: "GET",
                headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("APITOKEN")}`
                }});
                
                const data = await resp.json();

                sessionStorage.setItem("roleId", data.role_id);
                
            } else {
                sessionStorage.setItem('roleId', 0);
            }
        },
        checkLogin(){
            if(sessionStorage.getItem("APITOKEN") !== null){
                return true;
            } else return false;
        },
        checkRoleStatus(id){
            if(sessionStorage.getItem('roleId') == id){
                return true;
            } else{
                return false;

            } 
        }


    },
    mounted() {
        this.checkRole()
        this.checkNavActive();
    }
}

</script>

<style scoped>
.navbar-toggler:hover{
    background-color: rgb(55, 58, 58);
}
</style>