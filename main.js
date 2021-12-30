const app = Vue.createApp({
  data() {
    return {
      tasks: [
        { id: 1, text: '餃子作る' }
      ]
    }
  }
})

app.mount('#todo-list-app')
