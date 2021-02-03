<template>
  <div>
    <van-field :value="Datenum" :readonly="true" @click="showPopup" is-link arrow-direction="down" v-bind="$attrs" />
    <van-popup v-model="show" position="bottom" :style="{ height: '50%' }" @click-overlay="close">
      <main>
        <!-- 选择年 -->
        <div class="yesr">
          <van-icon name="arrow-left" @click="last" />
          <span>
            {{ yesr }}年
            <span v-show="actived < 10 ? true : false">0</span>
            {{ actived }}月
          </span>
          <van-icon name="arrow" @click="next" />
        </div>

        <section>
          <div>
            <span v-for="(item, index) in 12" :key="index" :class="actived === item ? 'spanBGd' : false" @click="spanmouth(item)">{{ item }}月</span>
          </div>
        </section>

        <footer></footer>
      </main>
      <div class="button" @click="button">确定</div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      yesr: 1970, //年
      actived: 1, //月
      show: false
    };
  },
  mounted() {
    //   设置默认年份
    var date = new Date();
    this.yesr = date.getFullYear();
    this.actived = date.getMonth() + 1;
  },
  computed: {
    Datenum() {
      return `${this.yesr}-${this.actived}`;
    }
  },
  methods: {
    //   上一年
    last() {
      this.yesr = this.yesr - 1;
    },
    // 下一年
    next() {
      this.yesr = this.yesr + 1;
    },
    //选择月份
    spanmouth(item) {
      this.actived = item;
    },
    //弹出层
    showPopup() {
      this.show = true;
    },
    //关闭弹出层
    close() {
      //   设置默认年份
      var date = new Date();
      this.yesr = date.getFullYear();
      this.actived = date.getMonth() + 1;
    },
    //确定
    button() {
      this.show = false;
      this.$emit("datebutton", this.Datenum);
      console.log(this.Datenum);
    }
  }
};
</script>

<style scoped lang="less">
main > .yesr {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  width: 100%;
  background: @theme-color;
  color: #fff;
}
section {
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid rgb(207, 205, 205);
}
section > div {
  width: 74%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
section > div > span {
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #666;
}
.spanBGd {
  background: @theme-color;
  color: #fff;
  border-radius: 10px;
}
.button {
  width: 80%;
  height: 50px;
  margin: 20px auto;
  line-height: 50px;
  background: linear-gradient(270deg, @theme-color 0%, @theme-color 100%);
  outline: none;
  border-radius: 2px;
  text-align: center;
  color: #fff;
}
</style>
