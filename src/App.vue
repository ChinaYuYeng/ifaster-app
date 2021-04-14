<script>
export default {
  data() {
    return {
      currentModule: "default_root"
    };
  },
  render() {
    const _ = (
      <div id="app">
        <transition name="fade-scale" mode="out-in">
          <keep-alive max="4" exclude="login">
            <testB
              on={{
                "update:currentModule": val => {
                  this.currentModule = val;
                }
              }}
              key={this.currentModule}
            />
          </keep-alive>
        </transition>
      </div>
    );
    return _;
  },
  components: {
    // 解决keep-alive组件内存溢出问题
    testB: {
      activated() {
        this.isActived = true;
      },
      deactivated() {
        this.isActived = false;
      },
      render() {
        return <router-view />;
      },
      watch: {
        $route(val, old) {
          if (!this.isActived) return;
          let m1 = val.fullPath.split("/").filter(v => v)[0];
          let m2 = old.fullPath.split("/").filter(v => v)[0];
          if (m1 !== m2) {
            this.$emit("update:currentModule", m1);
          }
        }
      }
    }
  }
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ccc;
  font-size: 12px;
  overflow: hidden;
}
.fade-scale-leave-active,
.fade-scale-enter-active {
  transition: all 0.3s;
}
.fade-scale-enter {
  opacity: 0;
  transform: translateX(20px);
}
.fade-scale-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
