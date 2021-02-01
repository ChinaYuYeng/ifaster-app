<template>
  <div>
    <van-row v-for="(p, i) in percentInfo" :key="i">
      <Panel>
        {{ p.name }}
        <van-cell-group>
          <van-field :v-model="p.per" :value="p.per" label="分账比例" placeholder="请输入分账比例" input-align="right" label-width="200" />
          <van-field
            :v-model="p.limit"
            :value="p.limit"
            label="单次金额上限（长租）"
            placeholder="请输入上限"
            input-align="right"
            label-width="200"
          />
        </van-cell-group>
      </Panel>
    </van-row>
  </div>
</template>

<script>
export default {
  name: "percent",
  props: {
    percentInfo: {
      type: Array
    }
  },
  created() {
    if (this.percentInfo == undefined) {
      this.percentInfo = [];
      this.percentInfo.push({
        name: "运营商AAA",
        per: "20%",
        limit: 2
      });
      this.percentInfo.push({
        name: "运营商BBB",
        per: "20%",
        limit: 2
      });
      this.percentInfo.push({
        name: "运营商CCC",
        per: "20%",
        limit: 2
      });
    }
  },
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="less" scoped></style>
