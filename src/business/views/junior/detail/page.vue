<template>
  <AppLayout>
    <Panel>
      <UserInfo>
        <span class="title__name">{{ data.name }}</span>
        <span>{{ data.mobile }}</span>
      </UserInfo>
    </Panel>
    <Panel>
      <van-cell title="订单数量" :value="data.rentOrderCount" is-link @click="routerTo({ name: '/rentOrder', params: { id: data.id } })"></van-cell>
      <van-cell title="电桩数量" :value="data.pileCount" is-link></van-cell>
      <van-cell title="租还点数量" :value="data.rentPointCount" is-link></van-cell>
      <van-cell title="电池数量" :value="data.batteryCount" is-link></van-cell>
    </Panel>
  </AppLayout>
</template>

<script>
export default {
  data() {
    return {
      data: {}
    };
  },
  created() {
    this.data = this.getTopInfo;
    console.log(this.data);
  },
  methods: {}
};
</script>

<style scoped>
.title__name {
  font-size: 15px;
  color: #455d78;
}
</style>
