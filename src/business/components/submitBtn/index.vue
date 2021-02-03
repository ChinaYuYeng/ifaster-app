<template>
  <van-button
    :text="text"
    :loading="loading"
    :loading-text="text"
    loading-size="16px"
    loading-type="spinner"
    type="primary"
    :style="{ width }"
    v-bind="$attrs"
    @click="submit"
  />
</template>

<script>
export default {
  props: {
    onSubmit: {
      type: Function,
      default: () => Promise.resolve()
    },
    text: {
      type: String,
      required: true
    },
    width: String
  },
  data() {
    return {
      loading: false
    };
  },
  methods: {
    submit() {
      this.loading = true;
      this.onSubmit().finally(() => {
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
