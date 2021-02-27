<template>
  <AppLayout @onshow="showShelf">
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
export default {
  name: "shelf",
  provide() {
    return {
      setSelected: this.setSelected,
      updateData: this.updateData
    };
  },
  components: {},
  data() {
    return {
      batteryImg,
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
    debugger;
    this.getPointInfo();
    // 底部按钮
    const _this = this;
    let btnChangeB = {
      id: 1,
      name: "批量下架",
      click: function() {
        console.log("1234");
        _this.getDown();
      }
    };

    this.btns.push(btnChangeB);

    this.defaultIcon = this.batteryImg;
  },
  mounted() {
    const _this = this;
    this.$nextTick(() => {
      this.$watch("$refs.mySidebarCollapse.$refs.leftSidebar.active", val => {
        // debugger;
        this.btns = [];
        if (this.bars[val].id > 0) {
          this.btns.push({
            id: 1,
            name: "批量下架",
            click: function() {
              _this.getDown();
            },
            route: "/shelf/getOff"
          });
        } else {
          this.btns.push({
            id: 2,
            name: "批量上架",
            click: function() {
              _this.getOn();
            },
            route: "/shelf/getOn"
          });
        }
      });
    });
  },
  computed: {},
  methods: {
    getOn() {
      this.$router.push({ path: "/shelf/onShelf" });
    },
    getDown() {
      this.$apis.down({ ids: this.getSelectedInfo.ids }).then(res => {
        if (res.code == "1") {
          this.$toast.success(res.msg);
          this.showShelf();
        } else {
          this.$toast.fail(res.msg);
        }
      });
    },
    showShelf() {
      this.children = [];
      this.getPointInfo();
    },
    updateData(bar) {
      this.collapseHeader = bar.name;
      this.getPointPutawayList(bar.id);
    },
    // 保存选择信息
    setSelected() {
      let selected = this.children.find(c => c.checked == true);
      if (selected) {
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
          operator: this.getPointList[this.$refs.mySidebarCollapse.$refs.leftSidebar.active].name,
          model: selected.model,
          cnt: scnt,
          img: this.batteryImg
        };
        this.setSelectedInfo(bInfo);
      }
      // console.log("new111");
      // console.log(this.children);
    },
    getPointInfo() {
      this.$apis
        .pointList({})
        .then(r => {
          if (r.code == "1") {
            this.setPointList(r.data);
            this.bars = r.data;
            this.bars.push({ id: 0, name: "未上架", shortName: "未上架" });
            if (r.data.length > 0) {
              this.collapseHeader = r.data[0].name;
              this.getPointPutawayList(r.data[0].id);
            } else {
              this.collapseHeader = "";
            }
          }
        })
        .catch(e => console.log(e));

      this.defaultIcon = this.batteryImg;
    },
    getPointPutawayList(id) {
      this.$apis
        .putawayList({ pointId: id })
        .then(res => {
          this.children = [];
          if (res.code == "1") {
            this.setPutawayList(res.data);
            for (let i = 0; i < res.data.length; i++) {
              let d = res.data[i];
              // let rows = [];
              let lists = [];
              for (let j = 0; j < d.devices.length; j++) {
                let row = [];
                let row1 = {
                  name: "电池IMEI:",
                  value: d.devices[j].imei
                };
                let row2 = {
                  name: "所属门店:",
                  value: d.devices[j].pointName
                };
                let row3 = {
                  name: "收费模板:",
                  value: d.devices[j].templateName
                };
                let row4 = {
                  name: "租赁状态:",
                  value: d.devices[j].rentStatus
                };
                row.push(row1);
                row.push(row2);
                row.push(row3);
                row.push(row4);
                let item = {
                  checked: false,
                  id: d.devices[j].id,
                  imei: d.devices[j].imei,
                  model: d.devices[j].model,
                  rows: row
                };
                // let oneList = Object.assign(item, { rows: [rows] });
                lists.push(item);
              }

              let child = {
                checked: false,
                list: lists,
                // percent: d.percent * 100 + "%",
                model: d.model,
                name: "设备类型：" + d.model,
                title: "设备类型：" + d.model
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
