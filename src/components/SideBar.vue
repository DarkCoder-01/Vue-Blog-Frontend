<template>

</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      classifications: [],
      tagsList: [],
      btnType: ['primary', 'success', 'warning', 'danger', 'info',],
      wechat: require('@/assets/img/wechat.jpg'),
      recommend: [],
      keyWord: '',
    }
  },
  methods: {
    sendKeyWord() {
      console.log("传出的关键字："+this.keyWord);
      this.$bus.$emit('getKeyWord', this.keyWord);
    },
    GetAllClassification() {
      this.$axios.get('/blog/classification').then(res => {
        this.classifications = res.data.data.sort();
        // console.log(this.classifications);
      })
    },
    GetAllTags() {
      this.$axios.get('/blog/tags').then(res => {
        const data = res.data.data;
        this.tagsList = data['allTags'];
        // console.log(this.tagsList);
      })
    },
  },
  created() {
    this.GetAllClassification();
    this.GetAllTags();
  }
}
</script>

<style scoped>
.margin-top-10 {
  margin-top: 10px;
}

.m-title {
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
}

.m-content {
  font-size: 15px;
  text-indent: 30px;
  line-height: 20px;
}

.tags-box {
  margin: 2px 2px;
}
</style>
