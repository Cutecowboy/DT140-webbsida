<template>
    <h1>Om oss</h1>

    <div class="card p-3">
        <div class="card-body">
    <h5 class="card-title">Lampshopen i Falun</h5>
  </div>
  <div class="ratio ratio-1x1">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1958.4098012596671!2d15.609566200000003!3d60.603411799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46677070c501efd1%3A0xfb11418f2bbe9197!2sLampshopen%20i%20Falun%20AB!5e0!3m2!1ssv!2sse!4v1715171899224!5m2!1ssv!2sse" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
</div>
    </div>    
</template>

<script>
export default {
    methods: {
        breadcrumb() {
            document.getElementById("breadcrumbs").innerHTML = `
            <li class="breadcrumb-item"><a href="/">Hem</a></li>
            <li class="breadcrumb-item active">Om oss</li>
            `
        },
        title() {
      document.getElementById("title").innerHTML += "Om oss"
    }
    },
    mounted() {
        this.breadcrumb();
        this.title();
    }
}

</script>