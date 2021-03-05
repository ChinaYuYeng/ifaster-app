<template>
  <div>
    <SubmitBtn :onSubmit="leftFunc" class="staff_reject_btn" :text="leftbtn"></SubmitBtn>
    <SubmitBtn :onSubmit="rightFunc" class="staff_submit_btn" :text="rightbtn"></SubmitBtn>
  </div>
</template>

<script>
export default {
  methods: {
    submit() {
      this.$router.go(-1);
    }
  },
  props: {
    leftbtn: String,
    rightbtn: String,
    leftFunc: {
      type: Function,
      default: function() {}
    },
    rightFunc: {
      type: Function,
      default: function() {}
    }
  }
};
</script>

<style scoped>
.staff_reject_btn {
  background-color: #fff;
  color: #55babb;
  width: 30%;
  margin-left: 15%;
  margin-top: 20px;
  margin-bottom: 10px;
  border-radius: 7px;
  font-size: 13px;
}
.staff_submit_btn {
  width: 30%;
  margin-left: 10%;
  border-radius: 7px;
  font-size: 13px;
}
</style>
