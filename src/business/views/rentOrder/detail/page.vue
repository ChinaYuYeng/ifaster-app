<template>
  <AppLayout ref="report__wrap">
    <template slot="body-top">
      <Panel>
        <div class="content__item order__header" slot="header">
          <span>订单编号：{{ routeData.number }}</span>
          <span>{{ routeData.statusName }}</span>
        </div>
        <div class="content__item">
          <span>电池imei:</span>
          <span>{{ routeData.batteryImei }}</span>
        </div>
        <div class="content__item">
          <span>租点:</span>
          <span>{{ routeData.rentPointName }}</span>
        </div>
        <div class="content__item">
          <span>还点:</span>
          <span>{{ routeData.returnPointName }}</span>
        </div>
        <div class="content__item">
          <span>用户姓名:</span>
          <span>{{ routeData.customerName }}</span>
        </div>
        <div class="content__item">
          <span>用户手机:</span>
          <span>{{ routeData.customerMobile }}</span>
        </div>
        <div class="content__item">
          <span>起租时间:</span>
          <span>{{ routeData.startTime }}</span>
        </div>
        <div class="content__item">
          <span>归还时间:</span>
          <span>{{ routeData.realEndTime }}</span>
        </div>
        <div class="content__item">
          <span>租赁类型:</span>
          <span>{{ routeData.typeName }}</span>
        </div>
        <div class="content__item">
          <span>收费模板:</span>
          <span>{{ routeData.rentTemplateName }}</span>
        </div>
        <div class="content__item">
          <span>公司赠送积分:</span>
          <span>{{ routeData.points }}</span>
        </div>
        <div class="content__item order__footer" slot="footer">
          <span>{{ routeData.returnTime }}</span>
          <span>营收：{{ routeData.payFee }}元</span>
          <span>实收：{{ routeData.realIncome }}元</span>
        </div>
      </Panel>
    </template>
    <van-collapse accordion v-model="activeName" class="mtop10">
      <van-collapse-item name="0" v-if="routeData.isTimeout">
        <template #title>
          <span style="color:red;">订单异常</span>
        </template>
        <div class="content__item">
          <span>异常原因:</span>
          <span>逾期未还</span>
        </div>
        <div class="content__item">
          <span>操作:</span>
          <span>
            <van-button
              text="结束订单"
              size="mini"
              type="primary"
              @click="routerTo({ name: '/rentOrder/detail/settle', params: routeData })"
            ></van-button>
          </span>
        </div>
      </van-collapse-item>
      <van-collapse-item title="收支详情" name="1">
        <div class="content__item">
          <span>押金:</span>
          <span>{{ rentFeeTemplate.deposit }}元</span>
        </div>
        <div class="content__item">
          <span>营收:</span>
          <span>{{ routeData.payFee }}元</span>
        </div>
        <div class="content__item">
          <span>支出:</span>
          <span>{{ routeData.income && routeData.income.expend }}元</span>
        </div>
        <div class="content__item">
          <span>分账:</span>
          <span>{{ routeData.income && routeData.income.settle }}元</span>
        </div>
        <div class="content__item">
          <span>分账人员:</span>
          <span>{{ routeData.income && routeData.income.settles.map(v => v.name).join(",") }}</span>
        </div>
        <div class="content__item">
          <span>实收:</span>
          <span>{{ routeData.realIncome }}元</span>
        </div>
      </van-collapse-item>
      <van-collapse-item title="收费模板详情" name="2">
        <div class="content__item">
          <span>押金:</span>
          <span>{{ rentFeeTemplate.deposit }}元</span>
        </div>
        <div class="content__item">
          <span>短租:</span>
          <span>{{ rentFeeTemplate.shortRent && rentFeeTemplate.shortRent.hour }}元/小时</span>
        </div>
        <div class="content__item">
          <span>短租上限:</span>
          <span>{{ rentFeeTemplate.shortRent && rentFeeTemplate.shortRent.max }}元/天</span>
        </div>
        <div class="content__item">
          <span>周租:</span>
          <span>{{ rentFeeTemplate.longRent && rentFeeTemplate.longRent.week }}元/周</span>
        </div>
        <div class="content__item">
          <span>月租:</span>
          <span>{{ rentFeeTemplate.longRent && rentFeeTemplate.longRent.month }}元/月</span>
        </div>
        <div class="content__item">
          <span>年租:</span>
          <span>{{ rentFeeTemplate.longRent && rentFeeTemplate.longRent.year }}元/年</span>
        </div>
        <div class="content__item">
          <span>YO车:</span>
          <span>
            {{ rentFeeTemplate.yoRent && rentFeeTemplate.yoRent.price }}/期（共{{ rentFeeTemplate.yoRent && rentFeeTemplate.yoRent.price }}期）
          </span>
        </div>
        <div class="content__item">
          <span>YO车积分:</span>
          <span>{{ rentFeeTemplate.yoRent && rentFeeTemplate.yoRent.points }}</span>
        </div>
      </van-collapse-item>
      <van-collapse-item title="用户信息" name="3">
        <div class="content__item">
          <span>用户姓名:</span>
          <span>{{ routeData.customerName }}</span>
        </div>
        <div class="content__item">
          <span>用户手机:</span>
          <span>{{ routeData.customerMobile }}</span>
        </div>
      </van-collapse-item>
      <van-collapse-item title="设备信息" name="4">
        <div class="content__item">
          <span>设备关系:</span>
          <span>{{ routeData.batteryModel }}</span>
        </div>
        <div class="content__item">
          <span>电池imei:</span>
          <span>{{ routeData.batteryImei }}</span>
        </div>
        <div class="content__item">
          <span>电池编号:</span>
          <span>{{ routeData.batteryModel }}</span>
        </div>
      </van-collapse-item>
    </van-collapse>
  </AppLayout>
</template>

<script>
export default {
  data() {
    return {
      activeName: "",
      routeData: this.$route.params
    };
  },
  created() {
    this.$apis.getOrderDetail({ id: this.routeData.id }).then(res => {
      this.routeData = res.data;
    });
  },
  computed: {
    rentFeeTemplate() {
      return this.routeData.rentFeeTemplate || {};
    },
    income() {
      return this.routeData.income || {};
    }
  },
  methods: {}
};
</script>

<style lang="less" scoped></style>
