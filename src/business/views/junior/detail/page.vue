<template>
  <AppLayout>
    <Panel>
      <UserInfo :avatar="data.imgurl">
        <span class="title__name">{{ data.name }}</span>
        <span>{{ data.phone }}</span>
      </UserInfo>
    </Panel>
    <Panel>
      <van-cell title="订单数量" :value="data.order" is-link></van-cell>
      <van-cell title="电桩数量" :value="data.pile" is-link></van-cell>
      <van-cell title="租还点数量" :value="data.point" is-link></van-cell>
      <van-cell title="电池数量" :value="data.battery" is-link></van-cell>
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
    this.data = this.$route.query.data;
  }
};
</script>

<style scoped>
.title__name {
  font-size: 15px;
  color: #455d78;
}
</style>
