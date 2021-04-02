<template>
  <AppLayout :onRefresh="onRefresh">
    <LoadList :loadStatus="loadStatus">
      <van-cell is-link center @click="routerTo({ name: '/rentMar/detail/assign/detail' })" v-for="item in dataList" :key="item.id">
        <UserInfo>
          <span style="font-size:12px;line-height: 12px;">{{ item.name }}</span>
          <span style="font-size:12px;line-height: 12px;">{{ item.mobile }}</span>
        </UserInfo>
      </van-cell>
    </LoadList>
    <template #body-bottom>
      <van-button text="新增分佣人员" @click="routerTo({ name: '/rentMar/detail/assign/add' })"></van-button>
    </template>
    <template #search="scope">
      <anSearch :onSearch="onSearch.bind(this, scope)" :searchForm="searchForm"></anSearch>
    </template>
  </AppLayout>
</template>

<script>
import loadList from "@@/mixins/loadList";
import anSearch from "../components/anSearch";
export default {
  mixins: [loadList],
  components: {
    anSearch
  },
  data() {
    return {
      searchForm: {
        mobile: "",
        name: "",
        pointId: "",
        percent: ""
      }
    };
  },
  created() {
    this.setListLoader(paging => {
      return this.$apis.getAssignList({ ...this.searchForm, ...paging });
    });
  },
  methods: {
    onRefresh() {
      return this.setListLoader();
    },
    onSearch({ close }) {
      return this.setListLoader().then(close);
    }
  }
};
</script>

<style lang="less" scoped></style>
