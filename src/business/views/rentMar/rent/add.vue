<template>
  <AppLayout>
    <Panel @touchmove.native.stop.prevent>
      <div id="rentMar__map-add" style="width:100%; height:200px;"></div>
    </Panel>
    <van-form label-width="100px" ref="form" validate-trigger="onSubmit" :show-error-message="false">
      <van-field
        v-model="formData.name"
        label="租还点名称："
        placeholder="请输入租还点名称"
        :rules="[{ required: true, message: '请输入租还点名称' }]"
      />
      <van-field
        v-model="formData.address"
        label="租还点地址："
        placeholder="请输入租还点地址"
        :rules="[{ required: true, message: '请输入租还点地址' }]"
      />
      <van-field
        v-model="formData.contact"
        label="联系电话："
        placeholder="请输入联系电话"
        :rules="[{ required: true, message: '请输入联系电话' }]"
      />
      <DatePick
        label="营业开始时间："
        v-model="formData.startTime"
        placeholder="请选择开始时间"
        dateType="time"
        :rules="[{ required: true, message: '请选择开始时间' }]"
      ></DatePick>
      <DatePick
        label="营业结束时间："
        v-model="formData.endTime"
        placeholder="请选择结束时间"
        dateType="time"
        :rules="[{ required: true, message: '请选择结束时间' }]"
      ></DatePick>
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
        otherPlaceReturn: false,
        otherPointReturn: false,
        otherReturnPrice: "",
        lat: "",
        lng: "",
        areaCode: "",
        contact: ""
      }
    };
  },
  created() {
    let routerData = this.$route.params;
    Object.assign(this.formData, routerData || {});
  },
  mounted() {
    // 解决地图和页面切换效果同时进行卡顿的问题
    setTimeout(() => {
      this.initMap();
    }, 300);
  },
  methods: {
    submit() {
      return this.$refs.form.validate().then(() => {
        return this.$apis.savePoint(this.formData).then(() => {
          this.$router.back();
        });
      });
    },
    initMap() {
      const lnglat = [this.formData.lng || 120.755511, this.formData.lat || 30.746992];
      AMapLoader.load({
        key: "21a1ca7e415887a172fe8399bd114b28",
        plugins: ["AMap.Geocoder"],
        version: "2.0"
      }).then(AMap => {
        const location = (this.LocMark = new AMap.Marker({
          position: lnglat,
          draggable: true,
          raiseOnDrag: true
        })).on("dragend", () => {
          const newPos = location.getPosition();
          this.formData.lng = newPos.lng;
          this.formData.lat = newPos.lat;
        });
        this.map = new AMap.Map("rentMar__map-add", {
          zoom: 18,
          center: lnglat
        });
        this.map.add(location);
        this.geoc = new AMap.Geocoder({
          batch: false
        });
      });
    }
  },
  beforeDestroy() {
    this.map && this.map.destroy();
  },
  watch: {
    "formData.address"(val) {
      if (val && this.geoc) {
        this.geoc.getLocation(val, (status, result) => {
          if (status === "complete") {
            let { lat, lng } = result.geocodes[0].location;
            this.formData.lat = lat;
            this.formData.lng = lng;
            this.formData.areaCode = result.geocodes[0].adcode;
            this.LocMark.setPosition([lng, lat]);
            this.map.setCenter([lng, lat]);
          } else {
            console.log(status);
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped></style>
