<template>
  <van-collapse v-model="active">
    <van-collapse-item v-for="(collapse, index) in collapses" :key="collapse.imei" :title="collapse.title" @click.stop>
      <template #title>
        <div>
          <van-checkbox shape="square" v-model="collapse.checked" icon-size="16" :label-disabled="true" @click="headClick(index)">
            {{ collapse.title }}
          </van-checkbox>
        </div>
      </template>

      <!-- 内容 -->
      <van-checkbox-group :v-model="box.id + '.checked'" :ref="'checkboxGroup_' + index" v-for="box in collapse.list" :key="box.id">
        <van-row>
          <van-col span="6" class="left-col">
            <van-checkbox name="a" shape="square" icon-size="16">
              <van-image :src="box.img" width="100" height="100">
                <template v-slot:error><van-image :src="errIcon" /></template>
              </van-image>
            </van-checkbox>
          </van-col>
          <van-col span="16" offset="2">
            <van-row v-for="(rw, index1) in box.rows" :key="index1">
              <van-col span="12" class="text-black">{{ rw.name }}</van-col>
              <van-col span="12">{{ rw.value }}</van-col>
            </van-row>
          </van-col>
        </van-row>
      </van-checkbox-group>
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
      active: []
    };
  },
  methods: {
    headClick(index) {
      //console.log(i);
      console.log(index);
      debugger;
      // return false;
      if (this.collapses[index].checked) {
        this.$refs["checkboxGroup_" + index].checked.toggleAll(true);
      } else {
        this.$refs["checkboxGroup_" + index].checked.toggleAll(false);
      }

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
  text-align: center;
  height: 100%;
}
.text-black {
  color: #000;
}
</style>
