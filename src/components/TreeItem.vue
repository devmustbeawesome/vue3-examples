<script lang="ts" setup>
import { computed, ref } from 'vue'

type TTreeData = { name: string; children?: TTreeData[] }
const props = defineProps({
  treeData: {
    type: Object as () => TTreeData,
    required: true,
    default: () => ({ name: '', children: [] })
  }
})
const treeData = ref(props.treeData)
const isOpened = ref(false)
const isParent = computed(() => (props.treeData.children ? true : false))
const addItem = () => {
  treeData.value.children
    ? treeData.value.children.push({ name: 'new item' })
    : (treeData.value.children = [{ name: 'new item' }])
  isOpened.value = true
}
</script>
<template>
  <li class="tree_item">
    <div>
      <span class="tree_item_title" @dblclick.prevent.stop="addItem">{{ treeData.name }} </span>
      <VButton v-if="isParent" class="btn" @click="isOpened = !isOpened">{{
        isOpened ? '-' : '+'
      }}</VButton>
    </div>
    <ul v-show="isOpened">
      <TreeItem v-for="child in treeData.children" :key="child.name" :treeData="child" />
      <li class="tree_item">
        <VButton @click="addItem" class="btn">+</VButton>
      </li>
    </ul>
  </li>
</template>
<style>
.tree_item {
  margin-left: 20px;
  font-size: 18px;
}
.tree_item .btn {
  padding: 0 5px;
  margin-left: 3px;
}
.tree_item_title {
  cursor: pointer;
  user-select: none; /* standard syntax */
  -webkit-user-select: none; /* webkit (safari, chrome) browsers */
  -moz-user-select: none; /* mozilla browsers */
  -khtml-user-select: none; /* webkit (konqueror) browsers */
  -ms-user-select: none; /* IE10+ */
}
</style>
