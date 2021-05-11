<template>
  <div>
    <el-card>
      <div class="block">
        <el-carousel>
          <el-carousel-item v-for="img in imgs" :key="img">
            <el-image :src="img" fit="cover"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
      <mavon-editor v-model="about"
                    defaultOpen="preview"
                    :toolbarsFlag="false"
                    :subfield="false"
                    :boxShadow="false"
                    code-style="atom-one-dark"
      >
      </mavon-editor>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      about: "",
      imgs: [
        require('@/assets/img/deer.jpg'), require('@/assets/img/tree.jpg'), require('@/assets/img/moon.jpg')
      ],
    }
  },
  methods: {
    getAbout() {
      this.$axios.get('/about').then(res => {
        this.about = res.data.data.content;
        // console.log(res.data.data);
      })
    }
  },
  created() {
    this.getAbout();
  }
}
</script>

<style scoped>

</style>
