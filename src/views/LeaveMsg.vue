<template>
  <div>
    <el-card>
      <div style="padding: 20px; text-align: center; margin: 40px; font-size: 18px; font-weight: bold">
        <h3>欢迎留言</h3>
      </div>
      <Comment :blogId="id"></Comment>
    </el-card>
  </div>
</template>

<script>
import Comment from "@/components/Comment";
export default {
  name: "LeaveMsg",
  data() {
    return {
      id: 1,
    }
  },
  components: {
    Comment,
  }
}
</script>

<style lang="scss" scoped>

</style>
