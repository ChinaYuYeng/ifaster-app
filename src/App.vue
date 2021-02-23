<template>
  <div id="app">
    <transition name="fade-scale" mode="out-in">
      <keep-alive max="5" exclude="login">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ccc;
  font-size: 12px;
  overflow: hidden;
}
.fade-scale-leave-active,
.fade-scale-enter-active {
  transition: all 0.3s;
}
.fade-scale-enter {
  opacity: 0;
  transform: translateX(20px);
}
.fade-scale-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
