<template>
  <AppLayout>
    <van-tabs :active="active" :before-change="beforeChange">
      <van-tab v-for="(t, index) in tabs" :key="index" :value="index">
        <template #title>
          <span class="iconfont" v-html="t.icon"></span>
          <span class="iconfont">{{ t.name }}</span>
        </template>
      </van-tab>
    </van-tabs>
    <SidebarCollapse
      :bars="bars"
      :children="children"
      :btns="btns"
      :summary="summary"
      :errIcon="defaultIcon"
      :collapseHeader="collapseHeader"
    ></SidebarCollapse>
  </AppLayout>
</template>

<script>
// import SidebarCollapse from "@@/components/sidebarCollapse";
import batteryImg from "../../../assets/images/battery.png";
import chargingImg from "../../../assets/images/charging.png";
export default {
  components: {},
  data() {
    return {
      active: 0,
      batteryImg: batteryImg,
      chargingImg: chargingImg,
      tabs: [
        {
          icon: "&#xe609;",
          name: " 电池"
        },
        {
          icon: "&#xe65c;",
          name: " 电桩"
        }
      ],
      bOperatorList: [],
      batteries: [],
      pOperatorList: [],
      piles: [],
      bars: [],
      collapseHeader: "",
      children: [],
      btns: [],
      summary: null,
      defaultIcon: ""
    };
  },
  created() {
    // 运营商 和 电池数据
    // for (let i = 1; i < 5; i++) {
    //   let operator = {
    //     id: i,
    //     name: "测试" + i
    //   };
    //   this.bOperatorList.push(operator);

    //   if (i == 1) {
    //     let battery = {
    //       model: "4815",
    //       percent: "20%",
    //       title: "",
    //       list: []
    //     };
    //     battery.title = "比例：" + battery.percent + "（" + battery.model + "）";
    //     for (let j = 1; j < 2; j++) {
    //       let row1 = {
    //         name: "电池imei：",
    //         value: "123456789"
    //       };
    //       let row2 = {
    //         name: "电池型号：",
    //         value: "4815"
    //       };
    //       let row = [];
    //       row.push(row1);
    //       row.push(row2);
    //       let item = {
    //         id: j,
    //         imei: "电池" + j,
    //         model: "4815",
    //         rows: row
    //       };

    //       battery.list.push(item);
    //     }
    //     this.batteries.push(battery);
    //   }
    // }

    // this.collapseHeader = "运营商ABCDEF";
    // this.children = this.batteries;
    this.getBatteryInfo();
    // 底部按钮
    let btnChangeB = {
      id: 1,
      name: "批量调拨",
      click: "changeBattery",
      route: "/store/transfer"
    };
    let btnClaimB = {
      id: 2,
      name: "批量认领",
      click: "claimBattery",
      route: "/store/claim"
    };
    this.btns.push(btnChangeB);
    this.btns.push(btnClaimB);

    this.defaultIcon = this.batteryImg;
  },
  methods: {
    beforeChange(index) {
      if (index == 0) {
        // 电池
        console.log(1);
        this.getBatteryInfo();
        // this.defaultIcon = this.batteryImg;
      } else {
        // 电桩
        console.log(2);
        this.getPileInfo();
        // this.defaultIcon = this.chargingImg;
      }
      this.active = index;
    },
    getBatteryInfo() {
      this.$apis.battery
        .operatorList({})
        .then(r => {
          if (r.code == "1") {
            this.setOperators({ c: "battery", data: r.data });
            this.bars = this.getBOperators;
            this.collapseHeader = r.data[0].name;
            //
            debugger;
            this.$apis.battery
              .repositoryList({ id: r.data[0].id })
              .then(res => {
                if (res.code == "1" && res.data && res.data.length > 0) {
                  this.setRepositories({ c: "pile", data: res.data.listItemVos });
                  this.children = res.data.listItemVos;
                  this.title = "比例：" + res.data.percent + "（" + res.data.model + "）";
                }
              })
              .catch(e => console.log(e));
          }
        })
        .catch(e => console.log(e));

      this.defaultIcon = this.batteryImg;
    },
    getPileInfo() {
      this.$apis.pile
        .operatorList()
        .then(r => {
          if (r.code == "200") {
            this.pile.setOperators(r.data);
            this.bars = r.data;
            this.collapseHeader = r.data[0].name;
            //
            this.$apis.pile
              .repositoryList({ id: r.data[0].id })
              .then(res => {
                this.pile.setRepositories(res.data.listItemVos);
                this.children = res.data.listItemVos;
                this.title = "比例：" + res.data.percent + "（" + res.data.model + "）";
              })
              .catch(e => console.log(e));
          }
        })
        .catch(e => console.log(e));

      this.defaultIcon = this.chargingImg;
    },
    routeTo(path) {
      this.$router.push({ path });
    }
  }
};
</script>

<style lang="less" scoped>
.index__Income {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
