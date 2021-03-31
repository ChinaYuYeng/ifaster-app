<template>
  <AppLayout ref="report__wrap" :onRefresh="onRefresh" @onshow="onRefresh">
    <van-tabs :before-change="beforeChange" :active="active" v-show="!getSelectMod">
      <van-tab v-for="(t, index) in title" :key="index" :value="index">
        <template #title>
          <span class="iconfont" v-html="t.icon"></span>
          <span>{{ t.name }}</span>
        </template>
      </van-tab>
    </van-tabs>
    <LoadList :loadStatus="loadStatus">
      <Panel v-for="item in dataList" :key="item.id" class="mtop10">
        <div class="content__item order__header" slot="header" @click="gotoDetail(item)">
          <img class="list-img" :src="item.img" alt="" />
          <div class="content_h3">
            <h3>{{ item.name }}</h3>
            <span class="tips" v-if="active == 0">{{ getTips(item.price.rentModel) }}</span>
          </div>
          <van-icon class="arrow-icon" name="arrow" size="20" color="#B2B2B2" />
          <van-button size="small" icon="plus" style="margin-left:20px;" @click.stop="selectChargeItem(item)" v-if="getSelectMod"></van-button>
        </div>
      </Panel>
    </LoadList>
    <van-button type="primary" size="large" @click="addM == true ? addRentM() : addPileM()">{{ btnMessage }}</van-button>
  </AppLayout>
</template>

<script>
import loadList from "@@/mixins/loadList";
export default {
  mixins: [loadList],
  data() {
    return {
      addM: true,
      btnMessage: "新增租赁收费模板",
      active: 0,
      title: [
        {
          icon: "&#xe609;",
          name: " 租赁收费模板"
        },
        {
          icon: "&#xe65c;",
          name: " 充电收费模板"
        }
      ]
    };
  },
  activated() {
    this.routeAction = this.$route.params.$$action || {};
    // this.getRentData();
    // 是否开启列表选择模式
    this.setSelectMod(!!this.routeAction.selectChargeItem);
    if (this.$route.params.chooseFlag == 1) {
      this.active = 1;
      this.btnMessage = "新增充电收费模板";
    } else {
      this.active = 0;
      this.btnMessage = "新增租赁收费模板";
    }
    this.onRefresh();
  },
  methods: {
    selectChargeItem(item) {
      this.routeAction.selectChargeItem(item);
      this.$router.back();
    },
    gotoDetail(item) {
      if (this.active == 0) {
        this.SaveRentList(item);
        this.$router.push({
          path: "/charge/editrent"
        });
      } else {
        this.SavePileList(item);
        this.$router.push({
          path: "/charge/editpile"
        });
      }
    },
    imgResult() {
      let showImg = "";
      if (this.item.img) {
        showImg = this.item.img;
      } else {
        showImg = this.batteryImg;
      }
      return showImg;
    },
    getTips(rentModel) {
      if (rentModel == 1) {
        return "保证金模式";
      } else {
        return "预付费模式";
      }
    },
    onRefresh() {
      this.dataList = [];
      if (this.active == 0) {
        this.getRentData();
      } else {
        this.getPileData();
      }
    },
    // 加载--租赁--收费模板列表
    getRentData() {
      this.setListLoader(paging => {
        this.dataList = [];
        return this.$apis.getRentList({ ...paging });
      });
    },
    // 加载--电桩--收费模板列表
    getPileData() {
      this.setListLoader(paging => {
        this.dataList = [];
        return this.$apis.getPileList({ ...paging });
      });
    },
    //进入新增--租赁--模板页面
    addRentM() {
      // console.log("11--进入新增--租赁--模板页面");
      this.$router.push({ name: "/charge/editrent", params: { a: 1 } });
    },
    //进入新增--充电--模板页面
    addPileM() {
      // console.log("22--进入新增--充电--模板页面");
      this.$router.push({ name: "/charge/editpile", params: { a: 1 } });
    },
    // 操作Tab选项卡按钮时的方法
    beforeChange(index) {
      if (index == 0) {
        this.getRentData();
        this.btnMessage = "新增租赁收费模板";
        this.addM = true;
      } else {
        this.getPileData();
        this.btnMessage = "新增充电收费模板";
        this.addM = false;
      }
      this.active = index;
      this.SaveActivat(index);
    }
  }
};
</script>

<style lang="less" scoped>
.van-button--large {
  // position: fixed;
  width: 95%;
  // bottom: 1.2rem;
}
.list-img {
  width: 20%;
  border: 1px solid #dddddd;
  float: left;
  margin: 0 5px;
}
.content_h3 {
  flex: 1;
  text-align: left;
}
.content_h3 > h3 {
  color: #888;
}
</style>
