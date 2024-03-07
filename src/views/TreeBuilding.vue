<script setup lang="ts">
import TreeItem from '@/components/TreeItem.vue'
import { ref } from 'vue'

const treeData = ref({
  name: 'My Tree',
  children: [
    { name: 'hello' },
    { name: 'world' },
    {
      name: 'child folder',
      children: [
        {
          name: 'child folder',
          children: [{ name: 'hello' }, { name: 'world' }]
        },
        { name: 'hello' },
        { name: 'world' },
        {
          name: 'child folder',
          children: [{ name: 'hello' }, { name: 'world' }]
        }
      ]
    }
  ]
})
</script>

<template>
  <div class="container">
    <h1 class="page_title">Tree Building</h1>
    <ul>
      <TreeItem :treeData="treeData" />
    </ul>
  </div>
</template>

<style scoped>
.page_title {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
