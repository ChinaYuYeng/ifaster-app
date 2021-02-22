<template>
  <AppLayout>
    <van-dropdown-menu class="select__bar" active-color="#78849E">
      <van-dropdown-item v-model="value1" :options="option1" />
    </van-dropdown-menu>
    <div class="code__bar"></div>
    <p class="code__intro">{{ value1 }}注册-唯一二维码</p>
  </AppLayout>
</template>
<script>
export default {
  data() {
    return {
      select: "",
      option1: [
        { text: "分账人员", value: "分账人员" },
        { text: "店员（店员）", value: "店员（店员）" },
        { text: "店员（店长）", value: "店员（店长）" }
      ],
      value1: "分账人员"
    };
  }
};
</script>

<style scoped>
.code__bar {
  width: 60%;
  height: 200px;
  background-color: #dddd;
  margin-left: 20%;
  margin-top: 20px;
}
.code__intro {
  text-align: center;
}
</style>
