<template>
  <van-collapse v-model="active" class="right">
    <van-collapse-item v-for="collapse in collapses" :key="collapse.imei" :title="collapse.title">
      <template #title>
        <div>
          <input type="checkbox" v-model="collapse.checked" @click.stop />
          <!-- <van-checkbox shape="square"  icon-size="14" :label-disabled="true"> -->
          {{ collapse.title }}
          <!-- </van-checkbox> -->
        </div>
      </template>

      <!-- 内容 -->
      <van-row v-for="box in collapse.list" :key="box.id">
        <van-col span="10" class="left-col">
          <van-checkbox name="a" shape="square" icon-size="14" v-model="box.checked">
            <van-image :src="errIcon" width="80" height="60" fit="contain">
              <template v-slot:error><van-image :src="errIcon" /></template>
            </van-image>
          </van-checkbox>
        </van-col>
        <van-col span="14" offset="0" class="right-col">
          <van-row v-for="(rw, index1) in box.rows" :key="index1">
            <van-col span="12" class="text-black">{{ rw.name }}</van-col>
            <van-col span="12">{{ rw.value }}</van-col>
          </van-row>
        </van-col>
      </van-row>
    </van-collapse-item>
  </van-collapse>
</template>

<script>
export default {
  name: "collapse",
  props: {
    collapses: {
      type: Array,
      required: true
    },
    errIcon: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      active: [],
      rrr: false
    };
  },
  created() {
    console.log(this.errIcon);
  },
  mounted() {
    console.log(this.collapses);
  },
  methods: {
    onclick(val) {
      debugger;
      val.checked = !val.checked;
      console.log(this.collapses);
    },
    click(box) {
      debugger;
      console.log(box);
      // this.setChecked(box.checked);
      box.checked = true;
    },
    headClick(e) {
      e.stopPropagation();
      // e.preventDefault();
      //console.log(i);
      console.log(e);
      //return false;
      // debugger;
      // // return false;
      // if (this.collapses[index].checked) {
      //   this.$refs["checkboxGroup_" + index].checked.toggleAll(true);
      // } else {
      //   this.$refs["checkboxGroup_" + index].checked.toggleAll(false);
      // }

      // this.$refs.collapse_i.toggle();
      // console.log(this.collapses);
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.left-col {
  display: flex;
  text-align: left;
  height: 100%;
  .van-image {
    margin-left: -16px;
  }
}
.text-black {
  color: #000;
}
.right-col {
  margin-left: -16px;
}
</style>
