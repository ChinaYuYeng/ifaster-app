<template>
  <van-sidebar v-model="active" @change="onChange" class="left">
    <van-sidebar-item v-for="bar in bars" :title="bar.name" :key="bar.id" class="sidebar_left" />
  </van-sidebar>
</template>

<script>
export default {
  inject: ["updateData"],
  name: "sidebarIndex",
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
  mounted() {},
  created() {},
  methods: {
    onChange(index) {
      this.loading = true;
      this.active = index;
      this.updateData(this.bars[index]);
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
  position: fixed;
  left: 0;
}
.sidebar_left + .sidebar_left {
  margin-top: 60px;
}
</style>
