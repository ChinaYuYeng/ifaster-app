<template>
  <AppLayout>
    <van-row class="main-row">
      <van-col span="24">
        <van-field readonly clickable label="上架到门店" :value="pointName" placeholder="选择门店" @click="showPicker = true" value-key="name" />
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirmShop" />
        </van-popup>
      </van-col>
    </van-row>
    <van-row class="main-row">
      <van-col span="24">
        <van-field
          readonly
          clickable
          label="收费模板"
          :value="templateName"
          placeholder="选择收费模板"
          @click="showPickerTemplate = true"
          value-key="name"
        />
        <van-popup v-model="showPickerTemplate" round position="bottom">
          <van-picker show-toolbar :columns="columnsTemplate" @cancel="showPickerTemplate = false" @confirm="onConfirmTemplate" />
        </van-popup>
      </van-col>
    </van-row>
    <!-- <van-cell title="上架到门店" is-link v-model="dataForm.pointId" :value="dataForm.pointName" />
    <van-cell title="收费模板" is-link v-model="dataForm.templateId" :value="dataForm.templateName" /> -->
    <template #body-bottom class="wrap">
      <van-row>
        <van-col span="8" offset="8">
          <van-button type="primary" text="确定" block @click="sure" size="mini"></van-button>
        </van-col>
      </van-row>
    </template>
  </AppLayout>
</template>
<script>
export default {
  name: "onShelf",
  data() {
    return {
      showPicker: false,
      showPickerTemplate: false,
      pointId: "",
      pointName: "",
      templateId: "",
      templateName: "",
      columns: [],
      columnsTemplate: []
    };
  },
  created() {
    console.log(this.getPointList);

    this.columns = this.getPointList.map(p => {
      return Object.assign(p, { text: p.name });
    });
    this.columns.splice(
      this.columns.findIndex(item => item.id === 0),
      1
    );
    this.getTemplateList();
  },
  methods: {
    getTemplateList() {
      this.$apis.getRentTemplate({ pageIndex: 1, pageSize: 1000 }).then(res => {
        if (res.code == "1") {
          this.columnsTemplate = res.data.rows.map(p => {
            return Object.assign(p, { text: p.name });
          });
        }
      });
    },
    onConfirmShop(value) {
      // debugger;
      this.pointName = value.text;
      this.pointId = value.id;
      this.showPicker = false;
    },
    onConfirmTemplate(value) {
      this.templateId = value.id;
      this.templateName = value.text;
      this.showPickerTemplate = false;
    },
    sure() {
      if (this.pointId == "" || this.pointId == 0) {
        this.$toast("请选择上架门店！");
        return;
      }

      if (this.templateId == "" || this.templateId == 0) {
        this.$toast("请选择收费模板！");
        return;
      }
      this.$apis.up({ ids: this.getSelectedInfo.ids, pointId: this.pointId, templateId: this.templateId }).then(res => {
        if (res.code == "1") {
          this.$toast.success(res.msg);
          this.$router.push({ path: "/shelf" });
        } else {
          this.$toast.fail(res.msg);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.wrap {
  width: 100%;
  text-align: center;
}
</style>
