<template>
  <AppLayout>
    <PanelGroup>
      <Panel>
        <van-form :show-error-message="false" ref="form" label-width="50px">
          <van-field v-model="routeData.batteryImei" label="旧设备:" placeholder="输入旧设备" />
          <van-field v-model="newBattery.imei" label="新设备:" placeholder="输入新设备" :rules="[{ required: true, message: '请指定新的设备' }]">
            <template #button>
              <van-button
                icon="scan"
                type="primary"
                size="mini"
                style="height:26px;font-size:14px;transform: translateX(6px);vertical-align: middle;"
                @click.stop.prevent="onScan"
              ></van-button>
            </template>
          </van-field>
        </van-form>
        <van-search v-model="searchForm.imei" show-action placeholder="请输入imei搜索">
          <template #action>
            <van-button
              icon="search"
              type="primary"
              size="mini"
              style="height:34px;font-size:14px;width:34px;vertical-align: middle;"
              @click="onSearch"
            ></van-button>
          </template>
        </van-search>
      </Panel>
      <LoadList :loadStatus="loadStatus">
        <Panel v-for="(item, index) in dataList" :key="item.id" class="mtop10">
          <van-checkbox v-model="checkeds[index]" shape="square" ref="checkbox" @change="selectBattery(index, $event)">
            <div class="rentOrder__exchange-item">
              <img :src="batteryImg" style="width:30%;margin:0 8px;" />
              <div>
                <div class="content__item">
                  <span>电池imei:</span>
                  <span>{{ item.imei }}</span>
                </div>
                <div class="content__item">
                  <span>所属门店:</span>
                  <span>{{ item.onRentPointName }}</span>
                </div>
                <div class="content__item">
                  <span>收费模板:</span>
                  <span>{{ item.rentFeeTemplateName }}</span>
                </div>
                <div class="content__item">
                  <span>租赁状态:</span>
                  <span>{{ item.rentStatusDesc }}</span>
                </div>
              </div>
            </div>
          </van-checkbox>
        </Panel>
      </LoadList>
    </PanelGroup>
    <SubmitBtn text="确定替换" block :onSubmit="onSubmit"></SubmitBtn>
  </AppLayout>
</template>

<script>
import wx from "weixin-jsapi";
import loadList from "@@/mixins/loadList";
import batteryImg from "@/assets/images/battery.png";
export default {
  mixins: [loadList],
  data() {
    return {
      checkeds: [],
      routeData: this.$route.params,
      batteryImg,
      newBattery: {},
      searchForm: {
        imei: "",
        rentOrderId: ""
      }
    };
  },
  created() {
    this.searchForm.rentOrderId = this.routeData.id;
    this.setListLoader(paging => {
      return this.$apis.getExchangeList({ ...this.searchForm, ...paging });
    });
  },
  methods: {
    onSubmit() {
      return this.$refs.form.validate().then(() => {
        return this.$apis.exchangeBattery({ batteryId: this.newBattery.id, rentOrderId: this.routeData.id }).then(() => {
          return new Promise(resolve => {
            this.$toast.success({
              message: "替换成功",
              duration: 2000,
              onClose: () => {
                this.$router.go(-2);
                resolve();
              }
            });
          });
        });
      });
    },
    selectBattery(index, checked) {
      if (checked === void 0) return;
      if (checked) {
        this.checkeds = new Array(this.dataList.length);
        this.newBattery = this.dataList[index];
        this.checkeds[index] = true;
      } else {
        this.newBattery = {};
      }
    },
    getWxReady(url) {
      return this.$apis.jsTicket({ url }).then(res => {
        var jsondata = res.data;
        wx.config({
          // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          debug: true,
          // 必填，公众号的唯一标识
          appId: jsondata.appId,
          // 必填，生成签名的时间戳
          timestamp: "" + jsondata.timestamp,
          // 必填，生成签名的随机串
          nonceStr: jsondata.noncestr,
          // 必填，签名
          signature: jsondata.signature,
          // 必填，需要使用的JS接口列表，所有JS接口列表
          jsApiList: jsondata.jsApiList
        });
        wx.error(function(res) {
          console.log("微信接口初始化报错：", res);
        });
      });
    },
    onScan() {
      const _this = this;
      let url = window.location.href.split("#")[0]; //"http://dev.issks.com/ifaster-v2";
      this.getWxReady(url).then(() => {
        wx.ready(() => {
          console.log("21212");
          wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success(res) {
              var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
              _this.$apis.getBatteryByScan({ qrcode: result, rentOrderId: _this.routeData.id }).then(res => {
                _this.newBattery = res.data;
              });
            }
          });
        });
      });
    },
    onSearch() {
      this.setListLoader();
    }
  }
};
</script>

<style lang="less" scoped>
.rentOrder__exchange-item {
  display: flex;
  align-items: center;
}
</style>
