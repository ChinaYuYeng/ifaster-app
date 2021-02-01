<template>
  <div>
    <div v-for="(item, index) in dataList" :key="index">
      <van-cell is-link @click="routeTo(item)">
        <UserInfo :avatar="item.img">
          <span>{{ item.name }}</span>
          <span>{{ item.status }}</span>
        </UserInfo>
      </van-cell>
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
