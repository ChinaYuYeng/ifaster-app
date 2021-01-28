<template>
  <div class="layout__main" v-if="showContent">
    <HeaderNav v-if="showHeader" @click="showSearch = true"></HeaderNav>
    <BodyContent :onRefresh="onRefresh" :isScroll="isScroll">
      <slot name="body-top" slot="top"></slot>
      <slot></slot>
      <slot name="body-bottom" slot="bottom"></slot>
    </BodyContent>
    <FooterMenu></FooterMenu>
    <Search :show.sync="showSearch">
      <slot name="search"></slot>
    </Search>
  </div>
  <router-view v-else></router-view>
</template>

<script>
import HeaderNav from "./components/headerNav";
import BodyContent from "./components/bodyContent";
import FooterMenu from "./components/footerMenu";
import Search from "./components/search";
export default {
  props: {
    showHeader: {
      type: Boolean,
      default: true
    },
    onRefresh: Function,
    isScroll: Boolean
  },
  data: function() {
    return {
      showSearch: false
    };
  },
  inject: ["$pagePath"],
  computed: {
    /* 是否显示当前页面，或者提供router-view */
    showContent() {
      let path = this.$route.fullPath;
      let index = path.indexOf("?");
      path = index >= 0 ? path.slice(0, index) : path;
      return path === this.$pagePath;
    }
  },
  components: {
    HeaderNav,
    BodyContent,
    FooterMenu,
    Search
  }
};
</script>

<style lang="less" scoped>
.layout__main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  position: relative;
}
</style>
