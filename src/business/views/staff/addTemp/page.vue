<template>
  <AppLayout>
    <perList :permissionList="perList"></perList>
  </AppLayout>
</template>

<script>
import perList from "../components/permissionList";
export default {
  data() {
    return {
      perList: [
        { name: "上下架权限", json: [{ pername: "主要权限-1" }, { pername: "主要权限-2" }, { pername: "主要权限-3" }] },
        { name: "其他权限", json: [{ pername: "其他权限-1" }, { pername: "其他权限-2" }, { pername: "其他权限-3" }] }
      ]
    };
  },
  components: {
    perList
  }
};
</script>

<style></style>
