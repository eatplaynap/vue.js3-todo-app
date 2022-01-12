const app = Vue.createApp({
  data() {
    return {
      newTask: undefined,
      editIndex: null,
      tasks: [],
      nextId: undefined
    }
  },
  watch: {
    tasks: {
      handler(tasks) {
        localStorage.setItem('tasks', JSON.stringify(this.tasks))
      },
      deep: true
    }
  },
  mounted() {
    this.tasks = JSON.parse(localStorage.getItem('tasks')) || []
    this.nextId = this.tasks[this.tasks.length-1]?.id || 0
  },
  methods: {
    setTask() {
      if(!this.editIndex) {
        this.tasks.push({
          id: ++this.nextId,
          title: this.newTask
        })
      } else {
        this.tasks.splice(this.editIndex, 1, {
          id: this.tasks[this.editIndex].id,
          title: this.newTask
        })
      }
      this.cancel()
    },
    cancel() {
      this.newTask = undefined
      this.editIndex = null
    },
    deleteTask(index){
      this.tasks.splice(index, 1)
    },
    editTask(index){
      this.editIndex = index
      this.newTask = this.tasks[index].title
      this.$refs.editor.focus()
    }
  },
  computed: {
    changeButtonText() {
      return !this.editIndex ? "追加" : "編集";
    }
  }
})

app.mount('#todo-list-app')
