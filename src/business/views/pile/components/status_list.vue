<template>
  <div>
    <van-row>
      <van-col :span="8">
        <p class="title">
          在线状态
        </p>
        <div class="font__bar">
          <i class="iconfont" :class="{ online: isOnline }">&#xe65f;</i>
        </div>
        <p class="value">{{ this.statusData.isOnlineDesc }}</p>
        <button class="btn" @click="getOnlineStatus()">检测</button>
      </van-col>
      <van-col :span="8">
        <p class="title">
          运营状态
        </p>
        <div class="font__bar">
          <i class="iconfont" :class="{ operate: isOperate }">&#xe65a;</i>
        </div>
        <p class="value">{{ this.statusData.statusDesc }}</p>
        <button class="btn" @click="setOperateStatus()">设置</button>
      </van-col>
      <van-col :span="8">
        <p class="title">
          使用状态
        </p>
        <div class="font__bar">
          <i class="iconfont" :class="{ charge: isCharge }">&#xe687;</i>
        </div>
        <p class="value">{{ this.statusData.chargeStatusDesc }}</p>
        <button class="btn" @click="getUseStatus()">刷新</button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOnline: false,
      isOperate: false,
      isCharge: false
    };
  },
  props: {
    getOnlineStatus: Function,
    getUseStatus: Function,
    setOperateStatus: Function,
    statusData: Object
  },
  methods: {
    checkOnline() {
      if (this.statusData.isOnlineDesc == "在线") {
        this.isOnline = true;
      } else {
        this.isOnline = false;
      }
    },
    checkOperate() {
      if (this.statusData.statusDesc == "运营中") {
        this.isOperate = true;
      } else {
        this.isOperate = false;
      }
    },
    checkCharge() {
      if (this.statusData.chargeStatusDesc == "充电中") {
        this.isCharge = true;
      } else {
        this.isCharge = false;
      }
    }
  },
  watch: {
    "statusData.statusDesc": {
      handler: function() {
        this.checkOperate();
      },
      deep: true
    },
    "statusData.isOnlineDesc": {
      handler: function() {
        this.checkOnline();
      },
      deep: true
    },
    "statusData.chargeStatusDesc": {
      handler: function() {
        this.checkCharge();
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
.title {
  color: #000000;
  font-weight: 600;
  margin-top: 10px;
}
.font__bar {
  margin-top: 10px;
}
.iconfont {
  font-size: 30px;
}
.online {
  color: #55babb;
}
.operate {
  color: #8fc31f;
}
.charge {
  color: #ff8000;
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
