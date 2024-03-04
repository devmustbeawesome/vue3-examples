<script setup lang="ts">
import { useTodosStore } from '@/stores/todos'
import { computed } from 'vue'

const TodosStore = useTodosStore()
const todoList = computed(() => TodosStore.TodoList)
</script>
<template>
  <TransitionGroup v-show="todoList.length" name="list" tag="ul" class="todo_list">
    <div class="todo-item" v-for="todo in todoList" :key="todo.id">
      <VInput v-model="todo.text" @update:modelValue="TodosStore.updateTodo(todo.id, $event)" />
      <VButton @click="TodosStore.deleteTodo(todo.id)">Delete</VButton>
    </div>
  </TransitionGroup>
  <p v-show="!todoList.length">Todo list is empty</p>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.todo-item {
  display: grid;
  grid-template-columns: 1fr 100px;
  gap: 10px;
  border-bottom: 1px solid black;
  padding: 5px 0;
}
.todo-item:last-child {
  border-bottom: 0;
}
</style>
