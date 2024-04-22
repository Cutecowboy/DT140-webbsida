<script>
let urlParam = new URLSearchParams(window.location.search)

export default {
    data() {
        return {
            message: urlParam.get("message"),
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
            if (sessionStorage.getItem("TOKENAPI") !== null) {
                // insert message in the redirection
                window.location.href = "/?message=1";
            }
        },




        // once user submits, process email and password and check if credentials are good for login
        async loginUser() {
            //conditions to be able to send to database 
            if ((this.email.length >= 5) && (this.password.length >= 4)) {

                // construct body that will be sent to db
                let loginBody = {
                    email: this.email,
                    password: this.password
                }

                // connect to db and send body with POST method
                const resp = await fetch("http://127.0.0.1:8000/api/login", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(loginBody)
                });

                // store data
                const data = await resp.json()

                // if error
                if (resp.status == 401) {
                    document.getElementById("message").innerHTML = "Dina användaruppgifter är fel!";
                    document.getElementById("message").style.display = "block";
                    document.getElementById("message").style.marginTop = "2rem";
                    setTimeout(this.timer, 10000);

                } else {
                    
                    sessionStorage.setItem("TOKENAPI", data.token);
                    sessionStorage.setItem("userId", data.userId);
                    // insert message in redirection
                    window.location.href = "/?message=2"
                }




            } else {
                document.getElementById("message").innerHTML = "Dina användaruppgifter är fel!";
                document.getElementById("message").style.display = "block";
                document.getElementById("message").style.marginTop = "2rem";
                setTimeout(this.timer, 10000);
            }
        },
        checkMessage(message) {
            if ((message !== undefined) && (message !== null) ) {
                document.getElementById("message").innerHTML = "Du har nu loggats ut!";
                document.getElementById("message").style.display = "block";
                document.getElementById("message").style.marginTop = "2rem";

                setTimeout(this.timer, 10000);
            }
        },
        // message timer, after 10 seconds hide the message div 
        timer() {
            document.getElementById("message").style.display = "none";
        }

    },
    mounted() {
        this.hideHeadFoot();
        this.checkLoginStatus();
        this.checkMessage(this.message);
    }

}

</script>

<template>
    <h1>Logga in</h1>

    <!-- Input for login -->
    <form @submit.prevent="loginUser()">
        <label for="email" class="form-label">E-post</label>
        <input type="email" class="form-control" placeholder="namn@exempel.com" v-model="email">
        <label for="password" class="form-label">Lösenord</label>
        <input type="password" class="form-control" v-model="password">

        <input type="submit" value="Logga in" class="btn btn-primary mt-3 mb-2">
    </form>

    <div id="registertext">
        <p>Ingen inloggning? <a href="/register">Registera här</a></p>
    </div>
</template>

<style></style>