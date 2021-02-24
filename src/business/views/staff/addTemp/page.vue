<template>
  <AppLayout>
    <perList :permissionList="perList" :value="name" :result="result"></perList>
    <template #body-bottom>
      <van-button text="确定"></van-button>
    </template>
    <!-- {{ this.$route.query.data }} -->
  </AppLayout>
</template>

<script>
import perList from "../components/permissionList";
export default {
  data() {
    return {
      name: "",
      result: [],
      perList: [
        { name: "上下架权限", json: [{ pername: "主要权限-1" }, { pername: "主要权限-2" }, { pername: "主要权限-3" }] },
        { name: "其他权限", json: [{ pername: "其他权限-1" }, { pername: "其他权限-2" }, { pername: "其他权限-3" }] }
      ]
    };
  },
  created() {
    this.getAuthList();
    this.getData();
  },
  methods: {
    getAuthList() {
      // this.$apis.authList().then(res => {
      //   this.perList = res.data;
      // });
    },
    getData() {
      let data = this.$route.query.data;
      this.name = data.name;
      for (let i = 0; i < data.json.length; i++) {
        this.result.push(data.json[i].pername);
      }
    }
  },
  components: {
    perList
  }
};
</script>

<style></style>
