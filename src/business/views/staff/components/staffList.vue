<template>
  <div>
    <van-cell is-link>
      <UserInfo class="user__info">
        <span>{{ item.cnName }}</span>
        <span>{{ item.statusName }}</span>
      </UserInfo>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  },
  methods: {
    // routeTo(item) {
    //   if (item.status == 0) {
    //     this.$router.push({
    //       path: "/staff/detail",
    //       query: { data: item }
    //     });
    //   } else if (item.status == 1) {
    //     this.$router.push({
    //       path: "/staff/permission",
    //       query: { data: item }
    //     });
    //   }
    // }
  }
};
</script>

<style></style>
