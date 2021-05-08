<template>
  <div>
    <el-card>
      <div slot="header">
        <div style="right: auto">
          <el-button type="primary" plain @click="back">返回</el-button>
        </div>
      </div>
      <el-form hide-required-asterisk :model="blog" :rules="rules" ref="blog">
        <div style="display: inline-block; width: 15%">
          <el-form-item prop="source">
            <el-select v-model="blog.source" placeholder="文章来源">
              <el-option
                  v-for="item in sources"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div style="display: inline-block; width: 70%">
          <el-form-item prop="title">
            <el-input placeholder="请输入文章标题" v-model="blog.title"></el-input>
          </el-form-item>
        </div>
        <div style="display: inline-block; width: 15%">
          <el-form-item prop="classification">
            <el-select
                v-model="blog.classification"
                filterable
                allow-create
                placeholder="请输入分类"
                >
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div style="margin-top: 20px; padding: 20px; text-align: center;">
          <el-form-item prop="coverUrl">
            <el-upload
                drag
                name="image"
                ref="cover"
                :headers="headers"
                :action="fileHost"
                :show-file-list="false"
                :on-success="handleCoverSuccess"
                :on-error="handleCoverError"
                :before-upload="beforeCoverUpload"
            >
              <el-image v-if="blog.coverUrl" :src="blog.coverUrl" class="avatar" fit="contain"></el-image>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击</em>选择文章封面</div>
              <div class="el-upload__tip" slot="tip" style="max-width: 100%; justify-content: center">只能上传jpg/png文件，且不超过4MB</div>
            </el-upload>
          </el-form-item>
        </div>
        <div style="margin-top: 20px">
          <el-form-item prop="content">
            <mavon-editor
                v-model="blog.content"
                :boxShadow="false"
                code-style="atom-one-dark"
                @imgAdd="imgAdd"
                @imgDel="imgDel"
                ref=md
            />
          </el-form-item>
        </div>
        <div style="margin-top: 20px;">
          <el-form-item>
            <el-select
                style="width: 100%"
                v-model="blog.tags"
                filterable
                allow-create
                multiple
                placeholder="请选择文章标签"
              >
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="m-check-box">
          <div class="wrapper">
            <div>
              <el-checkbox v-model="recommend">推荐到首页</el-checkbox>
              <el-checkbox v-model="commentable">允许评论</el-checkbox>
              <el-checkbox v-model="isDynamic">发布到个人动态</el-checkbox>
            </div>
            <div class="m-send-btn">
              <el-button type="primary" @click="submitForm('blog')">立即发表</el-button>
            </div>
          </div>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      fileHost: this.$axios.defaults.baseURL + "/upload",
      options: [
        {
          value: "vue",
          label: "vue",
        },
        {
          value: "elementUI",
          label: "elementUI",
        },
        {
          value: "axios",
          label: "axios",
        },
        {
          value: "vue-router",
          label: "vue-router",
        },
        {
          value: "vuex",
          label: "vuex",
        },
        {
          value: "java",
          label: "java",
        },
        {
          value: "springboot",
          label: "springboot",
        },
        {
          value: "nginx",
          label: "nginx",
        },
        {
          value: "redis",
          label: "redis",
        },
        {
          value: "tomcat-apache",
          label: "tomcat-apache",
        },
        {
          value: "mysql",
          label: "mysql",
        }
      ],
      //为上传文件添加头部认证权限token
      headers: {'token': this.$store.getters.getToken},

      //文章来源
      sources: [
        {
          value: '原创',
          label: '原创'
        },
        {
          value: '转载',
          label: '转载'
        },
        {
          value: '翻译',
          label: '翻译'
        }
      ],

      recommend: true,
      commentable: true,
      isDynamic: false,
      inputVisible: false,
      inputValue: '',

      blog: {
        id: '',
        source: '',
        title: '',
        coverUrl: '',
        content: '',
        classification: '',
        tags: [],
      },
      rules: {
        source: [
          { required: true, message: '请选择博客来源', trigger: 'change' },
        ],
        title: [
          { required: true, message: '请输入博客标题', trigger: 'blur' },
        ],
        classification: [
          { required: true, message: '请输入博客分类', trigger: 'change' },
        ],
        content: [
          { required: true, message: '请输入博客内容', trigger: 'change' },
        ],
        tags: [
          { required: true, message: '请选择博客标签', trigger: 'change' },
        ],
        coverUrl: [
          { required: true, message: '请上传博客封面', trigger: 'change' },
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs.cover.submit();
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.blog);
          this.blog.tags = this.blog.tags.join(',');
          console.log(this.blog);
          const _this = this;
          this.$axios.post('/blog/edit', this.blog).then((res) => {
            if (res.data.code === 200) {
              _this.$alert('发表成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push('/home');
                }
              });
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    //当封面上传成功时，将服务器返回的图片路径回显
    handleCoverSuccess(res) {
      this.blog.coverUrl = res.data;
    },

    handleCoverError(res) {
      console.log(res);
    },

    //校验文件类型
    beforeCoverUpload(file) {
      console.log(file.type)
      const isLt4M = file.size / 1024 / 1024 < 4;
      if (!isLt4M) {
        this.$message.error('上传封面大小不能超过 4MB!');
      }
      return isLt4M;
    },

    imgAdd(pos, file){
      const formData = new FormData();
      formData.append('image', file);
      this.$axios.post('/upload', formData).then((res) => {
        const url = res.data.data;
        this.$refs.md.$img2Url(pos, url);
      })
    },

    imgDel(pos, file) {
      console.log("触发删除动作");
    },

    GetBlogById(id) {
      this.$axios.get('/blog/'+id).then(res => {
        const data = res.data.data;
        this.blog.source = data.source;
        this.blog.title = data.title;
        this.blog.classification = data.classification;
        this.blog.content = data.content;
        this.blog.coverUrl = data.coverUrl;
        this.blog.tags = data.tags.split(',').sort();
      })
    },

    back() {
      this.$router.go(-1);
    }
  },
  created() {
    const blogId = this.$route.params.id;
    if(blogId) {
      this.blog.id = blogId;
      this.GetBlogById(blogId);
    }
  }
}
</script>

<style lang="scss" scoped>
.m-check-box {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 10px;

  .wrapper {
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    position: relative;
    .m-send-btn {
      position: absolute;
      right: 0;
    }
  }
}

.m-blog-content {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.el-upload {
  border: 2px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.el-upload:hover {
  border-color: #409EFF;
}

.cover-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  line-height: 178px;
  text-align: center;
}
</style>
