<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')
const gridColumns = ['name', 'power']
const gridData = [
  { name: 'Chuck Norris', power: Infinity },
  { name: 'Bruce Lee', power: 9000 },
  { name: 'Jackie Chan', power: 7000 },
  { name: 'Jet Li', power: 8000 }
]
</script>
<template>
  <div class="container">
    <h1 class="page_title">Grid example</h1>
    <div class="input-wrapper">
      <VInput v-model="searchQuery" />
    </div>
    <VGrid :data="gridData" :columns="gridColumns" :search="searchQuery" />
  </div>
</template>
<style scoped>
.input-wrapper {
  max-width: 500px;
  margin-bottom: 20px;
}
.page_title {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
