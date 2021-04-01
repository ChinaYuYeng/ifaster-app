<template>
  <AppLayout>
    <van-form ref="form" validate-trigger="onSubmit">
      <Panel>
        <div class="cell-h">模板</div>
        <van-field v-model="formData.name" label="模板名称：" placeholder="请输入模板名称" input-align="right" />

        <van-field name="uploader" label="设备图片：">
          <template #input>
            <van-uploader class="mt-3" :max-size="3 * 1024 * 1024" :before-read="beforeRead" @oversize="onOversize">
              <img width="50px" :src="formData.img" alt="" />
            </van-uploader>
          </template>
        </van-field>
      </Panel>
      <Panel>
        <div class="cell-h">押金</div>
        <van-field v-model.number="formData.price.deposit" type="number" label="预交押金：" placeholder="0.00" input-align="right" extra="A" />
        <!-- <van-cell title="收费模式：">
          <van-dropdown-menu active-color="#55BABB">
            <van-dropdown-item v-model="formData.price.rentModel" :options="optionB" disabled />
          </van-dropdown-menu>
        </van-cell> -->
        <van-cell title="收费模式：" :value="showContent" size="large" />
        <van-cell title="还车围栏:" is-link @click="showPopupFun" :value="columns.name" placeholder="选择还车围栏" v-model="templateName" />
        <van-popup v-model="showPicker" position="bottom" :style="{ height: '30%' }">
          <van-picker title="还车围栏" show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
        </van-popup>
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
      <Panel>
        <div class="cell-h">其他</div>
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
        <van-field label="是否异地还车:">
          <template #button>
            <van-switch v-model="formData.price.otherPlaceReturn" size="20" active-color="#55BABB" />
          </template>
        </van-field>
        <van-field label="是否异点还车:">
          <template #button>
            <van-switch v-model="formData.price.otherPointReturn" size="20" active-color="#55BABB" />
          </template>
        </van-field>
        <van-field label="是否短租免费充电:">
          <template #button>
            <van-switch v-model="formData.price.freeCharge" size="20" active-color="#55BABB" />
          </template>
        </van-field>
      </Panel>
    </van-form>
    <div class="btn-group">
      <van-button class="btn-01" text="删除" @click="delt"></van-button>
      <van-button class="btn-01" text="保存" type="primary" @click="onSubmit"></van-button>
    </div>
    <!-- 剪裁图片组件 -->
    <van-popup class="bg-tran" v-model="showCropper" closeable position="top" :style="{ height: '100%' }">
      <div class="flex-column-center height100">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.outputSize"
          :outputType="option.outputType"
          :info="option.info"
          :full="option.full"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :fixed="option.fixed"
          :fixedNumber="option.fixedNumber"
          :centerBox="option.centerBox"
          :infoTrue="option.infoTrue"
          :fixedBox="option.fixedBox"
          :high="option.high"
          :mode="option.mode"
        ></vueCropper>
        <div class="popup_bottom">
          <div class="bottom_item"><span @click="cancelCropper">取消</span></div>
          <div class="bottom_item">
            <span @click="rotateImage" class="font18"><van-icon name="replay" /></span>
          </div>
          <div class="bottom_item"><span @click="getCropBlob">确定</span></div>
        </div>
      </div>
    </van-popup>
  </AppLayout>
