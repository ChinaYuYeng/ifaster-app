<template>
  <AppLayout>
    <van-form ref="form">
      <Panel>
        <div class="cell-h">模板</div>
        <van-field v-model="formData.name" label="模板名称：" placeholder="请输入模板名称" input-align="right" />
        <van-field name="uploader" label="设备图片：">
          <template #input>
            <van-uploader v-model="loadimg" />
          </template>
        </van-field>
      </Panel>
      <Panel>
        <div class="cell-h">按设备：</div>
        <van-field
          v-for="item in formData.price.once"
          v-model="item.price"
          type="number"
          :label="'型号 (元/次)：' + item.type"
          placeholder="0"
          input-align="right"
        />
      </Panel>
      <Panel>
        <div class="cell-h">按时长</div>
        <van-field
          v-for="item in formData.price.time"
          v-model="item.price"
          type="number"
          :label="item.type + '分钟'"
          placeholder="0"
          input-align="right"
        />
      </Panel>
    </van-form>
    <div class="btn-group">
      <van-button text="删除" @click="delt"></van-button>
      <van-button text="保存" type="primary" @click="onSubmit"></van-button>
    </div>
  </AppLayout>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        id: "",
        img: "",
        name: "",
        price: {
          once: [
            {
              price: 0,
              type: ""
            }
          ],
          time: [
            {
              price: 0,
              type: ""
            }
          ]
        }
      }
    };
  },
  created() {
    if (this.$route.params.a == 1) {
      console.log("进入--充电收费--新增页面~");
      this.$apis.getPileExample({}).then(res => {
        this.formData = res.data;
        console.log(this.$route.params.a);
      });
    } else {
      console.log("进入--充电收费--详情页面~");
      let routerData = this.getPileList;
      Object.assign(this.formData, routerData || {});
    }
  },
  methods: {
    delt() {
      this.$dialog
        .confirm({
          title: "删除模板",
          message: "您是否要删除此模板？点击确定，即可删除"
        })
        .then(() => {
          // on confirm
          return this.$apis.deletePile(this.formData).then(aaa => {
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
        return this.$apis.savePile(this.formData).then(() => {
          return this.$router.replace("/charge").then(() => {
            this.$toast.success("保存成功！");
          });
        });
      });
    }
  },
  computed: {
    loadimg() {
      return [{ url: this.formData.img }];
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
.van-field__label {
  width: 40%;
}
</style>
