import {setStorage, getStorage, makeUuid} from "../../utils/index";
import {TODO_STORAGE_KEY} from '../../constants'
import {
  useSelector,
  useDispatch,
} from '@tiki.vn/redux-miniprogram-bindings';

import {getTodosThunk} from '../../store/slices/thunk'

const dispatch = useDispatch()
Page({
  data: {
    listTodos: [],
    currentTask: "",
  },

  onSaveData() {
    try {
      setStorage(TODO_STORAGE_KEY, this.data.listTodos);
    } catch (e) {
      console.log("Err", err);
    }
  },

  async onReadData() {
    try {
      dispatch(getTodosThunk())
      let data = await getStorage(TODO_STORAGE_KEY);
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
      let uuid = makeUuid();

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
