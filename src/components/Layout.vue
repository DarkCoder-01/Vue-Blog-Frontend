<template>
  <div class="m-layout">
    <Header></Header>

    <div class="main">
      <div class="wrapper">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
            <div class="left-side">
              <router-view></router-view>
            </div>
          </el-col>
          <el-col :lg="6" :xl="6" class="right-side">
            <SideBar></SideBar>
          </el-col>
        </el-row>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer.vue'
import SideBar from "@/components/SideBar";

export default {
  name: 'commonLayout',
  components: {
    Header,
    Footer,
    SideBar,
  },
}
</script>

<style scoped lang="scss">
.m-layout {
  .main {
    margin-top: 10px;
    .wrapper {
      max-width: 1400px;
      margin: 0 auto;
    }
  }

  .left-side {
    width: 100%;
    margin: auto 10px;
  }
}
</style>
