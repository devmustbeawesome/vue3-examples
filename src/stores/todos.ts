import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export interface Todo {
  id: number
  text?: string
}

export const useTodosStore = defineStore('todos', {
  state: () => ({
    todo_list: useLocalStorage('todo_list', [] as Todo[])
  }),
  getters: {
    TodoList: (state) => state.todo_list
  },
  actions: {
    addTodo(item: Todo) {
      this.todo_list.push(item)
    },
    updateTodo(id: number, text: string) {
      this.todo_list[this.todo_list.findIndex((element) => element.id === id)].text = text
    },
    deleteTodo(id: number) {
      this.todo_list.splice(
        this.todo_list.findIndex((element) => element.id === id),
        1
      )
    }
  }
})
