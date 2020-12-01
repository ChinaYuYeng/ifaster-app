<template>
  <div>
    <button @click="change" class="test">tiawwo111</button>
    <router-view />
  </div>
</template>

<script>
import base from "@/business/mixins/base";
export default {
  mixins: [base],
  created() {
    debugger;
    console.log(this.$api.user);
    console.log(this.$api.loadMenu);
    console.log(this);
    console.log("orp");
    this.fetchData();
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
