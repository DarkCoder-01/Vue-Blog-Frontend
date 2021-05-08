<template>
  <div>
    <el-card>
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>文章归档</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-timeline>
        <el-timeline-item :key="index" v-for="(item, index) in archive" :timestamp="item.created">
          <div style="padding: 5px; margin-bottom: 20px; font-size: 15px">
            <el-link :underline="false" @click="GotoDetail(item.id)">{{ item.title }}</el-link>
          </div>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Archives",
  data() {
    return {
      archive: [],
    }
  },
  methods: {
    GetArchives() {
      this.$axios.get('/blog/archive').then(res => {
        this.archive = res.data.data;
        console.log(this.archive);
      })
    },
    GotoDetail(blogId) {
      this.$router.push({name:'detail',params: {id:blogId}});
    }
  },
  created() {
    this.GetArchives();
  }
}
</script>

<style scoped>

</style>
