<template>
  <AppLayout>
    <Panel>
      <item :dataItem="listTop" :hasDetail="true" :godetail="godetail" :hasArrow="false"></item>
    </Panel>
    <Panel v-if="history.length == 1">
      <van-cell title="待审核">
        <span class="check_audit_btn" @click="routerTo({ name: '/junior/auditList' })">查看审核列表</span>
      </van-cell>
    </Panel>
    <Panel>
      <van-cell title="下级情况"><span class="back" @click="back" v-if="history.length > 1">返回上一级</span></van-cell>
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
      history: [],
      listTop: {},
      listData: [],
      auditList: []
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
        this.history.push(this.listTop);
        for (let i = 1; i < res.data.length; i++) {
          this.listData.push(res.data[i]);
        }
      });
    },
    back() {
      let operate = "";
      this.listData = [];
      operate = this.history[this.history.length - 2].id;
      this.history.length--;
      this.$apis.info({ operate: operate }).then(res => {
        this.listTop = res.data[0];
        for (let i = 1; i < res.data.length; i++) {
          this.listData.push(res.data[i]);
        }
      });
    },
    getInfo() {
      this.$apis.info({ operate: "" }).then(res => {
        this.listTop = res.data[0];
        this.history.push(this.listTop);
        for (let i = 1; i < res.data.length; i++) {
          this.listData.push(res.data[i]);
        }
      });
    }
  }
};
</script>

<style scoped>
.back {
  color: #ffffff;
  background-color: #55babb;
  border-radius: 5px;
  font-size: 5px;
  padding: 3px 5px;
}

.check_audit_btn {
  border: 1px solid #55babb;
  border-radius: 5px;
  color: #fff;
  background-color: #55babb;
  padding: 2px 10px;
}
</style>
