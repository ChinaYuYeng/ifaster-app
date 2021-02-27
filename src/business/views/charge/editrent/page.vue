<template>
  <AppLayout>
    <van-form ref="form" validate-trigger="onSubmit">
      <Panel>
        <div class="cell-h">模板</div>
        <van-field v-model="formData.name" label="模板名称：" placeholder="请输入模板名称" input-align="right" />
        <van-cell title="收费模式：">
          <van-dropdown-menu active-color="#55BABB">
            <van-dropdown-item v-model="formData.price.rentModel" :options="option" />
          </van-dropdown-menu>
        </van-cell>
        <van-field name="uploader" label="设备图片：">
          <template #input>
            <van-uploader v-model="loadimg" />
          </template>
        </van-field>
      </Panel>
      <Panel>
        <div class="cell-h">押金</div>
        <van-field v-model.number="formData.price.deposit" type="number" label="预交押金：" placeholder="0.00" input-align="right" extra="A" />
        <van-field label="是否自动审核AAA：">
          <template #button>
            <van-switch v-model="formData.price.autoCheck" size="20" active-color="#55BABB" />
          </template>
        </van-field>
      </Panel>
    </van-form>
    <btnGroup :leftbtn="'删除'" :rightbtn="'保存'" :leftFunc="delt" :rightFunc="savet"></btnGroup>
  </AppLayout>
</template>
<script>
import btnGroup from "../components/btnGroup";
export default {
  data() {
    return {
      formData: {},
      option: [
        { text: "保证金模式", value: 1 },
        { text: "预付费模式", value: 2 }
      ]
    };
  },
  created() {
    let routerData = this.$route.params;
    Object.assign(this.formData, routerData || {});
  },
  computed: {
    loadimg() {
      return [{ url: this.dataList.img }];
    }
  },
  methods: {
    delt() {},
    savet() {
      console.log(this.dataList);
    },
    onUpdateValue(v) {
      console.log(v);
    }
  },
  components: {
    btnGroup
  }
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
.cell-h {
  font-size: 0.3rem;
}
.panel {
  margin-bottom: 10px;
}
.van-field__label {
  width: 50%;
}
.van-dropdown-item__option {
  text-align: left;
}
.van-dropdown-menu__bar {
  height: 27px;
}
.van-popup--top {
  top: 0;
  left: 47%;
  width: 50%;
}
.panel:last-child {
  border-bottom: none;
}

.van-cell {
  align-items: center;
  justify-content: space-between;
}
.van-uploader__upload {
  margin: 0;
}
</style>
