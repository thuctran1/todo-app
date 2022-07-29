import utils from "../../utils/index";

Page({
  data: {
    listTodos: [],
    currentTask: "",
  },

  onSaveData() {
    try {
      utils.setStorage("listTodos", this.data.listTodos);
    } catch (e) {
      console.log("Err", err);
    }
  },

  async onReadData() {
    try {
      let data = await utils.getStorage("listTodos");
      this.setData({
        listTodos: data,
      });
    } catch (err) {
      console.log(err);
    }
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

  onLoad(query) {},
  onReady() {},
  onShow() {
    this.onReadData();
  },
  onHide() {},
  onUnload() {},
});
