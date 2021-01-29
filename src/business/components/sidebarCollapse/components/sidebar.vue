<template>
  <van-sidebar v-model="active" @change="onChange">
    <van-sidebar-item v-for="bar in bars" :title="bar.name" :key="bar.id" />
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
  methods: {
    onChange(index) {
      this.loading = true;
      this.active = index;
      this.$emit("getChildren", this.bars[index]);
    }
  }
};
</script>
