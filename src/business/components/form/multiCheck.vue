<template>
  <van-field>
    <template #input>
      <van-checkbox-group :value="value" @input="onInput">
        <van-cell-group :title="label">
          <van-cell clickable :title="item.name" @click="toggle(index)" v-for="(item, index) in options" :key="index">
            <template #right-icon>
              <van-checkbox :name="item.value" ref="checkboxes" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </template>
  </van-field>
</template>

<script>
export default {
  name: "multiCheck",
  props: {
    value: Array,
    options: Array,
    label: String
  },
  methods: {
    onInput(val) {
      this.$emit("input", val);
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    }
  }
};
</script>

<style lang="less" scoped>
.van-cell-group__title {
  padding: 0 0 5px;
  color: #646566;
}
.van-checkbox-group {
  width: 100%;
}
</style>
