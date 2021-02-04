<template>
  <div>
    <SubmitBtn :onSubmit="leftFunc" class="reject" :text="leftbtn"></SubmitBtn>
    <SubmitBtn :onSubmit="rightFunc" class="submit" :text="rightbtn"></SubmitBtn>
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
.reject {
  background-color: #fff;
  color: #55babb;
  width: 30%;
  margin-left: 15%;
  margin-top: 20px;
  margin-bottom: 10px;
  border-radius: 7px;
}
.submit {
  width: 30%;
  margin-left: 10%;
  border-radius: 7px;
}
</style>
