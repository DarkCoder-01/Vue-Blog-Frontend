<template>
  <div id="app">
    <router-view v-if="isReloadAlive"></router-view>
  </div>
</template>
<script>
export default {
  provide() {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      name: 'App',
      isReloadAlive: true,
    }
  },
  methods: {
    reload() {
      this.isReloadAlive = false;
      this.$nextTick(function(){
        this.isReloadAlive = true;
      })
    }
  }
}
</script>
<style>
html,body {
  height: 100%;
  width: 100%;
  background-color: #EEEEEE;
}
</style>
