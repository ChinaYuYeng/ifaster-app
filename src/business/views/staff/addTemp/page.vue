<template>
  <AppLayout>
    {{ name }}
    {{ result }}
    <Panel>
      <van-cell title="模板"></van-cell>
      <van-cell title="模板名称">
        <van-field v-model="name" placeholder="请输入模板名称" class="input__bar" />
      </van-cell>
    </Panel>
    <Panel>
      <van-cell title="权限"></van-cell>
      <van-collapse v-model="activeNames">
        <van-collapse-item v-for="(item, index) in perList" :key="index" :name="item.id">
          <div slot="title">
            <van-checkbox-group v-model="result">
              <van-checkbox checked-color="#55BABB" shape="square" icon-size="15px" :name="item.id">{{ item.name }}</van-checkbox>
            </van-checkbox-group>
          </div>
          <van-collapse-item v-for="(item1, index) in item.child" :key="index" :name="item1.id">
            <div slot="title">
              <van-checkbox-group v-model="result">
                <van-checkbox checked-color="#55BABB" shape="square" icon-size="15px" :name="item1.id">{{ item1.name }}</van-checkbox>
              </van-checkbox-group>
            </div>
            <van-cell v-for="(item2, index) in item1.child" :key="index">
              <van-checkbox-group v-model="result">
                <van-checkbox checked-color="#55BABB" shape="square" icon-size="15px" :name="item2.id">{{ item2.name }}</van-checkbox>
              </van-checkbox-group>
            </van-cell>
          </van-collapse-item>
        </van-collapse-item>
        <!-- <van-checkbox-group v-model="result" ref="checkboxGroup">
          <van-collapse-item v-for="(item, index) in perList" :key="index" :title="item.name" :name="item.id">
            <van-cell v-for="(item1, index) in item.child" :key="index">
              <van-checkbox checked-color="#55BABB" shape="square" icon-size="15px" :name="item1.id">{{ item1.name }}</van-checkbox>
            </van-cell>
          </van-collapse-item>
        </van-checkbox-group> -->
      </van-collapse>
    </Panel>
    <template #body-bottom>
      <SubmitBtn :onSubmit="confirm" text="确定"></SubmitBtn>
    </template>
  </AppLayout>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      activeNames: ["1"],
      result: [],
      perList: [
        // { name: "上下架权限", json: [{ pername: "主要权限-1" }, { pername: "主要权限-2" }, { pername: "主要权限-3" }] },
        // { name: "其他权限", json: [{ pername: "其他权限-1" }, { pername: "其他权限-2" }, { pername: "其他权限-3" }] }
      ]
    };
  },
  created() {
    this.getAuthList();
  },
  methods: {
    getAuthList() {
      this.$apis.authList().then(res => {
        this.perList = res.data;
      });
    },
    searchTree(List) {
      for (let i = 0; i < List.length; i++) {
        let child = List[i].child;
        if (this.result.indexOf(List[i].id) != -1) {
          if (List[i].parentId != 0 && this.result.indexOf(List[i].parentId) == -1) {
            // console.log(List[i].name);
            this.result.splice(
              this.result.findIndex(item => item == List[i].id),
              1
            );
          }
        }
        if (child != []) {
          this.searchTree(child);
        }
      }
    },
    confirm() {
      let dataForm = {};
      dataForm.name = this.name;
      dataForm.auths = this.result;
      this.$apis.templateAdd(dataForm).then(res => {
        console.log(res.data);
      });
      console.log(dataForm);
    }
    // getData() {
    //   let data = this.$route.query.data;
    //   this.name = data.name;
    //   for (let i = 0; i < data.json.length; i++) {
    //     this.result.push(data.json[i].pername);
    //   }...
    // }
  },
  watch: {
    result: {
      handler: function() {
        this.searchTree(this.perList);
      },
      deep: true,
      immediate: true
    }
  },
  components: {
    // perList
  }
};
</script>

<style></style>
