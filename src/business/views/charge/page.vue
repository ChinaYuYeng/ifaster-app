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
          <CList :item="item" v-if="clist"></CList>
          <DList :item="item" v-else></DList>
        </van-cell>
      </LoadList>
      <van-button type="primary" size="large" @click="addM == true ? addRentM() : addPileM()">{{ btnMessage }}</van-button>
    </van-tabs>
  </AppLayout>
</template>

<script>
import CList from "./components/CList";
import DList from "./components/DList";
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
      rentInfo: {},
      pileInfo: {},
      clist: true
    };
  },
  created() {
    this.setListLoader(paging => {
      if (this.active === 0) {
        this.clist = true;
        return this.$apis.rent.getRentInfo({ ...paging });
      } else {
        this.clist = false;
        return this.$apis.pile.getPileInfo({ ...paging });
      }
    });
  },
  methods: {
    onRefresh() {
      return this.setListLoader();
    },
    addRentM() {
      console.log("11");
      this.$router.push({ path: "/charge/editrent" });
    },
    addPileM() {
      console.log("22");
      this.$router.push({ path: "/charge/editpile" });
    },
    // 操作Tab选项卡按钮时的方法
    beforeChange(index) {
      if (index == 0) {
        this.clist = true;
        this.onRefresh();
        this.btnMessage = "新建电池收费模板";
        console.log("当前处于----电池,收费模板" + this.active + index);
        this.addM = true;
      } else {
        this.onRefresh();
        // 在点击电桩收费模板Tab时调用获取电桩收费模板列表API
        this.clist = false;
        this.btnMessage = "新建电桩收费模板";
        console.log("当前处于----电桩,收费模板" + this.active + index);
        this.addM = false;
      }
      this.active = index;
    }
    // getRentInfo() {
    //   this.$apis.rent
    //     .getRentInfo({
    //       pageIndex: 1,
    //       pageSize: 10
    //     })
    //     .then(res => {
    //       console.log(res.data);
    //       // this.rentInfo = res.data;
    //       if (res && res.code === "1") {
    //         console.log("请求成功！");
    //         this.rentInfo = res.data; // 把传回来数据赋给rentInfo（列表中的数据）
    //       } else {
    //         console.log("请求失败！");
    //         this.rentInfo = [];
    //       }
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // },
    // getPileList() {
    //   this.$apis.pile
    //     .getPilelist({
    //       pageIndex: 1,
    //       pageSize: 10
    //     })
    //     .then(res => {
    //       console.log(res.data);
    //       if (res && res.code === "1") {
    //         console.log("请求成功！");
    //         this.pileInfo = res.data; // 把传回来数据赋给pileInfo（列表中的数据）
    //       } else {
    //         console.log("请求失败！");
    //         this.pileInfo = [];
    //       }
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // }
  },
  components: {
    CList,
    DList
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
