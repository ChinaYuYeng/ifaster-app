<template>
  <div>
    <van-field :value="current.name" :readonly="true" @click="showPopup" is-link arrow-direction="down" v-bind="$attrs" />
    <van-action-sheet v-model="show" :actions="options" @select="onSelect" close-on-click-action />
  </div>
</template>

<script>
export default {
  props: {
    value: [String, Number],
    options: {
      type: Array,
      default: function() {
        return [
          { name: "选项一", value: 1 },
          { name: "选项二", value: 2 },
          { name: "选项三", value: 3 }
        ];
      }
    }
  },
  data() {
    let current = this.options.filter(v => v.value == this.value)[0] || {};
    return {
      show: false,
      current
    };
  },
  methods: {
    onSelect(item) {
      this.current = item;
      this.$emit("input", item.value);
    },
    showPopup() {
      this.show = true;
    }
  }
};
</script>

<style lang="less" scoped></style>
