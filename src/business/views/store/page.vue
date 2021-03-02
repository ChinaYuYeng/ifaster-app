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
      :sideBarActive="activeSideBarIndex"
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
      defaultIcon: "",
      activeSideBarIndex: 0
    };
  },
  provide() {
    return {
      setSelected: this.setSelected,
      updateData: this.updateData
    };
  },
  created() {
    this.sideBarActive = 0;
    this.setSideBarActive(0);
    // 运营商 和 电池数据
    this.getBatteryInfo();
    // 底部按钮
    const _this = this;
    let btnChangeB = {
      id: 1,
      name: "批量调拨",
      click: function() {
        _this.$router.push({ path: "/store/transfer" });
      },
      route: ""
    };
    let btnClaimB = {
      id: 2,
      name: "批量认领",
      click: function() {
        _this.$router.push({ path: "/store/claim" });
      },
      route: ""
    };
    this.btns.push(btnChangeB);
    this.btns.push(btnClaimB);

    this.defaultIcon = this.batteryImg;
  },
  methods: {
    updateData(bar, index) {
      this.collapseHeader = bar.name;
      if (this.active == 0) {
        // 电池
        this.getOperatorBatteryInfo(bar);
      } else {
        // 电桩
        this.getOperatorPileInfo(bar);
      }
      this.activeSideBarIndex = index;
      this.setSideBarActive(index);
    },
    // 默认加载数据
    showStore() {
      this.children = [];
      this.active = this.getOperationType;
      // this.setOperationType(this.getOperationType);
      if (this.getOperationType == 0) {
        this.getBatteryInfo();
      } else {
        this.getPileInfo();
      }
      this.activeSideBarIndex = this.getSideBarActive;
    },
    // 保存选择信息
    setSelected() {
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
            operator: this.getBatteryOperatorInfo.name,
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
            operator: this.getPileOperatorInfo.name,
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
        this.getBatteryInfo();
        // this.defaultIcon = this.batteryImg;
      } else {
        // 电桩
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
            this.bars = r.data;
            if (r.data.length > 0) {
              this.collapseHeader = r.data[this.getSideBarActive].name;
              this.getOperatorBatteryInfo(r.data[this.getSideBarActive]);
            } else {
              this.children = [];
              this.collapseHeader = "";
            }
          }
        })
        .catch(e => console.log(e));

      this.defaultIcon = this.batteryImg;
      // console.log(this.defaultIcon);
    },
    getOperatorBatteryInfo(operator) {
      this.setBatteryOperatorInfo(operator);
      this.$apis.battery
        .repositoryList({ id: operator.value })
        .then(res => {
          this.children = [];
          if (res.code == "1" && res.data && res.data.length > 0) {
            this.setRepositories({ c: "battery", data: res.data[0].listItemVos });
            for (let i = 0; i < res.data.length; i++) {
              let d = res.data[i];
              // let rows = [];
              let lists = [];
              for (let j = 0; j < d.listItemVos.length; j++) {
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
              this.children.push(child);
            }
          }
        })
        .catch(e => console.log(e));
    },
    getPileInfo() {
      this.$apis.pile
        .operatorList({})
        .then(r => {
          if (r.code == "1") {
            this.setOperators({ c: "pile", data: r.data });
            this.bars = r.data;
            if (r.data.length > 0) {
              this.collapseHeader = r.data[this.sideBarActive].name;
              this.getOperatorPileInfo(r.data[this.sideBarActive]);
            } else {
              this.children = [];
              this.collapseHeader = "";
            }
          }
        })
        .catch(e => console.log(e));

      this.defaultIcon = this.chargingImg;
    },
    getOperatorPileInfo(operator) {
      this.setPileOperatorInfo(operator);
      this.$apis.pile
        .repositoryList({ id: operator.value })
        .then(res => {
          this.children = [];
          if (res.code == "1" && res.data && res.data.length > 0) {
            this.setRepositories({ c: "pile", data: res.data[0].listItemVos });
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
              this.children.push(child);
            }
          }
        })
        .catch(e => console.log(e));
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
