<template>
  <AppLayout>
    <staffList :dataList="datalist"></staffList>
    <template #body-bottom>
      <van-button text="新增店员" @click="gotoAdd"></van-button>
    </template>
    <template #search>
      <Search :formData="searchForm"></Search>
    </template>
  </AppLayout>
</template>

<script>
import staffList from "./components/staffList";
import test from "./testImg/index-bac.png";
import Search from "./components/search";
export default {
  data() {
    return {
      test,
      searchForm: {
        id: 0,
        mobile: "",
        pageIndex: 1,
        pageSize: 10,
        parentId: 0,
        status: 0,
        template: 0
      },
      datalist: [
        { name: "店员1", status: "待审核", phone: "123456", img: test },
        { name: "店员2", status: "待审核", phone: "2222222", img: test },
        { name: "店员3", status: "权限名称", phone: "465465465", img: test }
      ]
    };
  },
  created() {
    this.getStaffList();
  },
  components: {
    staffList,
    Search
  },
  provide() {
    return {
      parent: this
    };
  },
  methods: {
    onSearch() {
      //写入后台交互
    },
    getStaffList() {
      this.$apis.audit(this.searchForm).then(res => {
        console.log(res.data);
      });
    },
    gotoAdd() {
      this.$router.push("/staff/qrcode");
    }
  }
};
</script>

<style scoped></style>
