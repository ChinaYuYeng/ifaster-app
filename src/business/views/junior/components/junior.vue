<template>
  <div>
    <UserInfo>
      <span class="title__name">{{ dataItem.name }}</span>
      <span>{{ dataItem.mobile }}</span>
    </UserInfo>
    <van-icon name="arrow" size="15px" class="arrow__icon" v-if="hasArrow" />
    <div class="list__item">
      <span>订单数量:{{ dataItem.rentOrderCount }}</span>
      <span>租还点数量:{{ dataItem.rentPointCount }}</span>
    </div>
    <div class="list__item">
      <span>电池数量:{{ dataItem.batteryCount }}</span>
      <span>电桩数量:{{ dataItem.pileCount }}</span>
    </div>
    <button v-if="hasDetail" class="check_btn" @click="godetail">查看详情</button>
  </div>
</template>

<script>
export default {
  props: {
    hasDetail: Boolean,
    dataItem: Object,
    hasArrow: {
      type: Boolean,
      default: true
    },
    godetail: {
      type: Function,
      default: function() {}
    }
  }
};
</script>

<style>
.title__name {
  color: #66798b;
  font-size: 15px;
}
.list__item {
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
}
.list__item span {
  margin-left: 15%;
  width: 30%;
  color: #66798b;
}
.check_btn {
  border: 1px solid #55babb;
  border-radius: 5px;
  color: #55babb;
  background-color: #fff;
  width: 25%;
  margin-bottom: 15px;
  position: relative;
  left: 70%;
  top: 15px;
}
.child__item {
  margin: 15px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #f4f4f6;
}
.arrow__icon {
  position: relative;
  left: 90%;
  top: -40px;
}
</style>
