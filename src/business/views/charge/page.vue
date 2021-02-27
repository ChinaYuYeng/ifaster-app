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
        <Panel v-for="item in dataList" :key="item.id" class="mtop10">
          <div class="content__item order__header" slot="header" @click="gotoDetail(item)">
            <img class="list-img" :src="item.img" alt="" />
            <div class="content_h3">
              <h3>{{ item.name }}</h3>
              <span class="tips" v-if="active == 0">{{ getTips(item.rentModel) }}</span>
            </div>
            <van-icon class="arrow-icon" name="arrow" size="20" color="#B2B2B2" />
          </div>
        </Panel>
      </LoadList>
      <van-button type="primary" size="large" @click="addM == true ? addRentM() : addPileM()">{{ btnMessage }}</van-button>
    </van-tabs>
  </AppLayout>
</template>

<script>
import batteryImg from "../../../assets/images/battery.png";
import chargingImg from "../../../assets/images/charging.png";
import loadList from "@@/mixins/loadList";
export default {
  mixins: [loadList],
  data() {
    return {
      batteryImg: batteryImg,
      chargingImg: chargingImg,
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
      ]
    };
  },
  created() {
    this.getRentData();
    // this.getPileData();
  },
  methods: {
    gotoDetail(item) {
      if (this.active == 0) {
        this.SaveRentList(item);
        this.$router.push({
          path: "/charge/editrent"
        });
      } else {
        this.SavePileInfo(item);
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
      // return this.setListLoader();
    },
    // 加载电池收费模板列表
    getRentData() {
      this.setListLoader(paging => {
        return this.$apis.rent({ ...paging });
      });
    },
    // 加载电桩收费模板列表
    getPileData() {
      this.setListLoader(paging => {
        return this.$apis.pile({ ...paging });
      });
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
        this.getRentData();
      } else {
        this.getPileData();
      }
      this.active = index;
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
