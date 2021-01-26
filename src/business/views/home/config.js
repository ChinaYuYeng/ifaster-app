const mixin = {
  methods: {
    routeTo(path) {
      this.$router.push({ path });
    }
  }
};

export default function() {
  return {
    mixin
  };
}
