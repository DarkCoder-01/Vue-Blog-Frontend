<template>
  <div>
    <div class="comment-box">
      <div class="bottom">
        <div class="m-describe" v-if="commentArray.length > 0">
          <span>哎呀~仅有<span class="commentTotal">{{ commentArray.length }}</span>条{{ blogId == 1 ? "留言" : "评论"}}</span>
        </div>
        <div class="m-describe" v-else>
          <span>哎呀~还没有{{ blogId == 1 ? "留言" : "评论"}}，大神快留下你的{{ blogId == 1 ? "留言" : "评论"}}吧</span>
        </div>
        <div>
          <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容并按回车键或者点击提交按钮进行发送"
              v-model="content.comment"
              size="350"
              maxlength="350"
              resize="none"
          >
          </el-input>
          <div class="m-name-box">
            <el-input type="text" v-model="content.commentator" placeholder="请问怎么称呼"></el-input>
            <el-button type="primary" style="margin-left: 20px" icon="el-icon-s-promotion" @click="SendComment">提交{{ blogId == 1 ? "留言" : "评论"}}
            </el-button>
          </div>
        </div>
        <div>
          <ul class="m-hot-comment" v-if="commentArray.length > 0">
            <h3>热门{{ blogId == 1 ? "留言" : "评论"}}</h3>
            <li :key="index" v-for="(item,index) in commentArray">
              <div class="m-comment-box">
                <div class="side">
                  <div class="CommentTitle">
                    <span class="nickname">{{ item.commentator }}: </span>
                    <span class="cmcontent">{{ item.comment }}</span>
                  </div>
                  <div class="m-time">
                    <span class="timer">{{ item.created }}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  props: ['blogId'],
  data() {
    return {
      commentArray: [],
      content: {
        blogId: this.blogId,
        comment: '',
        commentator: '',
      }
    }
  },
  methods: {
    DeleteComment(commentId) {
      this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.get('/comment/delete', {params: {commentId: commentId}})
            .then(res => {
              if (res.data.code === 200) {
                this.$message({
                  type: 'success',
                  message: `评论删除成功!`
                });
                setTimeout(() => {
                  this.reload()
                }, 500);
              }
            }).catch(e => {
          console.log(e)
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    GetAllCommentOf(blogId) {
      if (blogId) {
        this.$axios.get('/comment/list', {params: {blogId: blogId}})
            .then(res => {
              this.commentArray = res.data.data;
            })
      } else {
        console.log("文章id为空")
      }
    },

    SendComment() {
      console.log(this.content);
      this.$axios.post('/comment/publish', this.content).then(res => {
        this.GetAllCommentOf(this.blogId);
        this.content = {
          blogId: this.blogId,
        };
      })
    }
  },

  created() {
    this.GetAllCommentOf(this.blogId);
  }
}
</script>

<style lang="scss" scoped>
.top {
  overflow: hidden;
  position: relative;
  margin-bottom: 85px;

  .top-left,
  .top-right {
    float: left;
  }

  .top-left {
    margin-right: 25px;

    img {
      width: 130px;
    }
  }

  .top-right {
    div {
      margin: 15px 0;
    }

    .title {
      font-size: 25px;
      font-weight: 400;
    }

  }

  .top-right-btn {
    position: absolute;
    bottom: 1px;
    right: 0px;
  }
}

.bottom {
  .m-describe {
    margin-bottom: 25px;
  }

  .m-name-box {
    display: flex;
    margin-top: 10px;
    margin-bottom: 55px;
  }
}

.commentTotal {
  color: red;
}

.m-hot-comment {
  li {
    font-size: 14px;
    margin: 10px 0;
    width: 100%;
    border-bottom: 1px dashed rgb(204, 204, 204);

    .m-comment-box {
      padding: 15px 0;
      overflow: hidden;
      display: flex;

      .pic,
      .side {
        .nickname {
          color: skyblue;
        }

        .m-time {
          margin-top: 15px;

          .timer {
            color: #999;
          }

          i {
            margin-right: 8px;
          }

          .vertical {
            margin: 0 10px;
          }

          .delete {
            margin-right: 10px;
            color: skyblue;
            cursor: pointer
          }
        }
      }

      .pic {
        img {
          width: 50px;
          margin-right: 10px;
        }
      }

      .side {
        width: 93%;

        .m-time {
          .timer {
            float: left;
          }

          span {
            float: right;
          }
        }
      }
    }
  }
}

.My-new-icondianzan {
  cursor: pointer;
}

</style>
