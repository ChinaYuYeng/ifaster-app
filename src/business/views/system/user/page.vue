<template>
  <div>
    <button @click="change">tiao111</button>
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
    console.log("oouuuul7111");
  },
  mounted() {
    console.log("iam mountedddddd");
  },
  methods: {
    change() {
      this.$router.push("/system/menu");
    }
  }
};
</script>

<style lang="less" scoped></style>
