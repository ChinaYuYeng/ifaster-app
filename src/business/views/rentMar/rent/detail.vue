<template>
  <AppLayout @onshow="onRefresh">
    <van-cell is-link @click="routerTo({ name: '/rentMar/detail/edit', params: routerData })">
      <template #title>
        <span class="iconfont theme-font">&#xe635;</span>
        <span style="padding-left:5px;">{{ routerData.name }}</span>
        <div>地址：{{ routerData.address }}</div>
        <div>营业时间：{{ routerData.openNote }}</div>
        <div>营业状态：{{ routerData.statusDesc }}</div>
      </template>
      <template #label>
        <div class="tag__group">
          <van-tag type="success" v-if="routerData.otherPlaceReturn">异地收</van-tag>
          <van-tag type="success" v-if="routerData.otherPointReturn">异点收</van-tag>
        </div>
      </template>
    </van-cell>
    <PanelGroup>
      <Panel @touchmove.native.stop.prevent>
        <div id="rentMar__map" style="width:100%; height:200px;"></div>
      </Panel>
      <Panel v-if="!getSelectMod">
        <van-cell
          title="店员人数"
          is-link
          :value="routerData.staffNum"
          @click="routerTo({ name: '/staff', params: { id: routerData.id, status: 1 } })"
        />
        <van-cell title="绑定店员" is-link @click="routerTo({ name: '/staff', params: { pointId: routerData.id, status: 1 } })" />
        <van-cell
          title="已租设备"
          is-link
          :value="routerData.rentDeviceNum"
          @click="routerTo({ name: '/battery', params: { rentStatus: [2], id: [routerData.id] } })"
        />
        <van-cell
          title="空闲设备"
          is-link
          :value="routerData.freeDeviceNum"
          @click="routerTo({ name: '/battery', params: { rentStatus: [0, 1], id: [routerData.id] } })"
        />
        <van-cell title="分佣设置" is-link @click="routerTo({ name: '/rentMar/detail/assign' })" />
      </Panel>
    </PanelGroup>
    <div id="rentMar_qrCode"></div>
    <div style="text-align:center;">还车二维码</div>
  </AppLayout>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      routerData: this.$route.params
    };
  },
  mounted() {
    this.initMap();
    this.initCode();
    this.setCurrentPointId(this.routerData.id);
    this.onRefresh();
  },
  activated() {
    this.$apis.getPointDetail({ id: this.routerData.id }).then(res => {
      this.routerData = res.data;
    });
  },
  methods: {
    onRefresh() {
      this.fetchData().then(() => {
        document.getElementById("rentMar__map").replaceChildren(this.divMap);
        document.getElementById("rentMar_qrCode").replaceChildren(this.divQrcode);
      });
    },
    fetchData() {
      return this.$apis.getPointDetail({ id: this.routerData.id }).then(res => {
        this.routerData = res.data;
        this.qrcode.makeCode(this.routerData.qrcode);
      });
    },
    initCode() {
      this.divQrcode = document.createElement("div");
      this.divQrcode.style.cssText = `display: flex;height: 120px;justify-content: center;align-items: center;`;
      this.qrcode = new QRCode(this.divQrcode, {
        width: 100,
        height: 100,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
      document.getElementById("rentMar_qrCode").appendChild(this.divQrcode);
    },
    initMap() {
      const lnglat = [this.routerData.lng || 120.755511, this.routerData.lat || 30.746992];
      this.divMap = document.createElement("div");
      this.divMap.style.cssText = "width:100%; height:100%;";
      document.getElementById("rentMar__map").appendChild(this.divMap);
      AMapLoader.load({
        key: "21a1ca7e415887a172fe8399bd114b28",
        version: "2.0"
      }).then(AMap => {
        (this.map = new AMap.Map(this.divMap, {
          zoom: 15,
          center: lnglat
        })).add(
          new AMap.Marker({
            position: lnglat
          })
        );
      });
    }
  },
  beforeDestroy() {
    this.map.destroy();
    this.map = null;
    this.divMap.remove();
    this.divMap = null;
    this.qrcode && this.qrcode.clear();
    this.qrcode = null;
    this.divQrcode.remove();
    this.divQrcode = null;
  }
};
</script>

<style lang="less" scoped></style>
