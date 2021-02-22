<template>
  <div class="datePick">
    <van-field :value="value" :readonly="true" @click="showPopup" is-link arrow-direction="down" v-bind="$attrs" />
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        :value="currentDate"
        :type="dateType"
        title="选择时间"
        :loading="isLoadingShow"
        @cancel="show = false"
        @confirm="confirmPicker"
      />
    </van-popup>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "datePick",
  props: {
    value: String,
    dateType: {
      type: String,
      default: "datetime"
    }
  },
  data() {
    let currentDate = this.value;
    switch (this.dateType) {
      case "time":
        currentDate = currentDate || "08:00";
        break;
      case "datetime":
      case "year-month":
      case "date":
        currentDate = currentDate ? new Date(currentDate) : new Date();
        break;
    }
    return {
      show: false,
      isLoadingShow: true,
      currentDate: currentDate
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
      let timeValue = "";
      switch (this.dateType) {
        case "datetime":
          timeValue = dayjs(val).format("YYYY-MM-DD HH:mm:ss");
          break;
        case "time":
          timeValue = val;
          break;
        case "year-month":
          timeValue = dayjs(val).format("YYYY-MM");
          break;
        case "date":
          timeValue = dayjs(val).format("YYYY-MM-DD");
      }
      this.$emit("input", timeValue);
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
