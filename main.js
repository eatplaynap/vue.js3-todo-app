const app = Vue.createApp({
  data() {
    return {
      newTask: undefined,
      editIndex: null,
      tasks: [],
      nextId: 0
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
  },
  methods: {
    setTask() {
      if(this.editIndex === null) {
        this.tasks.push({
          id: this.nextId++,
          title: this.newTask})
      } else {
        this.tasks.splice(this.editIndex, 1, this.newTask)
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
      this.newTask = this.tasks[index]
      this.$refs.editor.focus()
    }
  },
  computed: {
    changeButtonText() {
      return this.editIndex === null ? "追加" : "編集";
    }
  }
})

app.mount('#todo-list-app')
