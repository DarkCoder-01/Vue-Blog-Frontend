<template>
  <div>
    <Header></Header>

    <div class="main">
      <router-view></router-view>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer.vue'

export default {
  name: 'LayoutMain',
  components: {
    Header,
    Footer
  },
}
</script>

<style lang="scss" scoped>
.main {
  max-width: 1400px;
  margin: 10px auto;
}
</style>
