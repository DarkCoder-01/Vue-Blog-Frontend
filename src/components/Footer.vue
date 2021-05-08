<template>
  <div class="m-footer">
    <div class="m-content">
      <p>
        <span>
          Copyright © www.darkcoder.com All Rights Reserved.
        </span>
      </p>
      <p>
        <span>

        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.m-footer {
  width: 100%;
  height: 80px;
  background-color: #333333;
  position: relative;
  .m-content {
    position:absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    color: #fff;
    font-size: 14px;
     p {
      margin-top: 5px;
      text-align: center;
      span {
          line-height: 30px;
      }
    }
  }
}
</style>
