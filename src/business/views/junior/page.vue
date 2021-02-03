<template>
  <AppLayout>
    <item :JuniorList="listData"></item>
    <template #body-bottom>
      <van-button text="邀请注册" @click="gotoAdd"></van-button>
    </template>
  </AppLayout>
</template>

<script>
import bac from "./testImg/index-bac.png";
import item from "./components/juniorItem";
export default {
  data() {
    return {
      listData: {
        name: "代理商1",
        phone: "13855456632",
        order: 88,
        pile: 45,
        point: 88,
        battery: 45,
        imgurl: bac,
        children: [
          {
            name: "子代理商1",
            phone: "13855456632",
            order: 88,
            pile: 45,
            imgurl: bac,
            point: 88,
            battery: 45
          },
          {
            name: "子代理商2",
            phone: "13855456632",
            order: 88,
            pile: 45,
            imgurl: bac,
            point: 88,
            battery: 45
          }
        ]
      }
    };
  },
  methods: {
    gotoAdd() {
      this.$router.push("/junior/invite");
    }
  },
  components: {
    item
  }
};
</script>

<style></style>
