<template>
  <div>
    <van-field v-for="(item, index) in columns" :key="index" :label="item.label" :placeholder="data[item.prop]" v-model="data[item.prop]"></van-field>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array
    },
    data: {
      type: Object
    }
  }
};
</script>

<style></style>
