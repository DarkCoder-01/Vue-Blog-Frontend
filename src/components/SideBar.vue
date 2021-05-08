<template>
  <div class="right-side">
    <div>
      <el-card>
        <h3 class="m-title">个人简介</h3>
        <div>
          <p class="m-content">
            曾服役于新疆，目前就读于SHU计算机专业，大二学生，喜欢折腾，对Web安全，逆向，JAVA后端开发，前端开发，C/C++/python均有所涉略，最近在自学java开发
          </p>
        </div>
      </el-card>
    </div>
    <div class="right-side-content">
      <el-card>
        <el-input prefix-icon="el-icon-search" placeholder="输入关键字进行搜索" v-model="keyWord"
                  @keyup.enter.native="search"></el-input>
      </el-card>
    </div>
    <div class="right-side-content">
      <el-card>
        <div slot="header">
          <i class="iconfont icon-tubiao13" style="margin-right: 5px"></i>栏目分类
        </div>
        <div v-for="item in classifications" style="margin-bottom: 15px; line-height: 20px">
          <i class="el-icon-notebook-2" style="margin-right: 5px"></i>
          <el-link @click="">{{ item.classification }}</el-link>
          <el-tag style="float: right; margin-top: -5px">{{ item.count }}</el-tag>
        </div>
      </el-card>
    </div>
    <div class="right-side-content">
      <el-card>
        <div slot="header">
          <i class="el-icon-hot-water" style="margin-right: 5px"></i>热门推荐
        </div>
        <div v-for="(item, index) in recommend" style="margin-bottom: 15px; line-height: 20px">
          <el-tag type="success" style="margin-top: -5px; border-radius: 50%; margin-right: 5px">
            {{ index + 1 }}
          </el-tag>
          <el-link>{{ item.title }}</el-link>
        </div>
      </el-card>
    </div>
    <div class="right-side-content">
      <el-card>
        <div slot="header">
          <i class="el-icon-price-tag" style="margin-right: 5px"></i>标签
        </div>
        <div>
          <span v-for="(item, index) in tagsList" :key="index">
            <el-button class="tags-box" :type="btnType[Math.floor(Math.random()*btnType.length)]" icon="el-icon-price-tag"
                       size="mini" plain @click="pageByTag(item)">
              {{ item }}
            </el-button>
          </span>
        </div>
      </el-card>
    </div>
    <div class="right-side-content m-calender">
      <el-calendar v-model="date">
      </el-calendar>
    </div>
    <div style="text-align: center; margin-bottom: 10px" class="right-side-content">
      <el-card>
        <div slot="header">
          联系我
        </div>
        <div>
          <el-image :src="wechat" style="width: 120px; height: 120px;"></el-image>
        </div>
      </el-card>
    </div>
  </div>
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
      date: new Date(),
    }
  },
  methods: {
    GetAllClassification() {
      this.$axios.get('/blog/classification').then(res => {
        this.classifications = res.data.data.sort();
        console.log(this.classifications);
      })
    },
    GetAllTags() {
      this.$axios.get('/blog/tags').then(res => {
        const data = res.data.data;
        this.tagsList = data['allTags'];
        console.log(this.tagsList);
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
.right-side {
  width: 100%;
  margin: auto 10px;
}

.right-side-content {
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
