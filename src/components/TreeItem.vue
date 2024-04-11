<script lang="ts" setup>
import { computed, ref } from 'vue'
import type Tree from '@/types/tree'

const props = defineProps({
  modelValue: {
    type: Object as () => Tree,
    required: true,
    default: () => ({ name: '', children: [] })
  },
  isRoot: {
    type: Boolean,
    required: false,
    default: false
  }
})
const emits = defineEmits(['remove:item'])

const isOpened = computed({
  get: () => props.modelValue.opened ?? false,
  set: (val) => {
    treeData.value.opened = val
  }
})
const isEditing = ref(false)
const isParent = computed(() =>
  props.modelValue.children && props.modelValue.children.length ? true : false
)
const treeData = ref(props.modelValue)

const addItem = () => {
  const id = Date.now()
  const nameItem = 'new item ' + id
  treeData.value.children
    ? treeData.value.children.push({ id, name: nameItem })
    : (treeData.value.children = [{ id, name: nameItem }])
  isOpened.value = true
}
const removeItem = (id: number) => {
  const index = treeData.value.children?.findIndex((child) => child.id === id)
  if (index !== undefined && index > -1) {
    treeData.value.children?.splice(index, 1)
  }
}
</script>
<template>
  <li class="tree_item">
    <VButton v-if="isParent" class="btn" @click="isOpened = !isOpened">{{
      isOpened ? '︿' : '﹀'
    }}</VButton>
    <VInput
      v-focus
      v-if="isEditing"
      class="tree_item_title_input"
      v-model="treeData.name"
      @focusout="isEditing = false"
      @keyup.enter="isEditing = false"
    />
    <span v-else class="tree_item_title" @dblclick.prevent.stop="isEditing = true">{{
      treeData.name
    }}</span>
    <VButton @click="isEditing = true" class="btn btn-remove">✎</VButton>
    <VButton @click="addItem" class="btn btn-remove">+</VButton>
    <VButton v-if="!isRoot" @click="emits('remove:item', treeData.id)" class="btn btn-remove"
      >✕</VButton
    >
    <ul v-show="isOpened" v-if="treeData.children" class="children_list">
      <TreeItem
        v-for="(child, index) in treeData.children"
        :key="child.id"
        v-model="treeData.children[index]"
        @remove:item="removeItem"
        :is-root="false"
      />
    </ul>
  </li>
</template>
<style>
.tree_item {
  margin: 20px;
  font-size: 18px;
  border-left: 1px solid black;
  padding: 10px;
  margin-bottom: 10px;
  list-style-type: none;
}
.tree_item .btn {
  padding: 5px;
  margin-right: 3px;
}
.tree_item .btn-remove {
  padding: 0 5px;
  margin-left: 3px;
}
.tree_item_title {
  padding: 0 15px;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -ms-user-select: none;
}
.tree_item_title_input {
  padding: 0 15px !important;
  outline: none !important;
  border: none !important;
  border-bottom: 1px solid black !important;
  width: auto !important;
}
</style>
