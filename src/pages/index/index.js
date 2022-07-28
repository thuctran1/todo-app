import utils from "../../utils/index";

Page({
  data: {
    listTodos: [],
    currentTask: "",
  },

  onSaveData() {
    utils
      .setStorage("listTodos", this.data.listTodos)
      .then((res) => {})
      .catch((err) => console.log("Err", err));
  },

  onReadData() {
    utils
      .getStorage("listTodos")
      .then((data) => {
        if (data) {
          this.setData({
            listTodos: data,
          });
        }
      })
      .catch((err) => console.log("Err", err));
  },

  onTextTodoChange(e) {
    this.setData({
      currentTask: e.detail.value,
    });
  },

  addTodoHandle() {
    if (this.data.currentTask != "") {
      let uuid = utils.makeUuid();

      let newTask = {
        id: uuid,
        title: this.data.currentTask,
        isDone: false,
      };
      this.setData({
        currentTask: "",
        listTodos: [newTask, ...this.data.listTodos],
      });

      this.onSaveData();
    }
  },

  onUpdateTodoHandle(task) {
    this.setData({
      listTodos: this.data.listTodos.map((e) => {
        return e.id == task.id ? task : e;
      }),
    });
     this.onSaveData();
  },

  onDeleteTodoHandle(id) {
    this.setData({
      listTodos: this.data.listTodos.filter((e) => e.id != id),
    });
    this.onSaveData();
  },

  onClearData() {
    my.clearStorage({
      success: function () {
        my.alert({ content: 'Xoá dữ liệu thành công' });
      },
      fail: function (res) {
        my.alert({ content: res.errorMessage });
      }
    });
  },

  onLoad(query) {
    //this.onClearData()
  },
  onReady() {},
  onShow() {
    this.onReadData();
  },
  onHide() {},
  onUnload() {},
});
