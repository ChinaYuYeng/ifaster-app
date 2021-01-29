<template>
  <div>
    <van-row>
      <van-col :span="8">
        <p class="title">
          在线状态
        </p>
        <p class="value">当前状态：{{ status1 }}</p>
        <button class="btn">检测</button>
      </van-col>
      <van-col :span="8">
        <p class="title">
          运营状态
        </p>
        <p class="value">当前状态：{{ status2 }}</p>
        <button class="btn">设置</button>
      </van-col>
      <van-col :span="8">
        <p class="title">
          使用状态
        </p>
        <p class="value">当前状态：{{ status3 }}</p>
        <button class="btn">刷新</button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status1: "在线",
      status2: "运营中",
      status3: "充电中"
    };
  },
  props: {
    // titles:{
    //     type:Array,
    //     default:[
    //     ]
    // }
  }
};
</script>

<style scoped>
* {
  color: #95a0b6;
  margin: 0;
  padding: 0;
  font-size: 10px;
  text-align: center;
}
.title {
  color: #000000;
  font-weight: 600;
  margin-top: 10px;
}
.value {
  margin-top: 10px;
}
.btn {
  border: none;
  border-radius: 15px;
  padding: 5px 15px;
  margin-top: 10px;
}
</style>
