<script>

export default{
  methods: {
    breadcrumb() {
            document.getElementById("breadcrumbs").innerHTML = `
            <li class="breadcrumb-item active">Hem</li>
            `
        },
    title() {
      document.getElementById("title").innerHTML += "Hem"
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
    <h1>Första sidan!</h1>

  </main>
</template>
