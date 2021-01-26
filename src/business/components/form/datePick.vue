<template>
  <div class="datePick">
    <van-field :value="timeValue" :readonly="true" @click="showPopup" is-link arrow-direction="down" v-bind="$attrs" />
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        title="选择时间"
        :loading="isLoadingShow"
        @cancel="show = false"
        @confirm="confirmPicker"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "datePick",
  props: {
    value: String
  },
  data() {
    return {
      timeValue: this.value || "",
      show: false,
      isLoadingShow: true,
      currentDate: new Date()
    };
  },
  methods: {
    // 显示弹窗
    showPopup() {
      this.show = true;
      this.isLoadingShow = true;
      setTimeout(() => {
        this.isLoadingShow = false;
      }, 500);
    },
    // 确认选择的时间
    confirmPicker(val) {
      let year = val.getFullYear();
      let month = val.getMonth() + 1;
      let day = val.getDate();
      let hour = val.getHours();
      let minute = val.getMinutes();
      if (month >= 1 && month <= 9) {
        month = `0${month}`;
      }
      if (day >= 1 && day <= 9) {
        day = `0${day}`;
      }
      if (hour >= 0 && hour <= 9) {
        hour = `0${hour}`;
      }
      if (minute >= 0 && minute <= 9) {
        minute = `0${minute}`;
      }
      this.timeValue = `${year}-${month}-${day} ${hour}:${minute}`;
      this.$emit("input", this.timeValue);
      this.show = false;
    }
  }
};
</script>

<style lang="less" scoped>
.datePick {
  .timeClass {
    color: #333;
  }
}
</style>
