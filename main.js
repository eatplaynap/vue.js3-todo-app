const taskStorage = {
  fetch() {
    const tasks = JSON.parse(localStorage.getItem('task') || '[]' )
    tasks.forEach((task, index) => {
      task.id = index
    })
    taskStorage.uid = tasks.length
    return tasks
  },
  save(tasks) {
    localStorage.setItem('task', JSON.stringify(tasks))
  }
}

const app = Vue.createApp({
  data() {
    return {
      newTask: '',
      tasks: taskStorage.fetch()
    }
  },
  watch: {
    tasks: {
      handler(tasks) {
        taskStorage.save(tasks)
      },
      deep: true
    }
  },
  methods: {
    addTask() {
      this.tasks.push(this.newTask)
      this.newTask = ''
    },
    deleteTask(index){
      this.tasks.splice(index, 1)
    }
  }
})

app.mount('#todo-list-app')
