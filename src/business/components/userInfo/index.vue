<template>
  <div class="userInfo">
    <van-row>
      <van-col span="8">
        <img :src="avatar" class="userInfo__avatar" />
      </van-col>
      <van-col span="16">
        <div class="userInfo__list">
          <span class="userInfo__list-item">下线</span>
          <span class="userInfo__list-item">12345677889</span>
          <span class="userInfo__list-item">编号232323</span>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import _avatar from "./default.jpg";
export default {
  props: {
    avatar: {
      type: String,
      default: _avatar
    }
  }
};
</script>

<style lang="less" scoped>
.userInfo {
  padding: 10px;
}
.userInfo__avatar {
  width: 53px;
  height: 53px;
  border-radius: 100%;
}
.userInfo__list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .userInfo__list-item {
    font-size: 14px;
    font-weight: bold;
    line-height: 1.5;
  }
  .userInfo__list-item + .userInfo__list-item {
    font-weight: normal;
    font-size: 12px;
  }
}
</style>
