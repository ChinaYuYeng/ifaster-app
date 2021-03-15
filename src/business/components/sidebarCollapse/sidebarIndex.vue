<template>
  <van-sidebar v-model="active" @change="onChange" class="left">
    <van-sidebar-item v-for="bar in bars" :title="bar.shortName" :key="bar.id" class="sidebar_left" />
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
    },
    sideBarActive: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      loading: false,
      active: 0
    };
  },
  mounted() {},
  created() {
    if (this.sideBarActive >= 0) {
      this.active = this.sideBarActive;
    }
  },
  methods: {
    onChange(index) {
      this.loading = true;
      this.active = index;
      this.updateData(this.bars[index], index);
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
  width: 100px;
  line-height: 4px;
  // height: 45px;
  // position: fixed;
  // left: 0;
}
</style>
