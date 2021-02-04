<template>
  <AppLayout>
    <van-form ref="form">
      <Panel>
        <div class="cell-h">模板</div>
        <van-field v-model="dataList.name" label="模板名称：" placeholder="请输入模板名称" input-align="right" />
        <van-cell title="收费模式：">
          <van-dropdown-menu active-color="#55BABB">
            <van-dropdown-item v-model="dataList.price.rentModel" :options="option" />
          </van-dropdown-menu>
        </van-cell>
        <!-- <van-field name="uploader" label="设备图片：">
          <template #input>
            <van-uploader v-model="afterRead" />
          </template>
        </van-field> -->
      </Panel>
      <Panel>
        <div class="cell-h">押金</div>
        <van-field v-model.number="dataList.price.deposit" type="number" label="预交押金：" placeholder="1000.00" input-align="right" extra="A" />
      </Panel>
      <Panel>
        <div class="cell-h">短租</div>
        <van-field v-model="dataList.price.shortRent.hour" type="number" label="短租收费(元/时)：" placeholder="3.00" input-align="right" />
        <van-field v-model="dataList.price.shortRent.max" type="number" label="收费上限(元/天)：" placeholder="10.00" input-align="right" />
      </Panel>
      <Panel>
        <div class="cell-h">长租</div>
        <van-field v-model="dataList.price.longRent.week" type="number" label="周租-(元/周):" placeholder="10.00" input-align="right" />
        <van-field v-model="dataList.price.longRent.month" type="number" label="月租-(元/月):" placeholder="100.00" input-align="right" />
        <van-field v-model="dataList.price.longRent.year" type="number" label="年租-(元/年):" placeholder="1000.00" input-align="right" />
      </Panel>
      <Panel>
        <div class="cell-h">YO车</div>
        <van-field v-model="dataList.price.yoRent.period" type="number" label="yo车总期数:" placeholder="10.00" input-align="right" />
        <van-field v-model="dataList.price.yoRent.price" type="number" label="每期价格-(元)：" placeholder="22" input-align="right" />
        <van-field v-model="dataList.price.yoRent.points" type="number" label="赠送积分：" placeholder="22" input-align="right" />
      </Panel>
      <Panel>
        <div class="cell-h">电子围栏</div>
        <van-cell center title="是否需要电子围栏：">
          <template #right-icon>
            <van-switch v-model="dataList.price.isPolicy" size="20" active-color="#55BABB" />
          </template>
        </van-cell>
        <van-cell center title="自动还车：">
          <template #right-icon>
            <van-switch v-model="dataList.price.autoCheck" size="20" active-color="#55BABB" />
          </template>
        </van-cell>
        <van-cell center title="短租免费充电:">
          <template #right-icon>
            <van-switch v-model="dataList.price.isPolicy" size="20" active-color="#55BABB" />
          </template>
        </van-cell>
        <van-cell center title="异点还车：">
          <template #right-icon>
            <van-switch v-model="dataList.price.returnFence[0]" size="20" active-color="#55BABB" />
          </template>
        </van-cell>
        <van-cell center title="是否允许异地：">
          <template #right-icon>
            <van-switch v-model="dataList.price.returnFence[1]" size="20" active-color="#55BABB" />
          </template>
        </van-cell>
      </Panel>
    </van-form>
    <btnGroup :leftbtn="'删除'" :rightbtn="'保存'"></btnGroup>
  </AppLayout>
</template>
<script>
import btnGroup from "../components/btnGroup";
export default {
  // setup() {
  //   const afterRead = file => {
  //     // 此时可以自行将文件上传至服务器
  //     console.log(file);
  //   };

  //   return {
  //     afterRead
  //   };
  // },
  data() {
    return {
      dataList: {
        id: 0,
        img: "https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/fc_big_pic/part-00715-3866.jpg",
        name: "收费模板-0A0A0A",
        price: {
          autoCheck: 0,
          deposit: 1000,
          isPolicy: 0,
          longRent: {
            month: 300,
            week: 60,
            year: 3200
          },
          rentModel: 0,
          returnFence: [],
          shortRent: {
            hour: 3,
            max: 10
          },
          yoRent: {
            period: 12,
            points: 20,
            price: 38
          }
        }
      },
      state: {
        value1: 1
      },
      option: [
        { text: "保证金模式", value: 1 },
        { text: "预付费模式", value: 2 }
      ]
    };
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
