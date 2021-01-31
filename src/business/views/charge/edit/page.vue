<template>
  <AppLayout>
    <Panel>
      <div class="cell-h">模板</div>
      <!-- <van-cell title="模板名称：">
        <span>AAA</span>
      </van-cell> -->
      <van-field v-model="text" label="模板名称：" placeholder="收费模板名称-001" input-align="right" />

      <van-cell title="收费模式：">
        <van-dropdown-menu active-color="#55BABB">
          <van-dropdown-item v-model="state.value1" :options="option" />
        </van-dropdown-menu>
      </van-cell>
      <van-cell title="模板图片：">
        <template #input>
          <van-uploader v-model="value" />
        </template>
      </van-cell>
    </Panel>
    <Panel>
      <div class="cell-h">押金</div>
      <van-field v-model="number" type="number" label="预交押金：" placeholder="1000.00" input-align="right" />
    </Panel>
    <Panel>
      <div class="cell-h">短租</div>
      <van-field v-model="number" type="number" label="短租收费(元/时)：" placeholder="3.00" input-align="right" />
      <van-field v-model="number" type="number" label="收费上限(元/天)：" placeholder="10.00" input-align="right" />
    </Panel>
    <Panel>
      <div class="cell-h">长租</div>
      <van-field v-model="number" type="number" label="周租-(元/周):" placeholder="10.00" input-align="right" />
      <van-field v-model="number" type="number" label="月租-(元/月):" placeholder="100.00" input-align="right" />
      <van-field v-model="number" type="number" label="年租-(元/年):" placeholder="1000.00" input-align="right" />
    </Panel>
    <Panel>
      <div class="cell-h">YO车</div>
      <van-field v-model="number" type="number" label="YO车-(元/期/共3期):" placeholder="10.00" input-align="right" />
      <van-field v-model="number" type="number" label="积分-(分)：" placeholder="22" input-align="right" />
    </Panel>
    <Panel>
      <div class="cell-h">电子围栏</div>
      <van-cell center title="是否需要电子围栏：">
        <template #right-icon>
          <van-switch v-model="switch1" size="20" active-color="#ee0a24" />
        </template>
      </van-cell>
      <van-cell center title="是否需要电子围栏：">
        <template #right-icon>
          <van-switch v-model="switch1" size="20" active-color="#ee0a24" />
        </template>
      </van-cell>
      <van-cell center title="是否需要电子围栏：">
        <template #right-icon>
          <van-switch v-model="switch1" size="20" active-color="#ee0a24" />
        </template>
      </van-cell>
      <van-cell center title="是否需要电子围栏：">
        <template #right-icon>
          <van-switch v-model="switch1" size="20" active-color="#ee0a24" />
        </template>
      </van-cell>
      <van-cell center title="是否需要电子围栏：">
        <template #right-icon>
          <van-switch v-model="switch1" size="20" active-color="#ee0a24" />
        </template>
      </van-cell>
    </Panel>
    <btnGroup :leftbtn="'删除'" :rightbtn="'保存'"></btnGroup>
  </AppLayout>
</template>
<script>
import { ref } from "vue";
import btnGroup from "../components/btnGroup";
export default {
  data() {
    return {
      dataList: [
        { id: 0, name: "收费模板名称-001", rentModel: 1 },
        { id: 1, name: "收费模板名称-002", rentModel: 2 },
        { id: 2, name: "收费模板名称-003", rentModel: 0 }
      ],
      state: {
        value1: 1
      },
      option: [
        { text: "保证金模式", value: 1 },
        { text: "预付费模式", value: 2 }
      ]
    };
  },
  setup() {
    const checked = ref(false);
    return { checked };
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
</style>
