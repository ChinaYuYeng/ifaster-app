<template>
  <div>
    <van-popup v-model="isShowPicker" position="bottom" :style="{ height: '50%', width: '100%' }">
      <van-picker show-toolbar :title="title" :columns="columns" @confirm="onConfirm" @cancel="onCancel" />
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      isShowPicker: false,
      columns: [
        {
          values: this.valuesList1,
          defaultIndex: 1
        },
        {
          values: this.valuesList2,
          defaultIndex: 1
        }
      ]
    };
  },
  props: {
    title: String,
    valuesList1: Array,
    valuesList2: Array
  },
  methods: {
    onConfirm(value) {
      //   alert(`当前值：${value}`);
      this.value = value;
      this.isShowPicker = false;
    },
    onCancel() {
      //   alert("取消");
      this.isShowPicker = false;
    }
  }
};
</script>

<style scoped></style>
