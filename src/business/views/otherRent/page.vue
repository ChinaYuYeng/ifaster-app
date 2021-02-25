<template>
  <AppLayout @onshow="showOtherRent">
    <van-row class="row">
      <van-col span="6"><SidebarIndex :bars="bars" ref="leftSidebar"></SidebarIndex></van-col>
      <van-col span="18">
        <div v-for="(box, index) in boxes" :key="index">
          <van-row>
            <van-col class="row">
              <van-cell-group>
                <van-cell :value="box.pointName" value-class="header-cell" />
              </van-cell-group>
            </van-col>
          </van-row>
          <van-row>
            <van-col class="row"><CollapseIndex :collapses="box.children" :errIcon="defaultIcon"></CollapseIndex></van-col>
          </van-row>
        </div>
      </van-col>
    </van-row>
    <van-row class="row action-bar" v-if="showAction">
      <van-col span="24">
        <ActionBar :btns="btns" :summary="summary"></ActionBar>
      </van-col>
    </van-row>
  </AppLayout>
</template>

<script>
import batteryImg from "../../../assets/images/battery.png";
export default {
  name: "shelf",
  provide() {
    return {
      updateData: this.updateData,
      changeOtherCollapse: this.changeOtherCollapse
    };
  },
  components: {},
  data() {
    return {
      batteryImg,
      piles: [],
      bars: [],
      boxes: [],
      btns: [],
      defaultIcon: ""
    };
  },
  created() {
    this.getManagerInfo();
    const _this = this;
    let btn = {
      id: 1,
      name: "批量归还",
      click: function() {
        _this.$router.push({ path: "/otherRent/return" });
      }
    };
    this.btns.push(btn);

    this.defaultIcon = this.batteryImg;
  },
  mounted() {},
  computed: {
    summary() {
      let sum = "";
      let seleted = this.boxes.find(c => c.children.findIndex(d => d.checked == true) > -1);
      // let seleted = this.boxes.find(c => c.checked == true);
      if (seleted) {
        let seletedChildren = seleted.children.find(d => d.checked == true);
        if (seletedChildren) {
          let name = seletedChildren.name;
          let cnt = seletedChildren.list.reduce((accumulator, currentValue) => {
            if (currentValue.checked) {
              accumulator++;
            }
            return accumulator;
          }, 0);
          sum = name + " 数量：" + cnt;
        }
      }
      return sum;
    },
    showAction() {
      let seleted = this.boxes.find(c => c.children.findIndex(d => d.checked == true) > -1);
      if (seleted) {
        return true;
      }
      return false;
    }
  },
  methods: {
    // 取消其他门店的选中状态
    changeOtherCollapse(checkedId) {
      this.boxes.forEach(b => {
        b.children.forEach(child => {
          if (child.list.findIndex(d => d.id == checkedId) == -1) {
            child.checked = false;
            child.list.forEach(c => (c.checked = false));
          }
        });
      });
    },

    showOtherRent() {
      this.children = [];
      this.getManagerInfo();
    },
    updateData(bar) {
      this.setManager({ operatorName: bar.name, operatorMobile: bar.mobile });
      this.getBatteryInfo(bar.id);
    },
    // 保存选择信息
    setSelected() {
      // debugger;
      let selected = [];
      this.boxes.forEach(b => {
        let selectedChild = b.children.find(child => child.checked == true);
        if (selectedChild) {
          selected = selectedChild.list.filter(l => l.checked == true).map(c => c.id);
        }
      });
      let bInfo = {
        ids: selected
      };
      this.setSelectedInfo(bInfo);
    },
    getManagerInfo() {
      this.$apis
        .managerList({})
        .then(r => {
          if (r.code == "1") {
            this.bars = [];
            r.data.forEach(d => {
              let short = d.operatorName;
              if (d.operatorName.length > 4) {
                short = short.substring(0, 4);
              }
              this.bars.push({ id: d.operatorId, name: d.operatorName, shortName: short, mobile: d.operatorMobile });
            });
            console.log(this.bars);
            if (r.data.length > 0) {
              this.setManager(r.data[0]);
              this.getBatteryInfo(r.data[0].operatorId);
            }
          }
        })
        .catch(e => console.log(e));

      this.defaultIcon = this.batteryImg;
    },
    getBatteryInfo(operatorId) {
      this.$apis
        .list({ id: operatorId })
        .then(res => {
          this.boxes = [];
          if (res.code == "1") {
            this.setBatteryList(res.data);
            for (let i = 0; i < res.data.points.length; i++) {
              let child = [];
              let d = res.data.points[i];
              // let rows = [];
              for (let j = 0; j < d.types.length; j++) {
                let type = d.types[j];
                let lists = [];
                for (let k = 0; k < type.devices.length; k++) {
                  let device = type.devices[k];
                  let row = [];
                  let row1 = {
                    name: "电池IMEI:",
                    value: device.imei
                  };
                  let row2 = {
                    name: "所属门店:",
                    value: device.pointName
                  };
                  let row3 = {
                    name: "收费模板:",
                    value: device.templateName
                  };
                  let row4 = {
                    name: "租赁状态:",
                    value: device.rentStatus
                  };
                  row.push(row1);
                  row.push(row2);
                  row.push(row3);
                  row.push(row4);
                  let item = {
                    checked: false,
                    id: device.id,
                    imei: device.imei,
                    model: device.model,
                    rows: row
                  };
                  // let oneList = Object.assign(item, { rows: [rows] });
                  lists.push(item);
                }

                let child2 = {
                  checked: false,
                  list: lists,
                  // percent: d.percent * 100 + "%",
                  model: type.model,
                  name: "设备类型：" + type.model,
                  title: "设备类型：" + type.model
                };
                child.push(child2);
              }
              let box = {
                checked: false,
                children: child,
                pointName: d.pointName
              };
              this.boxes.push(box);
            }
          }
        })
        .catch(e => console.log(e));
    },
    routeTo(path) {
      this.$router.push({ path });
    }
  },
  watch: {
    boxes: {
      handler: function() {
        this.setSelected();
        return this.summary;
      },
      deep: true
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

.row {
  width: 100%;
}
.action-bar {
  position: absolute;
  bottom: 0;
  text-align: center;
}
.header-cell {
  color: @theme-color;
}
</style>
