<template>
  <AppLayout>
    <Panel @touchmove.native.stop.prevent>
      <div id="rentMar__map" style="width:100%; height:100px;"></div>
    </Panel>
    <!-- <inputList :columns="columns" :data="dataForm"></inputList>
    <SubmitBtn :onSubmit="submit" class="submit" text="保 存"></SubmitBtn> -->
  </AppLayout>
</template>

<script>
// import inputList from "../components/input-list";
export default {
  data() {
    return {
      dataForm: {},
      columns: []
    };
  },
  created() {
    console.log(this.$route.params);
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
      // this.$emit("sub", this.dataForm);
      this.$router.go(-1);
    }
  },
  components: {
    // inputList
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
