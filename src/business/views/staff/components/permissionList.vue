<template>
  <div>
    <Panel>
      <van-cell border="false" title="权限"></van-cell>
      <van-collapse v-model="activeNames">
        <van-collapse-item v-for="(item, index) in permissionList" :key="index" :title="item.name" :name="index">
          <van-cell v-for="(item1, index) in item.json" :key="index">
            <span>{{ item1.pername }}</span>
          </van-cell>
        </van-collapse-item>
      </van-collapse>
    </Panel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ["1"]
    };
  },
  props: {
    permissionList: Array
  }
};
</script>

<style></style>
