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
import vhCheck from "@/assets/lib/vh-check";
vhCheck();
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
      showSearch: false,
      pageActived: true /* 如果页面处于缓存非活跃状态，那么不再计算showContent，维持原有状态 。 模块横向路由切换，和模块内纵向内路由切换,不相互穿插*/,
      showContent: false /* 是否显示当前页面，或者提供router-view */
    };
  },
  inject: ["$pagePath"],
  computed: {
    /**在keepalive状态下的组件，即使在非活跃状态下也会重新计算计算属性的值，从而导致showContent状态混乱，showContent 理应保持在actived时的状态，非actived的状态不应该改变 */
    // showContent() {
    //   let path = this.$route.fullPath;
    //   let index = path.indexOf("?");
    //   path = index >= 0 ? path.slice(0, index) : path;
    //   console.log(this.$parent.$options.name, "showContent", path);
    //   return this.$pagePath.indexOf(path) > -1;
    // },
    showSearchIcon() {
      return !!this.$slots.search;
    }
  },
  created() {
    this.firstCreate = true;
  },
  activated() {
    this.pageActived = true;
  },
  deactivated() {
    this.pageActived = false;
  },
  components: {
    HeaderNav,
    BodyContent,
    FooterMenu,
    Search
  },
  watch: {
    showContent(val) {
      if (this.firstCreate) {
        // 首次创建不触发onshow或者onhide，因为会和created，actived，mounted钩子逻辑重叠
        // onshow和onhide在纵向路由前进或者后退时触发，横向路由切换和组件创建时可以用actived和deactived满足需求
        this.firstCreate = false;
        return;
      }
      if (val) {
        this.$emit("onshow");
      } else {
        this.$emit("onhide");
      }
    },
    $route: {
      handler() {
        if (!this.pageActived) return;
        let path = this.$route.fullPath;
        let index = path.indexOf("?");
        path = index >= 0 ? path.slice(0, index) : path;
        this.showContent = this.$pagePath.indexOf(path) > -1;
        // console.log(this.$parent.$options.name, "showContent", this.showContent);
      },
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
.layout__main {
  display: flex;
  flex-direction: column;
  height: calc(100vh - var(--vh-offset));
  overflow-y: hidden;
  position: relative;
}
</style>
