<template>
  <AppLayout>
    <van-row>
      <van-col span="24"><Info></Info></van-col>
    </van-row>
    <van-row>
      <van-col span="24"><Percent></Percent></van-col>
    </van-row>
    <template #body-bottom class="wrap">
      <van-row>
        <van-col span="8" offset="8">
          <van-button type="primary" text="下一步" block @click="routerTo({ name: '/store/transfer/select' })" size="mini"></van-button>
        </van-col>
      </van-row>
    </template>
  </AppLayout>
</template>

<script>
// import SidebarCollapse from "@@/components/sidebarCollapse";
import Info from "../components/info";
import Percent from "../components/percent";
export default {
  components: {
    Info,
    Percent
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.wrap {
  width: 100%;
  text-align: center;
}
</style>
