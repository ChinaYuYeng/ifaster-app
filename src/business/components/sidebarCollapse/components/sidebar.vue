<template>
  <van-sidebar v-model="active" @change="onChange">
    <van-sidebar-item v-for="bar in bars" :title="bar.name" :key="bar.id" class="sidebar_left" />
  </van-sidebar>
</template>

<script>
export default {
  name: "sidebar",
  props: {
    bars: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      active: 0
    };
  },
  mounted() {
    this.bars.map(b => {
      if (b.name.length > 4) {
        b.name = b.name.substring(0, 4);
      }
    });
  },
  created() {},
  methods: {
    onChange(index) {
      this.loading = true;
      this.active = index;
      this.$emit("getChildren", this.bars[index]);
    }
  },
  watch: {}
};
</script>

<style lang="less" scoped>
.sidebar_left {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 120px;
}
</style>
