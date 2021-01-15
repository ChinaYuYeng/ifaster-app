<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {
    this.$store.dispatch("menu");
  }
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ccc;
  font-size: 12px;
}
</style>
