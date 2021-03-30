<template>
  <div>
    <van-row>
      <van-col :span="8">
        <p class="title">
          在线状态
        </p>
        <div class="font__bar">
          <i class="iconfont" :class="{ online: isOnline }">&#xe617;</i>
        </div>
        <p class="value">{{ this.statusData.isOnlineDesc }}</p>
        <button class="btn" @click="getOnline" v-if="checkAuth('battery:online')">检测</button>
      </van-col>
      <van-col :span="8">
        <p class="title">
          强锁电池
        </p>
        <div class="font__bar">
          <i class="iconfont" :class="{ lock: isLock }">&#xe658;</i>
        </div>
        <p class="value">{{ this.statusData.lockStatusDesc }}</p>
        <button class="btn" @click="forceUnlock" v-if="checkAuth('battery:forceLock')">锁定</button>
      </van-col>
      <van-col :span="8">
        <p class="title">
          临时解锁
        </p>
        <div class="font__bar">
          <i class="iconfont" :class="{ tlock: isTLock }">&#xe659;</i>
        </div>
        <p class="value">{{ this.statusData.lockStatusDesc }}</p>
        <button class="btn" @click="temporaryUnlock" v-if="checkAuth('battery:temporaryLock')">解锁</button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOnline: false,
      isLock: false,
      isTLock: false
    };
  },
  props: {
    getOnline: Function,
    forceUnlock: Function,
    temporaryUnlock: Function,
    statusData: Object
  },
  methods: {},
  watch: {
    statusData: {
      handler: function() {
        if (this.statusData.isOnlineDesc == "在线") {
          this.isOnline = true;
        } else {
          this.isOnline = false;
        }
        if (this.statusData.lockStatusDesc == "运营商强锁") {
          this.isLock = true;
        } else {
          this.isLock = false;
        }
        if (this.statusData.isTemporarySwitch == 1) {
          this.isTLock = true;
        } else {
          this.isTLock = false;
        }
      },
      deep: true
    }
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
.font__bar {
  margin-top: 10px;
}
.iconfont {
  font-size: 30px;
}
.online {
  color: #8fc31f;
}
.lock {
  color: #e8433f;
}
.tlock {
  color: #ff8000;
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
