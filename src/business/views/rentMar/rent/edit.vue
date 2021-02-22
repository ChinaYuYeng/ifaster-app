<template>
  <AppLayout>
    <Panel @touchmove.native.stop.prevent>
      <div id="rentMar__map-add" style="width:100%; height:200px;"></div>
    </Panel>
    <van-form label-width="100px" ref="form" validate-trigger="onSubmit">
      <van-field v-model="formData.name" label="租还点名称：" placeholder="请输入租还点名称" />
      <van-field v-model="formData.address" label="租还点地址：" placeholder="请输入租还点地址" />
      <DatePick label="营业开始时间：" v-model="formData.startTime" placeholder="请选择开始时间" dateType="time"></DatePick>
      <DatePick label="营业结束时间：" v-model="formData.endTime" placeholder="请选择结束时间" dateType="time"></DatePick>
      <van-field label="异地还车：">
        <template #button>
          <van-switch v-model="formData.otherPlaceReturn" size="20" />
        </template>
      </van-field>
      <van-field label="异点还车：">
        <template #button>
          <van-switch v-model="formData.otherPointReturn" size="20" />
        </template>
      </van-field>
      <van-field v-model="formData.otherReturnPrice" label="异地还车收费：" />
      <BtnGroup class="mtop10">
        <SubmitBtn text="保存" size="small" :onSubmit="submit" block></SubmitBtn>
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
      formData: {
        name: "",
        address: "",
        startTime: "",
        endTime: "",
        otherPlaceReturn: "",
        otherPointReturn: "",
        otherReturnPrice: ""
      }
    };
  },
  created() {
    let routerData = this.$route.params;
    Object.assign(this.formData, routerData || {});
  },
  mounted() {
    this.initMap();
  },
  methods: {
    submit() {
      return this.$refs.form.validate().then(() => {
        return this.$apis.savePoint(this.formData).then(() => {
          this.$router.replace("/rentMar").then(() => {
            this.$router.go(-2).then(res => {
              console.log(res);
            });
          });
        });
      });
    },
    initMap() {
      AMapLoader.load({
        key: "21a1ca7e415887a172fe8399bd114b28",
        version: "2.0"
      }).then(AMap => {
        this.map = new AMap.Map("rentMar__map-add", {
          zoom: 11,
          center: [107.4976, 32.1697]
        });
      });
    }
  },
  beforeDestroy() {
    this.map && this.map.destroy();
  }
};
</script>

<style lang="less" scoped></style>
