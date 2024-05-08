<script>

export default{
  methods: {
    breadcrumb() {
            document.getElementById("breadcrumbs").innerHTML = `
            <li class="breadcrumb-item active">Hem</li>
            `
        },
  },
  mounted(){
    this.breadcrumb();
  }


}





</script>

<template>
  <main>
    <h1>Första sidan!</h1>

  </main>
</template>
