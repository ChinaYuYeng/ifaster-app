<template>
  <div>
    <van-row>
      <van-col :span="8">
        <p class="title">
          在线状态
        </p>
        <p class="value">当前状态：{{ this.statusData.isOnlineDesc }}</p>
        <button class="btn" @click="getOnline">检测</button>
      </van-col>
      <van-col :span="8">
        <p class="title">
          强锁电池
        </p>
        <p class="value">当前状态：{{ this.statusData.lockStatusDesc }}</p>
        <button class="btn" @click="forceUnlock">锁定</button>
      </van-col>
      <van-col :span="8">
        <p class="title">
          临时解锁
        </p>
        <p class="value">当前状态：{{ this.statusData.lockStatusDesc }}</p>
        <button class="btn" @click="temporaryUnlock">解锁</button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  props: {
    getOnline: Function,
    forceUnlock: Function,
    temporaryUnlock: Function,
    statusData: Object
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
