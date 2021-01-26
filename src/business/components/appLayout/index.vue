<template>
  <div class="layout__main">
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
