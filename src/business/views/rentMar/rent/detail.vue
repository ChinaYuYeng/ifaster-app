<template>
  <AppLayout>
    <van-cell is-link>
      <template #title>
        <span class="iconfont theme-font">&#xe635;</span>
        <span style="padding-left:5px;">xxxx</span>
        <div>地址：xxxx</div>
        <div>营业时间：xxx</div>
        <div>营业状态：xxxx</div>
      </template>
      <template #label>
        <div class="tag__group">
          <van-tag type="primary">异地收</van-tag>
          <van-tag type="success">异点收</van-tag>
        </div>
      </template>
    </van-cell>
    <PanelGroup>
      <Panel @touchmove.native.stop.prevent>
        <div id="rentMar__map" style="width:100%; height:100px;"></div>
      </Panel>
      <Panel>
        <van-cell title="店员人数" is-link value="3" />
        <van-cell title="已租设备" is-link value="12" />
        <van-cell title="空闲设备" is-link value="1" />
        <van-cell title="分佣设置" is-link @click="routerTo({ name: '/rentMar/detail/assign' })" />
      </Panel>
    </PanelGroup>
  </AppLayout>
</template>

<script>
export default {
  mounted() {
    AMapLoader.load({
      key: "21a1ca7e415887a172fe8399bd114b28",
      version: "2.0"
    }).then(AMap => {
      new AMap.Map("rentMar__map", {
        zoom: 11,
        center: [107.4976, 32.1697]
      });
    });
  },
  methods: {}
};
</script>

<style lang="less" scoped></style>
