<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "system-user",
  created() {
    console.log(this.$api.user);
    console.log(this.$api.loadMenu);
    console.log(this);
    console.log("oouuuul77777888899997");
  },
  mounted() {
    console.log("iam mountedddddd");
  }
};
</script>

<style lang="less" scoped></style>
