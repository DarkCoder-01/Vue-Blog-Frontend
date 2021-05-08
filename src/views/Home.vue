<template>
  <div>
    <el-card>
      <div slot="header">
        共有{{ total }}篇博客
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
              <p style="font-size: 15px">{{ item.content }}</p>
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
</template>

<script>
export default {
  data() {
    return {
      tagType: ['', 'success', 'info', 'warning', 'danger'],
      blogs: {},
      currentPage: 1,
      pageSize: 5,
      total: 0,
      keyWord: '',
    }
  },
  methods: {
    page(currentPage) {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
      this.$axios.get('/blog/search?keyWord='+this.keyWord+'&currentPage='+currentPage).then(res => {
        const data = res.data.data;
        // console.log(data);
        this.blogs = data.records;
        this.total = data.total;
        this.currentPage = data.current;
        this.pageSize = data.size;
        this.keyWord = '';
      })
    },
    gotoDetail(id){
      this.$router.push({name:'detail',params: {id:id}});
    }
  },
  created() {
    this.page(this.currentPage);
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
</style>
