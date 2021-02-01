<template>
  <div>
    <div v-for="(item, index) in dataList" :key="index">
      <van-cell :icon="item.img" :title="item.name" :label="item.status" is-link @click="routeTo(item)"></van-cell>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataList: Array
  },
  methods: {
    routeTo(item) {
      if (item.status == "待审核") {
        this.$router.push({
          path: "/staff/detail",
          query: { data: item }
        });
      } else {
        this.$router.push({
          path: "/staff/permission",
          query: { data: item }
        });
      }
    }
  }
};
</script>

<style></style>
