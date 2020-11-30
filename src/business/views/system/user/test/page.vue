<template>
  <div>
    <button @click="change" class="test">tiawwo111</button>
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    debugger;
    console.log(this.$api.user);
    console.log(this.$api.loadMenu);
    console.log(this);
    console.log("oroppp");
  },
  mounted() {
    console.log("iam ounte");
  },
  methods: {
    change() {
      this.$router.push("/system/menu");
    }
  }
};
</script>

<style lang="less" scoped>
.test {
  font-size: 60px;
}
</style>
