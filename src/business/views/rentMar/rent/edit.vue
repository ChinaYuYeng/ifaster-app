<script>
import add from "./add";
export default {
  extends: add,
  methods: {
    submit() {
      return this.$refs.form.validate().then(() => {
        return this.$apis.savePoint(this.formData).then(() => {
          this.$router.back();
        });
      });
    }
  }
};
</script>
