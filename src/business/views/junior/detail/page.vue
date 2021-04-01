<template>
  <AppLayout>
    <Panel>
      <UserInfo>
        <span class="title__name">{{ data.name }}</span>
        <span>{{ data.mobile }}</span>
      </UserInfo>
    </Panel>
    <Panel>
      <van-cell title="租还点数量" :value="data.rentPointCount"></van-cell>
      <van-cell
        title="租赁订单数量"
        :value="data.rentOrderCount"
        is-link
        @click="routerTo({ name: '/rentOrder', params: { id: data.id } })"
      ></van-cell>
      <van-cell
        title="充电订单数量"
        :value="data.chargeOrderCount"
        is-link
        @click="routerTo({ name: '/chargeOrder', params: { id: data.id } })"
      ></van-cell>
      <van-cell
        title="电桩数量"
        :value="data.pileCount"
        is-link
        @click="routerTo({ name: '/pile', params: { operId: data.id, flag: 'noEdit' } })"
      ></van-cell>
      <van-cell
        title="电池数量"
        :value="data.batteryCount"
        is-link
        @click="routerTo({ name: '/battery', params: { operId: data.id, flag: 'noEdit' } })"
      ></van-cell>
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
