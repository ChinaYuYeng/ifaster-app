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
      :sideBarActive="sideBarActive"
    ></SidebarCollapse>
    <template #body-bottom class="wrap" v-if="showScan">
      <van-row>
        <van-col span="12" offset="6">
          <van-button type="default" @click="scan" size="mini" block plain text="扫一扫" :icon="scanImg"></van-button>
        </van-col>
      </van-row>
    </template>
  </AppLayout>
</template>

<script>
import scanImg from "./img/scan.png";
import batteryImg from "../../../assets/images/battery.png";
import wx from "weixin-jsapi";
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
      scanImg,
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
      sideBarActive: "",
      showScan: true,
      wxReady: false
    };
  },
  activated() {
    this.showShelf();
    let url = "";
    let ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
      url = window.location.href.split("#")[0];
    } else if (/android/.test(ua)) {
      url = window.location.href;
    }
    this.getWxReady(url);
  },
  created() {
    //this.scanImg.width = 20;
    console.log(this.$refs);
    this.sideBarActive = 0;
    this.getPointInfo();
    // 底部按钮
    const _this = this;
    let btnChangeB = {
      id: 1,
      name: "批量下架",
      click: function() {
        _this.getDown();
      }
    };

    this.btns.push(btnChangeB);

    this.defaultIcon = this.batteryImg;
    this.setPointIndex(0);
  },
  mounted() {
    const _this = this;
    this.$nextTick(() => {
      this.$watch("$refs.mySidebarCollapse.$refs.leftSidebar.active", val => {
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
  computed: {
    // showScan() {
    //   return !this.$refs.mySidebarCollapse.showAction;
    // }
  },
  methods: {
    scan() {
      let _this = this;
      if (this.wxReady) {
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success(res) {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            // alert("扫描结果：" + result);
            _this.$apis.detail({ qrcode: result }).then(rs => {
              if (rs.code == "1" && rs.data && rs.data.id) {
                let bInfo = {
                  ids: [rs.data.id]
                };
                _this.setSelectedInfo(bInfo);
                _this.getOn();
              } else {
                _this.$toast(rs.msg);
              }
            });
          }
        });
      }
    },
    getWxReady(url) {
      this.$apis.jsTicket({ url: url }).then(res => {
        var jsondata = res.data;
        wx.config({
          // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          debug: false,
          // 必填，公众号的唯一标识
          appId: jsondata.appId,
          // 必填，生成签名的时间戳
          timestamp: "" + jsondata.timestamp,
          // 必填，生成签名的随机串
          nonceStr: jsondata.noncestr,
          // 必填，签名
          signature: jsondata.signature,
          // 必填，需要使用的JS接口列表，所有JS接口列表
          jsApiList: ["checkJsApi", "scanQRCode"]
        });

        wx.ready(() => {
          this.wxReady = true;
        });
      });
    },
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
      this.sideBarActive = this.getPointIndex;
      this.getPointInfo();
      const _this = this;
      this.$nextTick(() => {
        this.$watch("$refs.mySidebarCollapse.$refs.leftSidebar.active", val => {
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

        this.$watch("$refs.mySidebarCollapse.showAction", val => {
          this.showScan = !val;
        });
      });
    },
    updateData(bar, index) {
      // let bar = this.bars[index];
      this.setPointIndex(index);
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
              this.collapseHeader = r.data[this.getPointIndex].name;
              this.getPointPutawayList(r.data[this.getPointIndex].id);
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
                title: "设备类型：" + d.model + " 数量：" + lists.length
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
