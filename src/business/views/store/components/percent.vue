<template>
  <div>
    <van-row>
      我的
      <van-cell-group>
        <van-field v-model="dataForm.percent" label="分账比例" placeholder="请输入分账比例" input-align="right" label-width="200" />
        <van-field v-model="dataForm.limit" label="单次金额上限（长租）" placeholder="请输入上限" input-align="right" label-width="200" />
      </van-cell-group>
    </van-row>
  </div>
</template>

<script>
export default {
  name: "percent",

  created() {},
  components: {},
  data() {
    return {
      dataForm: {
        percent: "",
        limit: ""
      }
    };
  },
  methods: {}
};
</script>
<style lang="less" scoped></style>
