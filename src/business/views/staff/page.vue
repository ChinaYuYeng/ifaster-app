<template>
  <AppLayout>
    <template slot="body-top">
      <Panel>
        <addStaff></addStaff>
      </Panel>
    </template>
    <staffList :dataList="datalist"></staffList>
  </AppLayout>
</template>

<script>
import addStaff from "./components/addStaffBtn";
import staffList from "./components/staffList";
export default {
  data() {
    return {
      datalist: [
        { name: "店员1", status: "待审核", phone: "123456", img: require("./testImg/index-bac.png") },
        { name: "店员2", status: "待审核", phone: "2222222", img: require("./testImg/index-bac.png") },
        { name: "店员3", status: "权限名称", phone: "465465465", img: require("./testImg/index-bac.png") }
      ]
    };
  },
  components: {
    staffList,
    addStaff
  }
};
</script>

<style scoped></style>
