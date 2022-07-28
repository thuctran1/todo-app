import utils from "../../../../utils/index";

Component({
  props: {
    item: {},
    onDeleteTodoHandle: () => {},
    onUpdateTodoHandle: () => {},
  },

  data: {
    isEditing: false,
    currentTask: "",
  },

  didMount() {
    this.setData({
      currentTask: this.props.item.title,
    });
  },

  methods: {
    onHandleTapDelete() {
      utils
        .getConfirm(
          "Confirm delete",
          "Are you sure you want to delete this task?"
        )
        .then((res) => {
          if (res) {
            this.props.onDeleteTodoHandle(this.props.item.id);
          }
        })
        .catch();
    },

    onHandleTapCancelEdit() {
      this.setData({
        isEditing: !this.data.isEditing,
        currentTask: this.props.item.title,
      });
    },

    onHandleTapEdit() {
      if (this.data.isEditing) {
        if (this.data.currentTask == "") {
          this.onHandleTapDelete();
        } else {
          let newTask = {
            id: this.props.item.id,
            title: this.data.currentTask,
            isDone: this.props.item.isDone,
          };
          this.props.onUpdateTodoHandle(newTask);
        }
      }

      this.setData({
        isEditing: !this.data.isEditing,
      });
    },

    onTextTodoChange(e) {
      this.setData({
        currentTask: e.detail.value,
      });
    },

    onHandleTapDone() {
      let newTask = {
        id: this.props.item.id,
        title: this.props.item.title,
        isDone: !this.props.item.isDone,
      };
      this.props.onUpdateTodoHandle(newTask);
    },
  },
});
