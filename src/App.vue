<script>
import { RouterLink, RouterView } from 'vue-router'
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default {
  components: {
    Header, Footer
  }
}
</script>

<template>
  <Header /> 
  <main class="container">
    <div id="message" class="alert alert-warning" style="display: none;"></div>
    <div aria-label="bc">
        <ol class="breadcrumb" id="breadcrumbs">
        </ol>
    </div>
  </main>
  <Footer /> 

</template>

<style scoped>

</style>
