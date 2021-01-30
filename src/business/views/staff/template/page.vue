<template>
  <AppLayout>
    <tempList :tempList="tempList"></tempList>
    <button class="add__temp" @click="add_temp">新增模板</button>
  </AppLayout>
</template>

<script>
import tempList from "../components/tempList";
export default {
  data() {
    return {
      tempList: [
        {
          name: "店长模板",
          json: [
            { pername: "权限-1", status: "已授权" },
            { pername: "权限-2", status: "已授权" },
            { pername: "权限-3", status: "已授权" }
          ]
        },
        {
          name: "店员模板",
          json: [
            { pername: "权限-1", status: "已授权" },
            { pername: "权限-2", status: "已授权" },
            { pername: "权限-3", status: "已授权" }
          ]
        }
      ]
    };
  },
  components: {
    tempList
  },
  methods: {
    add_temp() {
      this.$router.push("/staff/addtemp");
    }
  }
};
</script>

<style scoped>
.add__temp {
  width: 33%;
  font-size: 15px;
  padding: 7px;
  border: 1px solid #55babb;
  border-radius: 7px;
  color: #55babb;
  background-color: #fff;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 20px;
}
</style>
