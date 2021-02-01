<template>
  <AppLayout>
    <LoadList :loadData="loadData">
      <van-cell center v-for="(item, index) in rentList" :key="index" is-link @click="routerTo({ name: '/rentMar/detail' })">
        <template #title>
          <span class="iconfont theme-font">&#xe635;</span>
          <span style="padding-left:5px;">{{ item.name }}</span>
        </template>
        <template #label>
          <div class="tag__group">
            <van-tag type="primary">异地收</van-tag>
            <van-tag type="success">异点收</van-tag>
          </div>
        </template>
      </van-cell>
    </LoadList>
    <template #body-bottom>
      <van-button text="新增租还点" @click="routerTo({ name: '/rentMar/add' })"></van-button>
    </template>
  </AppLayout>
</template>

<script>
export default {
  data() {
    return {
      rentList: []
    };
  },
  methods: {
    loadData() {
      return new Promise(resolve => {
        this.rentList.push({
          name: "长寿路"
        });
        resolve(this.rentList);
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
