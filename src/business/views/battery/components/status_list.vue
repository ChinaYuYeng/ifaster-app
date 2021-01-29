<template>
  <div>
    <van-row>
      <van-col :span="8">
        <p class="title">
          在线状态
        </p>
        <p class="value">{{ status1 }}</p>
        <button class="btn">检测</button>
      </van-col>
      <van-col :span="8">
        <p class="title">
          强锁电池
        </p>
        <p class="value">当前状态：{{ status2 }}</p>
        <button class="btn">锁定</button>
      </van-col>
      <van-col :span="8">
        <p class="title">
          临时解锁
        </p>
        <p class="value">当前状态：{{ status3 }}</p>
        <button class="btn" @click="unlock">解锁</button>
      </van-col>
    </van-row>
    <TimeSelect ref="timeselect" :title="selectTitle" :valuesList1="valuesList1" :valuesList2="valuesList2"></TimeSelect>
  </div>
</template>

<script>
import TimeSelect from "./timeSelect";
export default {
  data() {
    return {
      selectData: "",
      isShow: false,
      selectTitle: "选择临时解锁时长",
      valuesList1: [],
      valuesList2: [],
      status1: "2020-12-20 2:20:00",
      status2: "锁定",
      status3: "解锁"
    };
  },
  components: {
    TimeSelect
  },
  created() {
    this.setSelectList();
    // this.selectData = this.$refs.timeselect.value;
    // alert(this.selectData);
  },
  methods: {
    unlock() {
      this.$refs.timeselect.isShowPicker = true;
    },
    // showData(){

    // }
    setSelectList() {
      for (let i = 0; i < 24; i++) {
        this.valuesList1.push(i + 1 + "小时");
      }
      for (let i = 0; i < 59; i++) {
        this.valuesList2.push(i + 1 + "分钟");
      }
    }
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
