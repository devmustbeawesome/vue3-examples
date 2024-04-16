<script setup lang="ts">
import { watch, ref, onBeforeMount, onMounted, computed, nextTick } from 'vue'

const props = defineProps({
  links: {
    type: Array<{ href: string; name: string }>,
    required: true
  }
})

const element = ref<HTMLElement>()

const menuItems = ref<Array<{ href: string; name: string }>>([])

watch(
  () => props.links,
  function (value) {
    menuItems.value = value
    moveItem()
  }
)

const moreMenuItems = ref<Array<{ href: string; name: string }>>([])

let firstRun = true
const moved = ref(false)

const getWidthIncludingMargin = (el: HTMLElement) => {
  return (
    el.offsetWidth +
    parseFloat(getComputedStyle(el).marginLeft) +
    parseFloat(getComputedStyle(el).marginRight)
  )
}
const currentMenuWidth = ref(0)
const previousMenuWidth = ref(0)

onBeforeMount(() => preRender())
const preRender = () => {
  menuItems.value = props.links
}

onMounted(() => {
  let observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      currentMenuWidth.value = entry.contentRect.width
      if (previousMenuWidth.value !== entry.contentRect.width || firstRun) {
        if (firstRun) {
          previousMenuWidth.value = entry.contentRect.width
        }
        // moveItem(entry.contentRect.width) ???
        moveItem()
        firstRun = false
      }
      previousMenuWidth.value = entry.contentRect.width
    })
  })

  if (!element.value) {
    return
  }
  observer.observe(element.value)
})
const totalWidthOfChildren = () => {
  if (menuItems.value.length === 0) {
    return 0
  }
  return !element.value || menuItems.value.length === 0
    ? 0
    : Array.from(element.value.children).reduce((total, child) => {
        return total + getWidthIncludingMargin(child as HTMLElement)
      }, 0)
}
const isOverflown = computed(() => {
  if (!currentMenuWidth.value) return false
  return currentMenuWidth.value < totalWidthOfChildren()
})

const moveItem = () => {
  if (isOverflown.value) {
    const lastElement = menuItems.value[menuItems.value.length - 1] || null
    moreMenuItems.value.unshift(lastElement)
    menuItems.value.pop()
    moved.value = false
    nextTick(() => {
      moveItem()
    })
  } else if (
    (currentMenuWidth.value > previousMenuWidth.value || firstRun || moved.value) &&
    moreMenuItems.value[0]
  ) {
    const firstElement = moreMenuItems.value[0]
    menuItems.value.push(firstElement)
    moreMenuItems.value.shift()
    moved.value = true
    nextTick(() => {
      moveItem()
    })
  }
}
</script>

<template>
  <ul class="nav_list" role="navigation" ref="element">
    <li v-for="(link, index) in menuItems" :key="index" class="nav_list-item">
      <RouterLink :to="link.href" :text="link.name"></RouterLink>
    </li>
    <li style="position: relative">
      <VDropDown v-if="moreMenuItems.length > 0">
        <template #trigger="{ on }">
          <button class="btn" v-on="on">{{ menuItems.length === 0 ? '☰' : 'More ↓' }}</button>
        </template>
        <template #content>
          <ul class="more_list">
            <li v-for="(link, index) in moreMenuItems" :key="index" class="more_list-item">
              <RouterLink :to="link.href" :text="link.name"></RouterLink>
            </li>
          </ul>
        </template>
      </VDropDown>
    </li>
  </ul>
</template>
<style scoped>
.nav_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  list-style: none;
  padding: 0;
  align-content: center;
  align-items: center;
}
.more_list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.nav_list-item,
.more_list-item {
  display: inline-block;
  padding: 0 1rem;
  white-space: nowrap;
  font-size: 1.3rem;
}
.more_list-item {
  border-bottom: 1px solid #00bd7e;
}
.nav_list-item {
  border-left: 1px solid #00bd7e;
}

.nav_list-item a,
.more_list-item a {
  text-decoration: none;
  color: var(--color-text);
}
.nav_list-item a:hover,
.more_list-item a:hover {
  text-decoration: underline;
}
.nav_list-item .router-link-exact-active,
.more_list-item .router-link-exact-active {
  color: #00bd7e;
  text-decoration: none;
}

.nav_list-item .router-link-exact-active:hover,
.more_list-item .router-link-exact-active:hover {
  background-color: transparent;
}

.nav_list-item a:first-of-type {
  border: 0;
}
.btn {
  white-space: nowrap;
}
@media screen and (max-width: 768px) {
  .nav_list-item,
  .more_list-item {
    font-size: 1.2rem;
  }
}
</style>
