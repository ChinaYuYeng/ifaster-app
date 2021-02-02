<template>
  <AppLayout ref="report__wrap">
    <LoadList :loadData="onLoad" class="mtop10">
      <Panel v-for="item in datalist" :key="item.date" class="mtop10">
        <div class="content__item order__header" slot="header">
          <span class="item__title">操作类型</span>
          <span>{{ item.type }}</span>
        </div>
        <div class="content__item">
          <span class="item__label">操作人员:</span>
          <span>{{ item.name }}</span>
        </div>
        <div class="content__item">
          <span class="item__label">操作时长:</span>
          <span>{{ item.time }}</span>
        </div>
        <div class="content__item order__footer" slot="footer">
          <span>{{ item.date }}</span>
        </div>
      </Panel>
    </LoadList>
  </AppLayout>
</template>

<script>
export default {
  data() {
    return {
      finished: false,
      loading: false,
      datalist: [
        {
          type: "强锁",
          date: "2021-01-16",
          time: "3小时2分钟",
          name: "店员1"
        },
        {
          date: "2021-01-17",
          time: "3小时2分钟",
          name: "店员2"
        },
        {
          date: "2021-01-18",
          time: "3小时2分钟",
          name: "店员3"
        },
        {
          date: "2021-01-19",
          time: "3小时2分钟",
          name: "店员4"
        }
      ]
    };
  },
  created() {
    this.getLogs();
  },
  methods: {
    getLogs() {
      let id = this.getbatteryInfo.id;
      this.$apis.log({ id: id }).then(res => {
        console.log(res.data);
      });
    },
    onLoad() {
      return new Promise(resolve => {
        setTimeout(() => {
          this.datalist.push({
            date: new Date().toDateString(),
            time: "2小时30分钟",
            name: "店员" + (this.datalist.length + 1)
          });
          resolve();
        }, 1000);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.item__title {
  color: #353535;
  font-weight: 600;
  border-left: 3px solid #55babb;
  padding-left: 3px;
}
.item__label {
  margin-left: 5px;
  color: #353535;
}
</style>
