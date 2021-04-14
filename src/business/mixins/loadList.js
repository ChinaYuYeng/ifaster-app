export default {
  data() {
    return {
      loadStatus: {
        loadList: () => [],
        loading: false,
        finished: true,
        finishedText: "数据准备中..."
      },
      paging: {},
      dataList: [],
      total: ""
    };
  },
  methods: {
    _loadList(loader) {
      return loader(this.paging)
        .then(res => {
          this.dataList = this.dataList.concat(res.data.rows || []);
          this.total = res.data.total;
          return res;
        })
        .then(res => {
          if (this.paging.pageIndex * this.paging.pageSize < res.data.total) {
            this.paging.pageIndex++;
            this.loadStatus.finished = false;
          } else {
            this.loadStatus.finished = true;
            this.loadStatus.finishedText = "没有更多了";
          }
        })
        .catch(err => {
          this.loadStatus.finished = true;
          console.log(err);
        })
        .finally(() => {
          this.loadStatus.loading = false;
        });
    },
    setListLoader(loader) {
      const loadList = loader ? (this.loadList = this._loadList.bind(this, loader)) : this.loadList;
      this.dataList = [];
      this.paging = {
        pageIndex: 1,
        pageSize: 10
      };
      this.loadStatus = {
        finished: false,
        loading: true,
        finishedText: "",
        loadList: loadList
      };
      return loadList();
    }
  }
};
