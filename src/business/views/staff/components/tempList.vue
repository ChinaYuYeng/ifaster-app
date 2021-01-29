<template>
  <div>
    <Panel v-for="(item, index) in tempList" :key="index">
      <v-cell></v-cell>
    </Panel>
  </div>
</template>

<script>
export default {
  props: {
    tempList: Array
  }
};
</script>

<style></style>
