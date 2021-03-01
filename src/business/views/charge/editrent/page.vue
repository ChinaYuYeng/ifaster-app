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
        <van-field label="是否自动审核：">
          <template #button>
            <van-switch v-model="formData.price.autoCheck" size="20" active-color="#55BABB" />
          </template>
        </van-field>
        <van-field label="是否购买保险:">
          <template #button>
            <van-switch v-model="formData.price.isPolicy" size="20" active-color="#55BABB" />
          </template>
        </van-field>
      </Panel>
      <Panel>
        <div class="cell-h">短租</div>
        <van-field v-model="formData.price.shortRent.hour" type="number" label="短租收费(元/时)：" placeholder="3.00" input-align="right" />
        <van-field v-model="formData.price.shortRent.max" type="number" label="收费上限(元/天)：" placeholder="10.00" input-align="right" />
      </Panel>
      <Panel>
        <div class="cell-h">长租</div>
        <van-field v-model="formData.price.longRent.week" type="number" label="周租-(元/周):" placeholder="10.00" input-align="right" />
        <van-field v-model="formData.price.longRent.month" type="number" label="月租-(元/月):" placeholder="100.00" input-align="right" />
        <van-field v-model="formData.price.longRent.year" type="number" label="年租-(元/年):" placeholder="1000.00" input-align="right" />
      </Panel>
      <Panel>
        <div class="cell-h">YO车</div>
        <van-field v-model="formData.price.yoRent.period" type="number" label="yo车总期数:" placeholder="10.00" input-align="right" />
        <van-field v-model="formData.price.yoRent.price" type="number" label="每期价格-(元)：" placeholder="22" input-align="right" />
        <van-field v-model="formData.price.yoRent.points" type="number" label="赠送积分：" placeholder="22" input-align="right" />
      </Panel>
    </van-form>
    <!-- <btnGroup :leftbtn="'删除'" :rightbtn="'保存'" :leftFunc="delt" :rightFunc="onSubmit"></btnGroup> -->
    <div class="btn-group">
      <van-button text="删除" @click="delt"></van-button>
      <van-button text="保存" type="primary" @click="onSubmit"></van-button>
    </div>
  </AppLayout>
</template>
<script>
// import btnGroup from "../components/btnGroup";
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
    let routerData = this.getRentList;
    Object.assign(this.formData, routerData || {});
  },
  computed: {
    loadimg() {
      return [{ url: this.formData.img }];
    }
  },
  methods: {
    delt() {
      console.log("点击删除");
      this.$dialog
        .confirm({
          title: "删除模板",
          message: "您是否要删除此模板？点击确定，即可删除"
        })
        .then(() => {
          // on confirm
          return this.$apis.deleteRent(this.formData).then(aaa => {
            console.log(aaa);
            return this.$router.replace("/charge").then(() => {
              this.$toast.success("删除成功！");
            });
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    onSubmit() {
      return this.$refs.form.validate().then(() => {
        return this.$apis.saveRent(this.formData).then(() => {
          return this.$router.replace("/charge").then(() => {
            this.$toast.success("保存成功！");
          });
        });
      });
    }
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
.van-uploader__wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.btn-group {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
