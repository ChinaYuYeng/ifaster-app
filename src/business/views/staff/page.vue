<template>
  <AppLayout>
    <staffList :dataList="datalist"></staffList>
    <template #body-bottom>
      <van-button text="新增店员" @click="gotoAdd"></van-button>
    </template>
  </AppLayout>
</template>

<script>
import staffList from "./components/staffList";
import test from "./testImg/index-bac.png";
export default {
  data() {
    return {
      test,
      datalist: [
        { name: "店员1", status: "待审核", phone: "123456", img: test },
        { name: "店员2", status: "待审核", phone: "2222222", img: test },
        { name: "店员3", status: "权限名称", phone: "465465465", img: test }
      ]
    };
  },
  components: {
    staffList
  },
  methods: {
    gotoAdd() {
      this.$router.push("/staff/qrcode");
    }
  }
};
</script>

<style scoped></style>
