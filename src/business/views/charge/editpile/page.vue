<template>
  <AppLayout>
    <van-form ref="form">
      <Panel>
        <div class="cell-h">模板</div>
        <van-field v-model="dataList.name" label="模板名称：" placeholder="请输入模板名称" input-align="right" />
        <van-field name="uploader" label="设备图片：">
          <template #input>
            <van-uploader v-model="afterRead" />
          </template>
        </van-field>
      </Panel>
      <Panel>
        <div class="cell-h">按型号</div>
        <div v-for="item in SavePileInfo" :key="item.id">
          <van-field v-model="dataList.price.once" type="number" label="型号：4815" placeholder="3.00" input-align="right" />
        </div>
      </Panel>
      <Panel>
        <div class="cell-h">按时长</div>
        <!-- <van-field v-model="dataList.price.longRent.week" type="number" label="周租-(元/周):" placeholder="10.00" input-align="right" /> -->
      </Panel>
    </van-form>
    <btnGroup :leftbtn="'删除'" :rightbtn="'保存'"></btnGroup>
  </AppLayout>
</template>
<script>
import btnGroup from "../components/btnGroup";
export default {
  setup() {
    const afterRead = file => {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    };

    return {
      afterRead
    };
  },
  data() {
    return {
      dataList: {},
      state: {
        value1: 1
      },
      option: [
        { text: "保证金模式", value: 1 },
        { text: "预付费模式", value: 2 }
      ]
    };
  },
  created() {
    this.dataList = this.setPileList;
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
