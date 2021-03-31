<template>
  <AppLayout :onRefresh="onRefresh" @onshow="onRefresh">
    <LoadList :loadStatus="loadStatus">
      <div v-for="(item, index) in dataList" :key="index" @click="routeTo(item)">
        <staffList :item="item"></staffList>
      </div>
    </LoadList>
    <template #body-bottom>
      <van-button text="新增店员" @click="gotoAdd"></van-button>
    </template>
    <template #search="scope">
      <Search v-on:setSearchForm="resetForm" :onSearch="onSearch.bind(this, scope)" :point="pointList" :searchForm="searchForm"></Search>
    </template>
  </AppLayout>
</template>

<script>
import staffList from "./components/staffList";
import test from "./testImg/index-bac.png";
import Search from "./components/search";
import loadList from "@@/mixins/loadList";
export default {
  mixins: [loadList],
  data() {
    return {
      test,
      pointList: [],
      searchForm: {
        mobile: "",
        rentPointId: "",
        status: ""
      },
      datalist: []
    };
  },
  activated() {
    this.getPointList();
    this.searchForm.rentPointId = this.$route.params.id || "";
    this.searchForm.status = this.$route.params.status || "";
    if (this.$route.params.pointId) {
      this.savePointId(this.$route.params.pointId);
    } else {
      this.savePointId("");
    }
    this.setListLoader(paging => {
      return this.$apis.list({ ...this.searchForm, ...paging });
    });
  },
  components: {
    staffList,
    Search
  },
  methods: {
    onRefresh() {
      return this.setListLoader();
    },
    onSearch({ close }) {
      return this.setListLoader().then(close);
    },
    getPointList() {
      this.$apis.point({}).then(res => {
        this.pointList = res.data;
      });
    },
    resetForm() {
      this.searchForm = {
        mobile: "",
        rentPointId: "",
        status: ""
      };
    },
    routeTo(item) {
      this.saveMessage(item);
      if (this.getPointId !== "") {
        this.$router.push({
          path: "/staff/bindStation"
        });
      } else {
        if (item.status == 0) {
          this.$router.push({
            path: "/staff/detail"
          });
        } else if (item.status == 1) {
          this.$router.push({
            path: "/staff/permission"
          });
        }
      }
    },
    gotoAdd() {
      this.$router.push("/staff/qrcode");
    }
  }
};
</script>

<style scoped></style>
