<template>
  <div class="userInfo">
    <div class="userInfo__left">
      <img :src="avatar" class="userInfo__avatar" :style="{ weight: height, height: height }" />
      <div class="userInfo__list" v-onResize="resizeImg">
        <slot>
          <span class="userInfo__list-item">下线</span>
          <span class="userInfo__list-item">12345677889</span>
          <span class="userInfo__list-item">编号232323</span>
        </slot>
      </div>
    </div>
    <div class="userInfo__right">
      <slot name="otherInfo"></slot>
    </div>
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
  },
  data() {
    return {
      height: "0px"
    };
  },
  methods: {
    resizeImg(el) {
      this.$nextTick(() => {
        this.height = el.getBoundingClientRect().height + "px";
      });
    }
  }
};
</script>

<style lang="less" scoped>
.userInfo {
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.userInfo__left {
  display: flex;
}
.userInfo__avatar {
  border-radius: 100%;
  display: block;
  margin: 0 auto;
}
.userInfo__list,
.userInfo__right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  padding-left: 10px;
}
</style>
