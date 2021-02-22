<template>
  <div>
    <Panel>
      <van-cell title="模板"></van-cell>
      <van-cell title="模板名称">
        <van-field v-model="value" placeholder="请输入模板名称" class="input__bar" />
      </van-cell>
    </Panel>
    <Panel>
      <van-cell title="权限"></van-cell>
      <van-collapse v-model="activeNames">
        <van-checkbox-group v-model="result" ref="checkboxGroup">
          <van-collapse-item v-for="(item, index) in permissionList" :key="index" :title="item.name" :name="index">
            <van-cell v-for="(item1, index) in item.json" :key="index">
              <!-- <span>{{ item1.pername }}</span> -->
              <van-checkbox checked-color="#55BABB" shape="square" icon-size="15px" :name="item1.pername">{{ item1.pername }}</van-checkbox>
            </van-cell>
            <!-- <van-button v-if="item.name != '上下架权限'" type="primary" @click="checkAll">全选</van-button> -->
          </van-collapse-item>
        </van-checkbox-group>
      </van-collapse>
    </Panel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // result: [],
      // value: "",
      activeNames: ["1"]
    };
  },
  props: {
    result: Array,
    value: String,
    permissionList: Array
  },
  methods: {
    checkAll() {
      this.$refs.checkboxGroup.toggleAll(true);
      alert(this.result);
    },
    toggleAll() {
      this.$refs.checkboxGroup.toggleAll();
    }
  }
};
</script>

<style scoped>
.input__bar {
  position: relative;
  top: -10px;
}
</style>
