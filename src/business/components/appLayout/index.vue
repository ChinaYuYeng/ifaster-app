<template>
  <div class="layout__main" v-if="showContent">
    <HeaderNav v-if="showHeader" @click="showSearch = true" :showIcon="showSearchIcon"></HeaderNav>
    <BodyContent :onRefresh="onRefresh" :isScroll="isScroll" :padding="padding">
      <slot name="body-top" slot="top"></slot>
      <slot></slot>
      <slot name="body-bottom" slot="bottom"></slot>
    </BodyContent>
    <FooterMenu v-if="showFooter"></FooterMenu>
    <Search :show.sync="showSearch">
      <slot
        name="search"
        :close="
          () => {
            this.showSearch = false;
          }
        "
      ></slot>
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
    isScroll: Boolean,
    showFooter: {
      type: Boolean,
      default: false
    },
    padding: String
  },
  data() {
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
    },
    showSearchIcon() {
      return !!this.$slots.search || !!this.$scopedSlots.search;
    }
  },
  components: {
    HeaderNav,
    BodyContent,
    FooterMenu,
    Search
  },
  watch: {
    showContent(val) {
      if (val) {
        this.$emit("onshow");
      } else {
        this.$emit("onhide");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.layout__main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: hidden;
  position: relative;
  background-color: #fafafa;
}
</style>
