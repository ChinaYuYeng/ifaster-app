<template>
  <AppLayout>
    <tmap></tmap>
    <inputList :columns="columns" :data="dataForm"></inputList>
    <SubmitBtn :onSubmit="submit" class="submit" text="保 存"></SubmitBtn>
  </AppLayout>
</template>

<script>
import tmap from "../components/map";
import inputList from "../components/input-list";
export default {
  data() {
    return {
      dataForm: {},
      columns: []
    };
  },
  created() {
    this.columns = this.$route.query.column;
    this.dataForm = this.$route.query.data;
  },
  methods: {
    submit() {
      // this.$emit("sub", this.dataForm);
      // console.log(this.dataForm)
      this.$router.go(-1);
    }
  },
  components: {
    tmap,
    inputList
  }
};
</script>

<style>
.submit {
  border: none;
  border-radius: 10px;
  background-color: #55babb;
  color: #fff;
  padding: 10px 40px;
  margin-top: 10px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
</style>
