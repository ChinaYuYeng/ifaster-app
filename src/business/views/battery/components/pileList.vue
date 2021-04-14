<template>
  <div class="pilelist">
    <img class="list-img" :src="setImg(item1[imgProp])" />
    <div v-for="(item, index) in columns" :key="index" class="text-bar">
      <div class="label-bar">
        <span class="label">{{ item.label }} :</span>
      </div>
      <span class="data">{{ item1[item.prop] }}</span>
      <span v-if="item.bprop" class="data">{{ item1[item.bprop] }}</span>
      <span v-if="item.aprop">{{ " (" + item1[item.aprop] + ")" }}</span>
    </div>
    <van-icon v-if="hasArrow" class="arrow-icon" name="arrow" size="20" color="#B2B2B2" />
  </div>
</template>
<script>
import defaultImg from "../testImg/battery.png";
export default {
  name: "PileList",
  data() {
    return {
      defaultImg
      // imgList:[]
    };
  },
  props: {
    item1: Object,
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
    }
  },
  methods: {
    setImg(data) {
      if (data) {
        return data;
      } else {
        return this.defaultImg;
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
.pilelist {
  height: 100px;
}
.list-img {
  width: 25%;
  border: 1px solid #dddddd;
  float: left;
  /* margin-top: 20px; */
  margin-bottom: 15px;
  margin-right: 10px;
  position: absolute;
  /* margin-top: 10%; */
  /* transform: translateY(10%); */
}
.arrow-icon {
  position: absolute;
  top: 55px;
  left: 93%;
}
.text-bar {
  width: 65%;
  line-height: 20px;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 30%;
  /* position: relative; */
  /* top: 18px;
  left: 10px; */
}
.label-bar {
  float: left;
  width: 22%;
}
.data {
  color: #b2b2b2;
  margin-left: 20px;
}
</style>
