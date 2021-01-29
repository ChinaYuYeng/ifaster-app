<template>
  <van-collapse v-model="active">
    <van-collapse-item v-for="collapse in collapses" :key="collapse.id" :title="collapse.name">{{ collapse.name }}</van-collapse-item>
  </van-collapse>
</template>

<script>
export default {
  name: "collapse",
  props: {
    collapses: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      active: []
    };
  },
  methods: {
    onChange(index) {
      this.loading = true;
      this.active = index;
      this.getChildren(this.bars[index].id);
    }
  }
};
</script>
