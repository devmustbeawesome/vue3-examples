<script setup lang="ts">
import TodoAddingForm from '@/components/TodoAddingForm.vue'
import TodoList from '@/components/TodoList.vue'
</script>

<template>
  <div class="container">
    <h1 class="page_title">Todo</h1>
    <TodoAddingForm></TodoAddingForm>
    <TodoList></TodoList>
  </div>
</template>

<style scoped>
.page_title {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
