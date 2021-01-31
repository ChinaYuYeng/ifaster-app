<template>
  <div>
    <van-cell class="list" v-for="item in dataList" :key="item.id" @click="goEdit()">
      <img class="list-img" :src="item.img" alt="" />
      <div class="templatename">
        <h3>{{ item.name }}</h3>
        <!-- <span class="tips">{{ item.rentModel }}</span> -->
        <span class="tips">{{ result }}</span>
      </div>
      <van-icon class="arrow-icon" name="arrow" size="20" color="#B2B2B2" />
    </van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    useRoute: {
      type: Boolean,
      default: true
    },
    imgProp: String,
    dataList: Array
    // otherDatas:Array
  },
  methods: {
    goEdit() {
      this.$router.push({
        path: "/charge/edit"
      });
    }
  },
  computed: {
    result() {
      let showTips = "";
      if (this.dataList.rentModel == 1) {
        showTips = "保证金模式";
      } else if (this.dataList.rentModel == 2) {
        showTips = "2222222222";
      } else {
        showTips = "没有参数";
      }
      return showTips;
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
  width: 20%;
  border: 1px solid #dddddd;
  float: left;
  margin: 10px 5px;
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
