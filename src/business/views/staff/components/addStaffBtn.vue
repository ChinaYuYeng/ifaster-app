<template>
  <div>
    <button class="addStaff" @click="gotoAdd">新增店员</button>
  </div>
</template>

<script>
export default {
  methods: {
    gotoAdd() {
      this.$router.push("/staff/qrcode");
    }
  }
};
</script>

<style scoped>
.addStaff {
  float: right;
  width: 25%;
  background-color: #fff;
  border: 1px solid #95a0b6;
  border-radius: 7px;
}
</style>
