<template>
  <div>
    <van-cell>
      <span class="temp__title">{{ item.name }}</span>
      <button class="edit__btn" @click="gotoEdit(item)">编辑</button>
    </van-cell>
    <van-cell v-for="(item1, index) in item.json" :key="index">
      <span class="per__title">{{ item1.pername }}</span>
      <span class="per__status">{{ item1.status }}</span>
    </van-cell>
    <van-cell>
      <!-- <button class="addTemp__btn" @click="useTemp">使用此模板</button> -->
      <slot></slot>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  methods: {
    gotoEdit(item) {
      this.$router.push({
        name: "/staff/editTemp",
        params: { data: item }
      });
    }
    // useTemp(item) {
    //   this.$router.go(-1);
    //   this.saveTempId(item.id);
    // }
  }
};
</script>

<style scoped>
.temp__bar {
  margin-top: 10px;
}
.temp__title {
  color: #ffb031;
  font-size: 15px;
  font-weight: 600;
}
.edit__btn {
  border: none;
  background-color: #fff;
  color: #888888;
  float: right;
}
.per__status {
  float: right;
  color: #acacac;
}
.addTemp__btn {
  /* float: right; */
  width: 40%;
  border: 1px solid #55babb;
  border-radius: 5px;
  background-color: #fff;
  color: #55babb;
  float: left;
  margin-bottom: 5px;
}
.delTemp__btn {
  width: 30%;
  border: 1px solid #55babb;
  border-radius: 5px;
  background-color: #55babb;
  color: #fff;
  float: left;
  margin-bottom: 5px;
  margin-left: 30%;
}
</style>
