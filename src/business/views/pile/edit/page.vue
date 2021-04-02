<template>
  <AppLayout>
    <Panel @touchmove.native.stop.prevent v-if="this.$route.params.flag == 'address'">
      <div id="rentMar__map-add" style="width:100%; height:200px;"></div>
    </Panel>
    <van-form label-width="70px" ref="form" validate-trigger="onSubmit" :show-error-message="false">
      <van-field v-if="this.$route.params.flag == 'address'" label="电桩地址:" :rules="[{ required: true, message: '请输入电桩地址' }]">
        <template #input>
          <input id="addressInput" v-model="formData.address" class="van-field__control" placeholder="请输入电桩地址" />
        </template>
      </van-field>

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
      let lnglat = this.formData.lng && this.formData.lat && [this.formData.lng, this.formData.lat];
      AMapLoader.load({
        key: "21a1ca7e415887a172fe8399bd114b28",
        plugins: ["AMap.AutoComplete", "AMap.Geolocation", "AMap.PlaceSearch"],
        version: "2.0"
      }).then(AMap => {
        this.map = new AMap.Map("rentMar__map-add", {
          zoom: 18
        });
        let showMap = () => {
          const LocMark = (this.LocMark = new AMap.Marker({
            position: lnglat,
            draggable: true,
            raiseOnDrag: true,
            zIndex: 100
          })).on("dragend", () => {
            const newPos = LocMark.getPosition();
            this.formData.lng = newPos.lng;
            this.formData.lat = newPos.lat;
          });
          this.map.add(LocMark);
          this.map.setCenter(lnglat);
          this.map.on("click", e => {
            this.formData.lng = e.lnglat.lng;
            this.formData.lat = e.lnglat.lat;
            this.LocMark.setPosition([this.formData.lng, this.formData.lat]);
          });
          this.AutoComplete = new AMap.AutoComplete({ input: "addressInput" });
          this.placeSearch = new AMap.PlaceSearch({
            // map: this.map,
          });
          this.AutoComplete.on("select", e => {
            this.placeSearch.search(e.poi.name, (status, result) => {
              if (status == "complete") {
                let { lng, lat } = result.poiList.pois[0].location;
                this.formData.lng = lng;
                this.formData.lat = lat;
                this.LocMark.setPosition([lng, lat]);
                this.map.setCenter([lng, lat]);
              }
            });
          });
        };
        if (!lnglat) {
          const location = new AMap.Geolocation({
            enableHighAccuracy: true,
            timeout: 4000,
            buttonOffset: new AMap.Pixel(10, 20),
            zoomToAccuracy: true,
            buttonPosition: "RB",
            showButton: false,
            showMarker: false,
            showCircle: false,
            panToLocation: false
          });
          location.getCurrentPosition((status, result) => {
            if (status == "complete") {
              lnglat = [result.position.lng, result.position.lat];
            } else {
              lnglat = [120.755511, 30.746992];
            }
            showMap();
          });
        } else {
          showMap();
        }
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
