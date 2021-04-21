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
      <van-field label="租还点地址：" :value="formData.address" :rules="[{ required: true, message: '请输入租还点地址' }]">
        <template #input>
          <input id="addressInput" v-model="formData.address" class="van-field__control" placeholder="请输入租还点地址" />
        </template>
      </van-field>
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
      <!-- <van-field label="异地还车：">
        <template #button>
          <van-switch v-model="formData.otherPlaceReturn" size="20" />
        </template>
      </van-field> -->
      <van-field label="异点还车：">
        <template #button>
          <van-switch v-model="formData.otherPointReturn" size="20" />
        </template>
      </van-field>
      <!-- <van-field v-model="formData.otherReturnPrice" label="异地还车收费：" /> -->
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
    this.timer = setTimeout(() => {
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
      this.divMap = document.createElement("div");
      this.divMap.style.cssText = "width:100%; height:100%;";
      document.getElementById("rentMar__map-add").appendChild(this.divMap);
      let lnglat = this.formData.lng && this.formData.lat && [this.formData.lng, this.formData.lat];
      AMapLoader.load({
        key: "21a1ca7e415887a172fe8399bd114b28",
        plugins: ["AMap.AutoComplete", "AMap.Geolocation", "AMap.PlaceSearch"],
        version: "2.0"
      }).then(AMap => {
        this.map = new AMap.Map(this.divMap, {
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
              if (status == "complete" && result.poiList.pois[0]) {
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
    }
  },
  beforeDestroy() {
    // 延迟能保证动画流畅，但是在执行前页面退出就会报错了，因此需要clear
    clearTimeout(this.timer);
    this.map && this.map.destroy();
    this.map = null;
    this.divMap.remove();
    this.divMap = null;
  }
};
</script>

<style lang="less" scoped></style>
