<template>
  <div>
    <el-row :gutter="10"
            v-loading="loading"
            element-loading-text="玩儿命加载中..."
            element-loading-spinner="el-icon-loading">
      <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
        <div class="left-side">
          <el-card>
            <div slot="header" v-if="!isSearch">
              共有{{ total }}篇博客
            </div>
            <div slot="header" v-if="isSearch">
              <el-button @click="reload" icon="el-icon-arrow-left" type="primary" plain size="small">返回首页</el-button>
              <span style="margin-left: 10px">关于{{ keyWord1 }}的搜索结果，共有{{ total }}篇</span>
            </div>
            <ul>
              <li :key="index" v-for="(item, index) in blogs" @click="gotoDetail(item.id)" >
                <div style="display: flex;align-items: center; margin-bottom: 10px">
                  <div class="title">
                    {{ item.title }}
                  </div>
                  <div style="margin-left: auto; margin-right: 20px">
                    <el-tag effect="dark" ><i class="el-icon-edit-outline" style="margin-right: 5px"></i>{{ item.source }}</el-tag>
                  </div>
                </div>
                <div class="content">
                  <div class="image">
                    <img :src="item.coverUrl" alt="">
                  </div>
                  <div class="describe">
                    <p style="font-size: 14px">{{ item.content }}</p>
                    <div class="tag">
                      <el-tag v-if="item.tags" size="small" :key="tag" v-for="tag in item.tags.split(',')" :type="tagType[Math.floor(Math.random()*item.tags.split(',').length)]">
                        <i class="el-icon-price-tag" style="margin-right: 5px"></i>{{ tag }}
                      </el-tag>
                    </div>
                    <div class="describe-bottom">
                      <span v-if="item.created" class="timer"><i class="el-icon-edit"></i>{{ item.created }}</span>
                      <span class="browse"><i class="el-icon-view"></i>{{ item.view }}</span>
                      <span class="like"><i class="iconfont  My-new-icondianzan"></i>{{ item.likes }}</span>
                    </div>
                  </div>
                </div>
                <el-divider></el-divider>
              </li>
            </ul>
            <el-pagination
                background
                layout="prev, pager, next, jumper"
                :total="total"
                :page-size="pageSize"
                :current-page="currentPage"
                @current-change=page
            >
            </el-pagination>
          </el-card>
        </div>
      </el-col>

      <el-col :lg="6" :xl="6">
        <div>
          <!--个人简介-->
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
          <!--搜索框-->
          <div class="margin-top-10">
            <el-card>
              <el-input prefix-icon="el-icon-search" placeholder="输入关键字回车进行搜索" v-model="keyWord"
                        @keyup.enter.native="search"></el-input>
            </el-card>
          </div>
          <!--栏目分类-->
          <div class="margin-top-10">
            <el-card>
              <div slot="header">
                <i class="iconfont icon-tubiao13" style="margin-right: 5px"></i>栏目分类
              </div>
              <div v-for="item in classifications" style="margin-bottom: 15px; line-height: 20px">
                <i class="el-icon-notebook-2" style="margin-right: 5px"></i>
                <el-link @click="displayByClassification(item.classification)">{{ item.classification }}</el-link>
                <el-tag style="float: right; margin-top: -5px">{{ item.count }}</el-tag>
              </div>
            </el-card>
          </div>
          <!--热门推荐-->
          <div class="margin-top-10">
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
          <!--标签-->
          <div class="margin-top-10 no-padding">
            <el-card>
              <div slot="header">
                <i class="el-icon-price-tag" style="margin-right: 5px"></i>标签
              </div>
              <div class="no-padding">
                <span v-for="(tag, index) in tagsList" :key="index">
                  <el-button class="tags-box" :type="btnType[Math.floor(Math.random()*btnType.length)]" icon="el-icon-price-tag"
                             size="mini" plain @click="displayByTag(tag)">
                    {{ tag }}
                  </el-button>
                </span>
              </div>
            </el-card>
          </div>
          <!--联系我-->
          <div style="text-align: center; margin-bottom: 10px" class="margin-top-10">
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blogs: {},
      currentPage: 1,
      pageSize: 5,
      total: 0,
      classifications: [],
      tagsList: [],
      btnType: ['primary', 'success', 'warning', 'danger', 'info',],
      tagType: ['', 'success', 'info', 'warning', 'danger'],
      wechat: require('@/assets/img/wechat.jpg'),
      recommend: [],
      keyWord: '',
      isSearch: false,
      keyWord1: '',
      loading: true,
    }
  },
  methods: {
    search() {
      this.loading = true;
      this.keyWord1 = this.keyWord;
      this.isSearch = true;
      this.currentPage = 1;
      this.page(this.currentPage, "search");
    },
    setVal(res) {
      const data = res.data.data;
      this.loading = false;
      this.blogs = data.records;
      this.total = data.total;
      this.currentPage = data.current;
      this.pageSize = data.size;
      this.keyWord = '';
    },
    page(currentPage, displayBy, classification=null, tag=null) {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
      if(displayBy === 'tag' && tag) {
        this.$axios.get('/blog/tags/'+tag+'?currentPage='+currentPage).then(res => {
          this.setVal(res);
        })
      } else if(displayBy === 'classification' && classification) {
        this.$axios.get('/blog/classify/'+classification+'?currentPage='+currentPage).then(res => {
          this.setVal(res);
        })
      } else {
        this.$axios.get('/blog/search?keyWord='+this.keyWord+'&currentPage='+currentPage).then(res => {
          this.setVal(res);
        })
      }
    },
    gotoDetail(id){
      this.$router.push({name:'detail',params: {id:id}});
    },
    GetAllClassification() {
      this.$axios.get('/blog/classifications').then(res => {
        this.classifications = res.data.data.sort();
        // console.log(this.classifications);
      })
    },
    GetAllTags() {
      this.$axios.get('/blog/tags').then(res => {
        const data = res.data.data;
        this.tagsList = data['allTags'];
      })
    },
    reload() {
      this.loading = true;
      this.currentPage = 1;
      this.pageSize = 5;
      this.keyWord1 = ''
      this.keyWord = '';
      this.total = 0;
      this.isSearch = false;
      this.page(this.currentPage, "search");
    },
    displayByClassification(classification) {
      this.loading = true;
      this.currentPage = 1;
      this.page(this.currentPage, "classification", classification, null);
    },
    displayByTag(tag) {
      this.loading = true;
      this.currentPage = 1;
      this.page(this.currentPage, "tag", null, tag);
    }
  },
  created() {
    this.GetAllClassification();
    this.GetAllTags();
    this.page(this.currentPage, "search");
  }
}
</script>

<style lang="scss" scoped>
li {
  cursor: pointer;
}

.title {
  font-size: 16px;
  font-weight: bold;
}

.content {
  display: flex;

  .image {
    overflow: hidden;
    border-radius: 5px;
    cursor: pointer;
    width: 200px;
    height: 130px;

    img {
      width: 100%;
      height: 100%;
      transition: all 0.4s;
    }

    img:hover {
      transform: scale(1.3);
    }
  }

  .describe {
    margin-left: 10px;
    flex: 5;
    position: relative;

    .tag {
      .el-tag {
        margin-right: 10px;
      }
    }

    p {
      display: block;
      color: #333;
      overflow: hidden;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      line-height: 26px;
    }

    .describe-bottom {
      position: absolute;
      bottom: 0;
      width: 100%;
      line-height: 28px;

      i {
        margin-right: 5px;
      }

      span {
        margin: 0 10px;
        font-size: 14px;
        color: rgb(107, 107, 107);
      }

      .author {
        margin-left: 0;
      }

      .el-button {
        float: right;
      }
    }
  }
}

.el-pagination {
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
}

.margin-top-10 {
  margin-top: 10px;
}

.no-padding {
  padding: 0 !important;
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
