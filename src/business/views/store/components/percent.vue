<template>
  <div>
    <van-form ref="form" @submit="toSubmit" :show-error-message="false">
      <van-field
        v-model="dataForm.percent"
        label="分账比例"
        placeholder="请输入分账比例"
        input-align="right"
        label-width="200"
        :rules="[{ required: true, message: '请填写分账比例' }]"
        name="percent"
      >
        <template #extra>%</template>
      </van-field>
      <van-field
        v-model="dataForm.limit"
        :label="limitLabel"
        placeholder="请输入上限"
        input-align="right"
        label-width="200"
        :rules="[{ required: true, message: '请填写上限' }]"
        name="limit"
      >
        <template #extra>元</template>
      </van-field>
    </van-form>
  </div>
</template>

<script>
export default {
  name: "percent",
  props: {
    operationType: {
      type: Number,
      default: 0
    },
    onSubmit: {
      type: Function,
      default: null
    }
  },
  created() {
    if (this.operationType == 0) {
      this.limitLabel += "（长租）";
    }
  },
  components: {},
  data() {
    return {
      dataForm: {
        percent: "",
        limit: ""
      },
      limitLabel: "单次金额上限"
    };
  },
  methods: {
    toSubmit() {
      this.$refs.form
        .validate()
        .then(() => {
          if (this.onSubmit != null) {
            this.onSubmit();
          }
        })
        .catch(res => {
          console.log(res);
        });
    }
  }
};
</script>
