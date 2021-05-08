<template>
  <div class="m-login">
    <el-form :model="form" ref="form" :rules="rules" label-width="0" :inline="false" size="normal" key="1" class="block m-login-form">
      <div class="m-login-header">
        <h1>DarkCoder</h1>
      </div>
      <el-form-item prop="username">
        <el-input prefix-icon="el-icon-user-solid" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input prefix-icon="el-icon-unlock" type="password" v-model="form.password" @keyup.enter.native="submitForm('form')" show-password></el-input>
      </el-form-item>
      <el-form-item class="m-login-btn">
        <el-button type="primary" @click="submitForm('form')" style="width: 60%">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: 1,
      form: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
        ],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/login', this.form).then(res => {
            //从服务器返回的头部中拿到token字段
            const jwt = res.headers['token'];
            const userInfo = res.data.data;
            this.$store.commit("SET_TOKEN", jwt);
            this.$store.commit("SET_USERINFO", userInfo);
            this.$store.commit("CHANGE_LOGIN_STATE", true);
            this.$router.push({name: 'home'});
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.m-login {
  .m-login-form {
    width: 400px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 20%;
    padding: 15px;

    .m-login-header {
      margin: 20px 0 30px 0;
      font-size: xx-large;
      font-weight: bold;
      text-align: center;
      color: #0086b3;
    }

    .m-login-btn {
      text-align: center;
    }
  }
}
</style>