</template>
<script>
import { VueCropper } from "vue-cropper";
export default {
  components: {
    VueCropper
  },
  data() {
    return {
      value: "",
      columns: [],
      templateName: "",
      showPicker: false,
      showCropper: false, // 截图弹窗遮罩默认隐藏
      imageAccept: "/jpg,/png,/jpeg",
      imageFileName: "",
      uploadImages: [],
      formData: {
        id: "",
        name: "",
        img: "",
        price: {
          rentModel: 1,
          deposit: 0,
          autoCheck: 1,
          isPolicy: 1,
          shortRent: {
            hour: 10,
            max: 100
          },
          longRent: {
            week: 58,
            month: 388,
            year: 1488
          },
          yoRent: {
            period: 18,
            price: 500,
            points: 500
          },
          returnFence: [1, 2, 3, 4]
        }
      },
      option: {
        img: "",
        outputSize: 0.8,
        info: false, // 裁剪框的大小信息
        outputType: "jpeg", // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: window.innerWidth - 100 + "px", // 默认生成截图框宽度
        autoCropHeight: window.innerWidth - 100 + "px", // 默认生成截图框高度
        high: true, // 是否按照设备的dpr 输出等比例图片
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        mode: "100% auto" // 图片默认渲染方式
      }
    };
  },
  created() {
    this.fileList = this.formData.img;
    if (this.$route.params.a == 1) {
      // console.log("进入--新增页面~");
      this.$apis.getRentExample({}).then(res => {
        this.formData = res.data;
        this.formData.price.rentModel = 1;
        console.log(this.$route.params.a);
      });
    } else {
      // console.log("进入--详情页面~");
      let routerData = this.getRentList;
      Object.assign(this.formData, routerData || {});
    }
    //获取还车围栏模板列表
    this.$apis.getRentFence({}).then(res => {
      // console.log("--------获取还车围栏模板列表--------");
      console.log(res.data);
      this.columns = res.data.map(p => {
        return Object.assign(p, { text: p.name });
      });
      let fence = this.columns.find(c => c.value == this.formData.price.returnFenceTempId);
      if (fence) {
        this.templateName = fence.name;
      }
    });
  },
  computed: {
    loadimg: {
      get: function() {
        return [{ url: this.formData.img }];
      },
      set: function(v) {
        return [{ url: v.url }];
      }
    },
    showContent() {
      let a = this.formData.price.rentModel;
      if (a === 1) {
        return "保证金模式";
      } else {
        return "预付费模式";
      }
    }
  },
  methods: {
    // 上传文件过大
    onOversize() {
      this.$toast("图片不能大于3M");
    },

    // 获取文件后缀
    getFileSuffix(fileName) {
      return fileName.match(/\/\w+$/)[0].toLowerCase();
    },

    // 选择图片上传前操作，调起剪裁组件
    beforeRead(file) {
      if (!this.imageAccept.includes(this.getFileSuffix(file.type))) {
        return this.$toast("请上传 jpg/png 格式图片");
      }
      this.showCropper = true;
      this.imageFileName = file.name;
      // 本地图片转成base64，用于截图框显示本地图片
      this.imageToBase64(file);
    },
    // 将本地图片转化为Base64，否则vue-cropper组件显示不出要本地需要剪裁的图片
    imageToBase64(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // 截图框中的图片
        this.option.img = reader.result;
      };
      reader.onerror = function(error) {
        console.log("Error: ", error);
      };
    },

    // 确认剪裁并上传图片
    async getCropBlob() {
      this.$toast("上传中", 0);
      let formData = new FormData();
      this.$refs.cropper.getCropBlob(data => {
        console.log("imageFileName:" + this.imageFileName);
        formData.append("file", data, this.imageFileName);
        // formData私有类对象，访问不到，可以通过get判断值是否传进去
        // console.log(formData, formData.get("file"));
        //上传文件
        this.$apis.uploadImage(formData).then(response => {
          if (response.code === 0) {
            this.$toast("更改头像成功");
            this.formData.img = "http://dev.issks.com" + response.url;
            this.showCropper = false;
            // this.showPopup = false;
          } else {
            this.$toast("上传失败");
          }
        });
      });
    },

    // 旋转图片
    rotateImage() {
      this.$refs.cropper.rotateRight();
    },

    // 取消截图上传头像
    cancelCropper() {
      this.showCropper = false; // 隐藏切图遮罩
      this.showPopup = true;
    },
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
            if (aaa.code == "1") {
              return this.$router.replace("/charge").then(() => {
                this.$toast.success("删除成功！");
              });
            }
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
    },
    showPopupFun() {
      this.showPicker = true;
    },
    onConfirm(item) {
      this.formData.price.returnFenceTempId = item.value;
      this.templateName = item.text;
      this.showPicker = false;
    },
    // onChange(picker, value, index) {
    //   this.$toast("当前值：${value}, 当前索引：${index}");
    // },
    onCancel() {
      this.$toast("取消");
      this.showPicker = false;
    }
  }
};
</script>
<style lang="less" scoped>
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

.btn-01 {
  padding: 0.3rem 0.5rem;
  border-radius: 0.1rem;
}
.van-uploader__input-wrapper img {
  width: 50%;
  float: right;
}
.height100 {
  height: 100vh;
}
.van-popup--top {
  top: 0;
  left: 0;
  width: 100%;
}
.flex-column-center {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
}
.vue-cropper {
  background: #000;
  .cropper-view-box {
    outline: 1px solid #fff !important;
    outline-color: #fff !important;
  }
}
.popup_bottom {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  .bottom_item {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.popup_bottom .bottom_item {
  color: #55babb;
}
.van-field__control:read-only {
  cursor: default;
  text-align: right;
}
</style>
