<template>
  <div>
    <!-- <van-cell class="list" v-for="item in batteryInfo" :key="item.id" @click="goEdit(item.id)"> -->
    <img class="list-img" :src="imgnResult" alt="" />
    <div class="templatename">
      <h3>{{ item.name }}</h3>
      <span class="tips">{{ item.rowsrentModel }}</span>
      <span class="tips">{{ result }}</span>
    </div>
    <van-icon class="arrow-icon" name="arrow" size="20" color="#B2B2B2" />
    <!-- </van-cell> -->
  </div>
</template>

<script>
import batteryImg from "../../../../assets/images/battery.png";

export default {
  data() {
    return {
      batteryImg: batteryImg
    };
  },
  props: {
    useRoute: {
      type: Boolean,
      default: true
    },
    imgProp: String,
    rentInfo: Array,
    item: Object
  },
  methods: {
    goEdit() {
      this.$router.push({
        path: "/charge/editrent"
      });
    }
  },
  computed: {
    result() {
      let showTips = "";
      if (this.item.price.rentModel == 1) {
        showTips = "保证金模式";
      } else if (this.dataList.rows.price.rentModel == 2) {
        showTips = "预付费模式";
      } else {
        showTips = "";
      }
      return showTips;
    }
    // imgnResult() {
    //   let showImg = "";
    //   if (this.item.img) {
    //     showImg = this.item.img;
    //   } else {
    //     showImg = this.batteryImg;
    //   }
    //   return showImg;
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
  width: 20%;
  border: 1px solid #dddddd;
  float: left;
  margin: 0 5px;
}
.arrow-icon {
  position: absolute;
  top: 35%;
  left: 90%;
}
.templatename {
  color: #f90;
  margin-top: 10px;
}
.templatename > span {
  color: #ccc;
  font-weight: 700;
}
</style>
