<script>
let urlParam = new URLSearchParams(window.location.search)

export default{
  data(){
    return{
      message: urlParam.get("message"),

    }
  },
  methods: {
    breadcrumb() {
            document.getElementById("breadcrumbs").innerHTML = `
            <li class="breadcrumb-item active">Hem</li>
            `
        },
    title() {
      document.getElementById("title").innerHTML = "Lampshopen Vintage - Hem" 
    },
    checkMessage(message) {
      if ((message !== undefined) && (message !== null)) {
        if (message == 1) {
          document.getElementById("message").innerHTML = "Du har loggat ut!";
          document.getElementById("message").style.display = "block";
          setTimeout(this.timer, 10000);
        }
        else if (message == 2) {
          document.getElementById("message").innerHTML = "Du är redan inloggad!";
          document.getElementById("message").style.display = "block";
          setTimeout(this.timer, 10000);
        } 
        else if (message == 3) {
          document.getElementById("message").innerHTML = "Du har loggat in!";
          document.getElementById("message").style.display = "block";
          setTimeout(this.timer, 10000);
        }
        else if(message == 4){
          document.getElementById("message").innerHTML = "Du har registrerat dig, välkommen!";
          document.getElementById("message").style.display = "block";
          setTimeout(this.timer, 10000);
        }
        else if(message == 5){
          document.getElementById("message").innerHTML = "Du har inte rätt behörigheter, logga in som administratör!";
          document.getElementById("message").style.display = "block";
          setTimeout(this.timer, 10000);
        }
        else if(message == 6){
          document.getElementById("message").innerHTML = "Du behöver vara inloggad för att nå sidan!";
          document.getElementById("message").style.display = "block";
          setTimeout(this.timer, 10000);
        }
        else {
          document.getElementById("message").innerHTML = "Något gick fel, kontakta butiken för hjälp!";
          document.getElementById("message").style.display = "block";
          setTimeout(this.timer, 10000);
        }
      }
  },
  timer() {
      document.getElementById("message").style.display = "none";
    },
  },
  mounted(){
    this.breadcrumb();
    this.title();
    this.checkMessage(this.message)
  }


}





</script>

<template>
  <main>
    <div class="container-fluid welcome-section">
    <div class="row">
      <div class="col-md-6 welcome-text ps-0">
        <h1>Lampshopen Vintage</h1>
        <p>Varmt välkomna till vår nya hemsida. Här hittar du belysningsprodukter som vi har återställt med kärlek! Du hittar vårt sortiment <a href="/product">här!</a></p>
      </div>
      <div class="col-md-6">
        <img src="../assets/front.jpg" alt="Enterprise Photo" class="enterprise-photo img-fluid">
      </div>
    </div>
  </div>

  </main>
</template>
