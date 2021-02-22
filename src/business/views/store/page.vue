<template>
  <AppLayout @onshow="showStore">
    <van-sticky :offset-top="60">
      <van-tabs :active="active" :before-change="beforeChange" ref="storeTabs">
        <van-tab v-for="(t, index) in tabs" :key="index" :value="index">
          <template #title>
            <span class="iconfont" v-html="t.icon"></span>
            <span class="iconfont">{{ t.name }}</span>
          </template>
        </van-tab>
      </van-tabs>
    </van-sticky>
    <SidebarCollapse
      ref="mySidebarCollapse"
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
      batteryImg,
      chargingImg,
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
  provide() {
    return {
      setSelected: this.setSelected
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
    // 默认加载数据
    showStore() {
      this.children = [];
      let index = 0;
      this.active = index;
      this.setOperationType(index);
      this.getBatteryInfo();
    },
    // 保存选择信息
    setSelected() {
      // debugger;
      let selected = this.children.find(c => c.checked == true);
      if (selected) {
        if (this.active == 0) {
          // 设备来源 分成比例 设备型号 设备数量
          let scnt = selected.list.reduce((a, i) => {
            if (i.checked) {
              a++;
            }
            return a;
          }, 0);
          let ids = selected.list.filter(c => c.checked == true).map(c => c.id);
          //.join(",");
          let bInfo = {
            ids: ids,
            operator: this.getBOperators[this.$refs.mySidebarCollapse.$refs.leftSidebar.active].name,
            percent: selected.percent,
            model: selected.model,
            cnt: scnt,
            img: this.batteryImg
          };
          this.setSelectedBatteryInfo(bInfo);
        } else {
          let scnt = selected.list.reduce((a, i) => {
            if (i.checked) {
              a++;
            }
            return a;
          }, 0);
          let ids = selected.list.filter(c => c.checked == true).map(c => c.id);
          //.join(",");
          let pInfo = {
            ids: ids,
            operator: this.getBOperators[this.$refs.mySidebarCollapse.$refs.leftSidebar.active].name,
            percent: selected.percent,
            model: selected.model,
            cnt: scnt,
            img: this.chargingImg
          };
          this.setSelectedPileInfo(pInfo);
        }
      }
      // console.log("new111");
      // console.log(this.children);
    },
    beforeChange(index) {
      this.children = [];
      // 设置操作类型
      this.setOperationType(index);
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
            // debugger;
            this.$apis.battery
              .repositoryList({ id: r.data[0].value })
              .then(res => {
                if (res.code == "1" && res.data && res.data.length > 0) {
                  this.setRepositories({ c: "battery", data: res.data[0].listItemVos });

                  for (let i = 0; i < res.data.length; i++) {
                    let d = res.data[i];
                    // let rows = [];
                    let lists = [];
                    for (let j = 0; j < d.listItemVos.length; j++) {
                      // let item = d.listItemVos[j];
                      let row = [];
                      let row1 = {
                        name: "电池IMEI:",
                        value: d.listItemVos[j].imei
                      };
                      let row2 = {
                        name: "电池型号:",
                        value: d.listItemVos[j].model
                      };

                      row.push(row1);
                      row.push(row2);
                      //debugger;
                      let item = {
                        checked: false,
                        id: d.listItemVos[j].id,
                        imei: d.listItemVos[j].imei,
                        model: d.listItemVos[j].model,
                        rows: row
                      };
                      // let oneList = Object.assign(item, { rows: [rows] });
                      lists.push(item);
                    }

                    let child = {
                      checked: false,
                      list: lists,
                      percent: d.percent * 100 + "%",
                      model: d.model,
                      name: "比例：" + d.percent * 100 + "%",
                      title: "比例：" + d.percent * 100 + "%" + "（" + d.model + "）"
                    };
                    // debugger;
                    this.children.push(child);
                  }
                }
              })
              .catch(e => console.log(e));
          }
        })
        .catch(e => console.log(e));

      this.defaultIcon = this.batteryImg;
      // console.log(this.defaultIcon);
    },
    getPileInfo() {
      this.$apis.pile
        .operatorList({})
        .then(r => {
          if (r.code == "1") {
            this.setOperators({ c: "pile", data: r.data });
            this.bars = r.data;
            this.collapseHeader = r.data[0].name;
            //
            this.$apis.pile
              .repositoryList({ id: r.data[0].value })
              .then(res => {
                if (res.code == "1" && res.data && res.data.length > 0) {
                  this.setRepositories({ c: "pile", data: res.data[0].listItemVos });
                  this.children = [];
                  for (let i = 0; i < res.data.length; i++) {
                    let d = res.data[i];
                    // let rows = [];
                    let lists = [];
                    for (let j = 0; j < d.listItemVos.length; j++) {
                      // let item = d.listItemVos[j];
                      let row = [];
                      let row1 = {
                        name: "电桩IMEI:",
                        value: d.listItemVos[j].imei
                      };
                      let row2 = {
                        name: "电桩型号:",
                        value: d.listItemVos[j].model
                      };

                      row.push(row1);
                      row.push(row2);
                      //debugger;
                      let item = {
                        checked: false,
                        id: d.listItemVos[j].id,
                        imei: d.listItemVos[j].imei,
                        model: d.listItemVos[j].model,
                        rows: row
                      };
                      // let oneList = Object.assign(item, { rows: [rows] });
                      lists.push(item);
                    }

                    let child = {
                      checked: false,
                      list: lists,
                      percent: d.percent * 100 + "%",
                      model: d.model,
                      name: "比例：" + d.percent * 100 + "%",
                      title: "比例：" + d.percent * 100 + "%" + "（" + d.model + "）"
                    };
                    // debugger;
                    this.children.push(child);
                  }
                }
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
  },
  watch: {}
};
</script>

<style lang="less" scoped>
.index__Income {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
