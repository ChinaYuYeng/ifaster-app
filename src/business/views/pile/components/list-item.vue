<template>
  <div class="listItem">
    <div>
      <van-cell
        v-for="(item, index) in listColumns"
        :key="index"
        :title="item.label"
        :value="listData[item.prop]"
        :is-link="item.islink"
        @click="linkto(item.islink)"
      ></van-cell>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routeData: []
    };
  },
  props: {
    listColumns: {
      type: Array
    },
    listData: {
      type: Object
    },
    routePath: {
      type: String
    }
  },
  methods: {
    linkto(is) {
      if (is) {
        this.getTarget();
        this.$router.push({
          path: this.routePath,
          query: { data: this.listData, column: this.routeData }
        });
      }
    },
    getTarget() {
      for (let i = 0; i < this.listColumns.length; i++) {
        if (this.listColumns[i].islink) {
          this.routeData.push(this.listColumns[i]);
        }
      }
    }
  }
};
</script>

<style></style>
