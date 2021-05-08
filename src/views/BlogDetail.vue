<template>
  <div>
    <el-card>
      <div slot="header">
        <el-row>
          <el-col :span="4">
            <div style="padding: 15px">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>博客详情</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </el-col>
          <el-col v-if="isLogin" :span="20" :push="17">
            <el-button type="primary" icon="el-icon-edit" @click="editBlog(id)" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="deleteBlog(id)" circle></el-button>
          </el-col>
        </el-row>

      </div>
      <div>
        <h2>{{data.title}}</h2>
        <div class="m-info-content">
          <span v-if="data.created" class="m-date"><i class="iconfont icon-date"></i>{{ data.created }}</span>
          <span><i class="el-icon-view"></i>{{ data.view }}</span>
        </div>
        <div class="detail">
          <mavon-editor v-model="data.content"
                        defaultOpen="preview"
                        :toolbarsFlag="false"
                        :subfield="false"
                        :boxShadow="false"
                        code-style="atom-one-dark"
          >
          </mavon-editor>
        </div>
      </div>
      <div class="m-thumbup">
        <el-button v-if="isNotLiked" type="primary" round @click="like">
          <i class="iconfont  My-new-icondianzan"></i>点赞（{{ data.likes }}）
        </el-button>
        <div>
          <el-popover
              placement="bottom"
              trigger="click">
            <el-image :src="wechat" style="width: 200px; height: 200px;"></el-image>
            <el-button type="success" round slot="reference">
              <i class="iconfont My-new-icondashang"></i>打赏
            </el-button>
          </el-popover>
        </div>
      </div>

      <comment :blogId="id" id="m-comment"></comment>
    </el-card>
  </div>
</template>

<script>
import comment from '@/components/Comment.vue'

export default {
  components: {
    comment,
  },
  data() {
    return {
      id: this.$route.params.id,
      isLogin: this.$store.getters.getLoginState,
      data: {},
      isNotLiked: true,
      wechat: require('@/assets/img/wechat-pay.jpg'),
    }
  },
  methods: {
    getBlogDetail() {
      this.$axios.get('/blog/' + this.id).then(res => {
        this.data = res.data.data;
      })
    },
    editBlog(id) {
      this.$router.push({name:'editBlog',params: {id: id}})
    },
    deleteBlog(id) {
      this.$confirm('此操作将删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: `文章删除成功!`
        });
        // 发起删除的网络请求
        this.$axios.get('/blog/delete?blogId=' + id)
            .then(res => {
              if(res.data.code === 0){
                //发起删除请求操作
                this.$message({
                  type: 'success',
                  message: `${id}文章删除成功!`
                });
                setTimeout(() => {
                  location.reload()
                }, 500);
              }
            }).catch(e=>{
          console.log(e)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    like() {
      this.$axios.get('/blog/like?blogId=' + this.id).then(res => {
        this.data = res.data.data;
        this.isNotLiked = false;
      })
    }
  },
  created() {
    this.getBlogDetail()
  }
}
</script>

<style lang="scss" scoped>
.head {
  margin-top: 20px;
}

.m-thumbup {
  display: flex;
  justify-content: center;
  margin: 25px 0;

  .el-button {
    margin: 0 10px;
  }

  i {
    margin-right: 8px;
  }
}

.m-date {
  margin-right: 15px;
}

.m-info-content {
  margin-bottom: 20px;
}

i {
  margin-right: 5px;
}

h2 {
  font-size: 25px;
  font-weight: 550;
  margin: 20px 0;
}
</style>
