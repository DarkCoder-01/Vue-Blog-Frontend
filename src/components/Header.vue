<template>
  <div>
    <div class="wrapper" id="cp-header">
      <div class="logo">DarkCoder</div>
      <div class="m-nav">
        <el-menu mode="horizontal"
                 :default-active="activeIndex"
                 @select="handleSelect"
                 background-color="#333"
                 text-color="#fff"
                 active-text-color="#409EFF"
        >
          <el-menu-item index="/home">
            <i class="el-icon-s-home"></i>博客首页
          </el-menu-item>
          <el-menu-item index="/archives">
            <i class="el-icon-folder-opened"></i>文章归档
          </el-menu-item>
          <el-menu-item index="/leavemsg">
            <i class="el-icon-message"></i>留言
          </el-menu-item>
          <el-menu-item index="/about">
            <i class="el-icon-info"></i>关于
          </el-menu-item>
          <el-menu-item index="/login" v-if="!isLogin">
            <i class="el-icon-user"></i>登录
          </el-menu-item>
          <el-menu-item v-if="isLogin">
            <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                      <span style="font-size: large">{{ userInfo ? userInfo.username : "" }}</span>
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
              <el-dropdown-menu class="m-dropdown">
                <router-link to="/manager"><el-dropdown-item icon="el-icon-s-tools">管理中心</el-dropdown-item></router-link>
                <router-link to="/blog/add"><el-dropdown-item command="addBlog" icon="iconfont My-new-iconbianji">发表博客</el-dropdown-item></router-link>
                <el-dropdown-item command="logout" icon="el-icon-switch-button">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div id="mobileNav">
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#333"
          text-color="#fff"
          active-text-color="#409EFF"
          router
      >
        <el-submenu index="1">
          <el-menu-item-group>
            <el-menu-item index="/home" @click="Goto">
              <i class="el-icon-s-home"></i>博客首页
            </el-menu-item>
            <el-menu-item index="/archives" @click="Goto">
              <i class="el-icon-folder-opened" @click="Goto"></i>文章归档
            </el-menu-item>
            <el-menu-item index="/leavemsg" @click="Goto">
              <i class="el-icon-message"></i>留言
            </el-menu-item>
            <el-menu-item index="/about" @click="Goto">
              <i class="el-icon-info"></i>关于
            </el-menu-item>
            <el-menu-item index="/login" v-if="!isLogin" @click="Goto">
              <i class="el-icon-user"></i>登录
            </el-menu-item>
            <el-menu-item index="/blog/add" v-if="isLogin">
              <i class="el-icon-edit"></i>发表博客
            </el-menu-item>
            <el-menu-item @click="logout" v-if="isLogin">
              <i class="el-icon-switch-button"></i>退出登录
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  data() {
    return {
      activeIndex: '/home',
      userInfo: this.$store.getters.getUser,
      isLogin: this.$store.getters.getLoginState,
    }
  },
  methods: {
    handleSelect(index) {
      this.$router.push(index).catch(err => {})
    },
    handleCommand(command) {
      switch (command) {
        case 'logout': {
          this.logout();
          this.$message({
            message: '退出成功',
            type: 'success',
          });
        }
      }
    },
    logout() {
      this.$axios.get('/logout').then(res => {
        this.$store.commit("REMOVE_INFO");
        this.$store.commit("CHANGE_LOGIN_STATE", false);
        this.reload();
        this.$router.push('/home');
      })
    },
    Goto(){
      document.querySelector('.el-submenu__title').click()
    }
  },
}
</script>

<style lang="scss" scoped>
#mobileNav {
  display: none;
}

.wrapper {
  background-color: #333333;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  position: relative;

  .logo {
    margin-left: 70px;
    color: #fff;
    text-align: center;
    line-height: 60px;
    font-weight: bold;
    font-size: x-large;
    opacity: 0.8;
  }

  .m-nav {
    position: absolute;
    right: 60px;
  }
}
</style>
