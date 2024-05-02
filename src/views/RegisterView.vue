<script>

export default {
    data() {
        return {
            name: "",
            email: "",
            password: ""
        }
    },
    methods: {
        // hide header and footer in login page
        hideHeadFoot() {
            document.getElementById("header").style.display = "none";
            document.getElementById("footer").style.display = "none";

        },

        // check whether user is already logged in
        checkLoginStatus() {
            if (sessionStorage.getItem("APITOKEN") !== null) {
                // insert message in the redirection
                window.location.href = "/"
            }
        },




        // once user submits, process name, email and password and check if credentials are good for registration
        async registerUser() {
            //conditions to be able to send to database 
            if ((this.email.length >= 5) && (this.password.length >= 4) && (this.name.length >= 2)) {

                // construct body that will be sent to db
                let registerBody = {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }

                // connect to db and send body with POST method
                const resp = await fetch("http://127.0.0.1:8000/api/register", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(registerBody)
                });

                // store data
                const data = await resp.json()

                // if error then do something
                if (resp.status == 401) {
                    document.getElementById("message").innerHTML = "Dina användaruppgifter är fel!";
                    document.getElementById("message").style.display = "block";
                    document.getElementById("message").style.marginTop = "2rem";
                    setTimeout(this.timer, 10000);

                } else {
                    sessionStorage.setItem("APITOKEN", data.token);
                    // insert message in redirection
                    window.location.href = "/?message=3";
                }




            } else {
                document.getElementById("message").innerHTML = "Dina användaruppgifter är fel!";
                document.getElementById("message").style.display = "block";
                document.getElementById("message").style.marginTop = "2rem";
                setTimeout(this.timer, 10000);

            }
        },
        timer() {
            document.getElementById("message").style.display = "none";
        }
    },
    mounted() {
        this.hideHeadFoot();
        this.checkLoginStatus();
    }
}

</script>

<template>
    <h1>Registera dig</h1>

    <!-- Input for registration -->
    <form @submit.prevent="registerUser()">

        <label for="name" class="form-label">Namn</label>
        <input type="text" class="form-control" placeholder="Förnamn Efternamn" v-model="name">
        <label for="email" class="form-label">E-post</label>
        <input type="email" class="form-control" placeholder="epost@domän.se" v-model="email">
        <label for="password" class="form-label">Lösenord</label>
        <input type="password" class="form-control" v-model="password">

        <input type="submit" value="Logga in" class="btn btn-primary mt-3 mb-3">
    </form>

    <div id="logintext">
        <p>Har du en inloggning? <a href="/login">Logga in här</a></p>
    </div>
</template>

<style></style>