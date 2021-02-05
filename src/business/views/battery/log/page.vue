<template>
  <AppLayout ref="report__wrap" :onRefresh="onRefresh">
    <LoadList :loadStatus="loadStatus">
      <Panel v-for="item in dataList" :key="item.date" class="mtop10">
        <div class="content__item order__header" slot="header">
          <span class="item__title">操作类型</span>
          <span>{{ item.type }}</span>
        </div>
        <div class="content__item">
          <span class="item__label">操作人员:</span>
          <span>{{ item.operatorName }}</span>
        </div>
        <div class="content__item">
          <span class="item__label">操作时长(分钟):</span>
          <span>{{ item.duration }}</span>
        </div>
        <div class="content__item order__footer" slot="footer">
          <span>{{ item.createTime }}</span>
        </div>
      </Panel>
    </LoadList>
  </AppLayout>
</template>

<script>
import loadList from "../mixins/loadList";
export default {
  mixins: [loadList],
  data() {
    return {
      finished: false,
      loading: false
    };
  },
  created() {
    this.setListLoader(() => {
      return this.$apis.log({ id: this.getbatteryInfo.id });
    });
  },
  methods: {
    onRefresh() {
      return this.setListLoader();
    }
  }
};
</script>

<style lang="less" scoped>
.item__title {
  color: #353535;
  font-weight: 600;
  border-left: 3px solid #55babb;
  padding-left: 3px;
}
.item__label {
  margin-left: 5px;
  color: #353535;
}
</style>
