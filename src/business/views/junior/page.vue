<template>
  <AppLayout>
    <Panel>
      <item :dataItem="listTop" :hasDetail="true" :godetail="godetail" :hasArrow="false"></item>
    </Panel>
    <Panel>
      <van-cell title="下级情况"></van-cell>
      <div v-for="(item, index) in listData" :key="index" @click="checkJunior(item)">
        <item :dataItem="item" :hasDetail="false" style="margin-bottom:20px"></item>
      </div>
    </Panel>
    <template #body-bottom>
      <van-button text="邀请注册" @click="gotoAdd"></van-button>
    </template>
  </AppLayout>
</template>

<script>
// import bac from "./testImg/index-bac.png";
import item from "./components/junior";
export default {
  components: {
    item
  },
  data() {
    return {
      operate: "",
      listTop: {},
      listData: []
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    gotoAdd() {
      this.$router.push("/junior/invite");
    },
    godetail() {
      this.saveMessage(this.listTop);
      this.$router.push("/junior/detail");
    },
    checkJunior(item) {
      this.operate = item.id;
      // this.getInfo();
      this.listData = [];
      this.$apis.info({ operate: this.operate }).then(res => {
        this.listTop = res.data[0];
        for (let i = 1; i < res.data.length; i++) {
          this.listData.push(res.data[i]);
        }
      });
    },
    getInfo() {
      this.$apis.info({ operate: this.operate }).then(res => {
        this.listTop = res.data[0];
        for (let i = 1; i < res.data.length; i++) {
          this.listData.push(res.data[i]);
        }
      });
    }
  }
};
</script>

<style></style>
