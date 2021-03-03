<template>
  <AppLayout>
    {{ formData }}
    <Panel @touchmove.native.stop.prevent v-if="this.$route.params.flag == 'address'">
      <div id="rentMar__map-add" style="width:100%; height:200px;"></div>
    </Panel>
    <van-form label-width="70px" ref="form" validate-trigger="onSubmit" :show-error-message="false">
      <van-field
        v-if="this.$route.params.flag == 'address'"
        v-model="formData.address"
        label="电桩地址:"
        placeholder="请输入电桩地址"
        :rules="[{ required: true, message: '请输入电桩地址' }]"
      />
      <van-field
        v-if="this.$route.params.flag == 'name'"
        v-model="formData.name"
        label="电桩名称:"
        placeholder="请输入电桩名称"
        :rules="[{ required: true, message: '请输入电桩名称' }]"
      />
      <BtnGroup class="mtop10">
        <SubmitBtn text="保存" size="small" :onSubmit="submit" block></SubmitBtn>
      </BtnGroup>
    </van-form>
  </AppLayout>
</template>

<script>
export default {
  data() {
    return {
      columns: [],
      formData: {
        address: "",
        id: "",
        lat: "",
        lng: "",
        name: ""
      }
    };
  },
  created() {
    this.setDataForm();
    // let routerData = this.$route.params.data;
    // Object.assign(this.formData, routerData || {});
  },
  mounted() {
    // 解决地图和页面切换效果同时进行卡顿的问题
    if (this.$route.params.flag == "address") {
      setTimeout(() => {
        this.initMap();
      }, 300);
    }
  },
  methods: {
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
    },
    setDataForm() {
      this.formData.address = this.$route.params.data.address;
      this.formData.id = this.$route.params.data.id;
      this.formData.lat = this.$route.params.data.lat;
      this.formData.lng = this.$route.params.data.lng;
      this.formData.name = this.$route.params.data.name;
    },
    submit() {
      return this.$apis.edit(this.formData).then(res => {
        console.log(res);
        if (res.code == 1) {
          this.$toast.success("信息修改成功");
        } else {
          this.$toast.fail("操作失败");
        }
        this.$router.go(-1);
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

<style>
.submit {
  border: none;
  border-radius: 10px;
  background-color: #55babb;
  color: #fff;
  padding: 10px 40px;
  margin-top: 10px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>
