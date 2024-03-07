<script setup lang="ts">
import { useTodosStore } from '@/stores/todos'
import { reactive } from 'vue'

const formData = reactive({
  todo: ''
})
const TodosStore = useTodosStore()
const addTodo = () => {
  if (formData.todo) {
    TodosStore.addTodo({
      id: Date.now(),
      text: formData.todo
    })
    formData.todo = ''
  }
}
</script>
<template>
  <form @submit.prevent class="todo_adding-form">
    <h2>Add Todo</h2>
    <VInput type="text" placeholder="Todo" v-model="formData.todo" />
    <VButton @click="addTodo"> Добавить </VButton>
  </form>
</template>

<style scoped>
.todo_adding-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 400px;
  margin: 0 auto 30px;
  padding: 20px;
  border: 1px solid black;
  border-radius: 5px;
}
</style>
