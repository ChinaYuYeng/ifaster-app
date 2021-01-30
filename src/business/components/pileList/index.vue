<template>
  <div class="pilelist">
    <van-cell v-for="(item1, index) in result" :key="index" @click="goDetail(item1)">
      <img class="list-img" :src="item1[imgProp]" />
      <div v-for="(item, index) in columns" :key="index" class="text-bar">
        <div class="label-bar">
          <span class="label">{{ item.label }} :</span>
        </div>
        <span class="data">{{ item1[item.prop] }}</span>
      </div>
      <van-icon v-if="hasArrow" class="arrow-icon" name="arrow" size="20" color="#B2B2B2" />
    </van-cell>
  </div>
</template>
<script>
export default {
  name: "PileList",
  data() {
    return {
      // imgList:[]
    };
  },
  props: {
    useRoute: {
      type: Boolean,
      default: true
    },
    hasArrow: {
      type: Boolean,
      default: true
    },
    imgProp: String,
    columns: {
      type: Array
    },
    result: {
      type: Array
    },
    routePath: String,
    routeData: String
    // otherDatas:Array
  },
  methods: {
    goDetail(item) {
      if (this.useRoute) {
        this.$router.push({
          path: this.routePath,
          query: { data: item[this.routeData] }
        });
      }
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.list-img {
  width: 25%;
  border: 1px solid #dddddd;
  float: left;
  margin-top: 20px;
  margin-left: 25px;
  margin-bottom: 20px;
}
.arrow-icon {
  position: absolute;
  top: 55px;
  left: 90%;
}
.text-bar {
  position: relative;
  top: 18px;
  left: 10px;
}
.label-bar {
  float: left;
  width: 25%;
}
p {
  position: relative;
  top: 20px;
  left: 10px;
  font-size: 15px;
  color: #353535;
}
.data {
  color: #b2b2b2;
}
</style>
