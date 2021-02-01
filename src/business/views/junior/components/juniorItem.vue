<template>
  <div>
    <Panel>
      <UserInfo :avatar="JuniorList.imgurl">
        <span class="title__name">{{ JuniorList.name }}</span>
        <span>{{ JuniorList.phone }}</span>
      </UserInfo>
      <div class="list__item">
        <span>订单数量:{{ JuniorList.order }}</span>
        <span>租还点数量:{{ JuniorList.battery }}</span>
      </div>
      <div class="list__item">
        <span>电池数量:{{ JuniorList.point }}</span>
        <span>电桩数量:{{ JuniorList.pile }}</span>
      </div>
      <button class="check_btn" @click="godetail">查看详情</button>
    </Panel>
    <Panel style="margin-top:10px">
      <van-cell title="下级情况"></van-cell>
      <div v-for="(item, index) in JuniorList.children" :key="index" class="child__item">
        <UserInfo :avatar="item.imgurl">
          <span class="title__name">{{ item.name }}</span>
          <span>{{ item.phone }}</span>
        </UserInfo>
        <van-icon name="arrow" size="15px" class="arrow__icon" />
        <div class="list__item">
          <span>订单数量:{{ item.order }}</span>
          <span>租还点数量:{{ item.battery }}</span>
        </div>
        <div class="list__item">
          <span>电池数量:{{ item.point }}</span>
          <span>电桩数量:{{ item.pile }}</span>
        </div>
      </div>
    </Panel>
  </div>
</template>

<script>
export default {
  props: {
    JuniorList: Object
  },
  methods: {
    godetail() {
      this.$router.push({
        path: "/junior/detail",
        query: { data: this.JuniorList }
      });
    }
  }
};
</script>

<style scoped>
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
