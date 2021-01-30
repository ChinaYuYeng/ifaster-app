<template>
  <AppLayout>
    <div>收费模板编辑</div>
    <van-field name="uploader" label="文件上传">
      <template #input>
        <van-uploader v-model="value" />
      </template>
    </van-field>
    <van-field name="slider" label="滑块">
      <template #input>
        <van-slider v-model="valuea" />
      </template>
    </van-field>
    <van-field label="文本" right-icon="warning-o" placeholder="显示图标" />
  </AppLayout>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    const value = ref([{ url: "https://img.yzcdn.cn/vant/leaf.jpg" }]);
    return { value };
  }
};
</script>
<style lang="less"></style>
