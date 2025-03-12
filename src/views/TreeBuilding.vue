<script setup lang="ts">
import TreeItem from '@/components/TreeItem.vue'
import type Tree from '@/types/tree'
import { useStorage } from '@vueuse/core'

const treeData = useStorage('treeData', { id: 1, name: 'Root', children: [], opened: true } as Tree)
</script>

<template>
  <div class="container">
    <h1 class="page_title">Tree Building</h1>
    <ul>
      <TreeItem
        v-model="treeData"
        @remove:item="console.log('removed')"
        @update:item="console.log('updated')"
        :is-root="true"
      />
    </ul>
  </div>
</template>

<style scoped>
.page_title {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
