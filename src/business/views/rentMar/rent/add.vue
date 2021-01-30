<template>
  <AppLayout>
    <Panel @touchmove.native.stop.prevent>
      <div id="rentMar__map" style="width:100%; height:200px;"></div>
    </Panel>
    <van-form label-width="100px" ref="form" validate-trigger="onSubmit">
      <van-field v-model="dataFrom.name" label="租还点名称：" />
      <van-field v-model="dataFrom.address" label="租还点地址：" />
      <DatePick label="营业时间：" v-model="dataFrom.date"></DatePick>
      <van-field label="异地还车：">
        <template #button>
          <van-switch v-model="dataFrom.yidi" size="20" />
        </template>
      </van-field>
      <van-field label="异点还车：">
        <template #button>
          <van-switch v-model="dataFrom.yidi" size="20" />
        </template>
      </van-field>
      <van-field v-model="dataFrom.price" label="异地还车收费：" />
      <BtnGroup class="mtop10">
        <SubmitBtn text="保存" size="small" :onSubmit="submit" width="60%"></SubmitBtn>
      </BtnGroup>
    </van-form>
  </AppLayout>
</template>

<script>
import DatePick from "@@/components/form/datePick";
export default {
  components: { DatePick },
  data() {
    return {
      dataFrom: {}
    };
  },
  mounted() {
    AMapLoader.load({
      key: "21a1ca7e415887a172fe8399bd114b28",
      version: "2.0"
    }).then(AMap => {
      new AMap.Map("rentMar__map", {
        zoom: 11,
        center: [107.4976, 32.1697]
      });
    });
  },
  methods: {
    submit() {
      this.$refs.form.validate().then(valid => {
        if (valid) {
          //
        }
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
