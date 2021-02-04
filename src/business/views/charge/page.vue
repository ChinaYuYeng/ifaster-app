<template>
  <AppLayout ref="report__wrap" :onRefresh="onRefresh">
    <van-tabs :before-change="beforeChange" :active="active">
      <van-tab v-for="(t, index) in title" :key="index" :value="index">
        <template #title>
          <span class="iconfont" v-html="t.icon"></span>
          <span>{{ t.name }}</span>
        </template>
      </van-tab>
      <LoadList :loadStatus="loadStatus">
        <van-cell v-for="(item, index) in dataList" :key="index">
          <CList :item="item"></CList>
        </van-cell>
      </LoadList>
      <van-button type="primary" size="large" @click="addM == true ? addBatteryM() : addPilM()">{{ btnMessage }}</van-button>
    </van-tabs>
  </AppLayout>
</template>

<script>
import CList from "./components/CList";
import loadList from "@@/mixins/loadList";
export default {
  mixins: [loadList],
  data() {
    return {
      addM: true,
      btnMessage: "新建电池收费模板",
      active: 0,
      title: [
        {
          icon: "&#xe609;",
          name: " 电池收费模板"
        },
        {
          icon: "&#xe65c;",
          name: " 电桩收费模板"
        }
      ],
      batteryInfo: {}
    };
  },
  created() {
    // this.getBatterylist();

    this.setListLoader(paging => {
      return this.$apis.getBatterylist({ ...paging });
    });
  },
  methods: {
    onRefresh() {
      return this.setListLoader();
    },
    addBatteryM() {
      console.log("11");
      this.$router.push({ path: "/charge/editbattery" });
    },
    addPilM() {
      console.log("22");
      this.$router.push({ path: "/charge/editpile" });
    },
    beforeChange(index) {
      if (index == 0) {
        this.getBatterylist();
        this.btnMessage = "新建电池收费模板";
        console.log("当前处于电池收费模板");
        this.addM = true;
      } else {
        this.btnMessage = "新建电桩收费模板";
        console.log("当前处于电桩收费模板");
        this.addM = false;
      }
      this.active = index;
    },
    getBatterylist() {
      this.$apis
        .getBatterylist({
          pageIndex: 1,
          pageSize: 10
        })
        .then(res => {
          console.log(res.data);
          // this.batteryInfo = res.data;
          if (res && res.code === "1") {
            console.log("请求成功！");
            this.batteryInfo = res.data; // 把传回来数据赋给batteryInfo（列表中的数据）
          } else {
            console.log("请求失败！");
            this.batteryInfo = [];
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  components: {
    CList
  }
};
</script>

<style lang="less" scoped>
.van-button--large {
  position: fixed;
  width: 95%;
  bottom: 1.2rem;
}
</style>
