<script>

export default{
  methods: {
    breadcrumb() {
            document.getElementById("breadcrumbs").innerHTML = `
            <li class="breadcrumb-item active">Hem</li>
            `
        },
    title() {
      document.getElementById("title").innerHTML = "Lampshopen Vintage - Hem" 
    }
  },
  mounted(){
    this.breadcrumb();
    this.title();
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
