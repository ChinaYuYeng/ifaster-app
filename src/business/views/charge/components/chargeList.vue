<template>
  <div class="pilelist">
    <van-cell v-for="(item, index) in templatename" :key="index" @click="goDetail(item1)">
      <img class="list-img" :src="item[imgProp]" alt="" />
      <div class="templatename">
        <h3>{{ item.name }}</h3>
        <span class="tips">{{ item.tips }}</span>
      </div>
      <van-icon v-if="hasArrow" class="arrow-icon" name="arrow" size="20" color="#B2B2B2" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "chargeList",
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
    templatename: {
      type: Array
    }
    // otherDatas:Array
  },
  methods: {
    goDetail(item) {
      if (this.useRoute) {
        this.$router.push({
          path: "/pile/detail",
          query: { id: item.id }
        });
      }
    }
    // getImgUrl(){
    //     for(let i=0;i<this.result.length;i++){
    //         this.imgList.push(result[i].imgProp)
    //     }
    // }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.list-img {
  width: 23%;
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
.templatename {
  margin-left: 1rem;
  color: #f90;
}
.templatename > span {
  color: #ccc;
}
</style>
