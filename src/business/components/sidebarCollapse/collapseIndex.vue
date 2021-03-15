<template>
  <van-collapse v-model="active" class="right">
    <van-collapse-item v-for="(myCollapse, index) in collapses" :key="myCollapse.imei" :title="myCollapse.title" :name="index">
      <template #title>
        <div class="title-content">
          <input type="checkbox" v-model="myCollapse.checked" @click.stop="headClick(myCollapse.checked, index)" class="mycheck-box" />
          <!-- <label for="color-input-red"></label> -->

          {{ myCollapse.title }}

          <!-- </van-checkbox> -->
        </div>
      </template>

      <!-- 内容 -->
      <van-row v-for="box in myCollapse.list" :key="box.id" class="content-row">
        <van-col span="2" class="left-col">
          <van-checkbox name="a" shape="square" icon-size="14" v-model="box.checked" @click.stop="contentClick(box.checked, index)"></van-checkbox>
        </van-col>
        <van-col span="22" offset="0" class="right-col">
          <van-row>
            <van-col span="24">
              <van-image :src="errIcon" fit="contain" class="list-img">
                <template v-slot:error><van-image :src="errIcon" /></template>
              </van-image>
            </van-col>
          </van-row>
          <van-row v-for="(rw, index1) in box.rows" :key="index1">
            <van-col span="8" class="text-black font-12">{{ rw.name }}</van-col>
            <van-col span="16" class="title-content font-12">{{ rw.value }}</van-col>
          </van-row>
        </van-col>
      </van-row>
    </van-collapse-item>
  </van-collapse>
</template>

<script>
export default {
  inject: {
    changeOtherCollapse: {
      default: id => console.log(id)
    }
  },
  name: "collapseIndex",
  props: {
    collapses: {
      type: Array,
      required: true
    },
    errIcon: {
      type: String,
      required: true
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      loading: false,
      active: [],
      seletedHeadIndex: -1
    };
  },
  created() {
    if (this.activeIndex >= 0) {
      this.active = [];
      this.active.push(this.activeIndex);
    }
  },
  mounted() {},
  methods: {
    contentClick(checked, index) {
      // let cc = box.find(c => c.checked == true);
      if (checked) {
        this.seletedHeadIndex = index;
        let checkId;
        this.collapses.forEach((c, i) => {
          if (i != index) {
            c.checked = false;
            c.list.forEach(t => (t.checked = false));
          } else {
            checkId = c.list.find(d => d.checked == true).id;
            c.checked = true;
          }
        });

        if (typeof this.changeOtherCollapse == "function") {
          this.changeOtherCollapse(checkId);
        }
      }
      // 是否一个都没有选中了
      let selIndex = this.collapses[index].list.findIndex(b => b.checked == true);
      if (selIndex == -1) {
        this.collapses[index].checked = false;
      }
    },
    headClick(checked, index) {
      // debugger;
      if (!checked) {
        let checkId;
        if (this.seletedHeadIndex != index) {
          if (this.seletedHeadIndex > -1) {
            this.collapses[this.seletedHeadIndex].checked = false;
            this.collapses[this.seletedHeadIndex].list.forEach(c => {
              c.checked = false;
            });
          }
        }
        checkId = this.collapses[index].list[0].id;

        this.seletedHeadIndex = index;
        // 下面的checkbox 也选中
        this.collapses[index].list.forEach(c => {
          c.checked = true;
        });
        if (typeof this.changeOtherCollapse == "function") {
          this.changeOtherCollapse(checkId);
        }
      } else {
        this.collapses[index].list.forEach(c => {
          c.checked = false;
        });
      }
    }
  },
  watch: {}
};
</script>
<style lang="less" scoped>
.list-img {
  width: 50%;
  border: 1px solid #dddddd;
  float: left;
}
.font-12 {
  font-size: 12px;
}
.title-content {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  // display: inline;
}
.left-col {
  display: flex;
  text-align: left;
}
.text-black {
  color: #000;
}
.right-col {
  margin-left: 0;
}

.mycheck-box + label {
  // display: block;
  // box-sizing: border-box;
  // width: 1.25em;
  // height: 1.25em;
  // color: transparent;
  // font-size: 0.8em;
  // line-height: 1.25;
  // text-align: center;
  border: 1px solid #00bcd4;
  // -webkit-transition-duration: 0.2s;
  // transition-duration: 0.2s;
  // -webkit-transition-property: color, border-color, background-color;
  // transition-property: color, border-color, background-color;
  display: inline-block;
  width: 1.25em;
  height: 1.25em;
  cursor: pointer;
  // position: absolute;
  // top: 2px;
  // left: 15px;
  font-size: 14px;
  //background: #00bcd4;
}
.mycheck-box:checked + label::before {
  display: block;
  content: "\2714";
  text-align: center;
  font-size: 14px;
  color: white;
}
.content-row {
  margin-top: 5px;
}
.content-row + .content-row {
  border-top: #e6e6e6 1px solid;
  padding-top: 5px;
}
</style>
