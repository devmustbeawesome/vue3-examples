<script lang="ts">
export default {
  name: 'VDropDown'
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'

const isShown = ref(false)

const hide = function () {
  updateValue(false)
}
const show = function () {
  updateValue(true)
}
const updateValue = function (value: boolean) {
  isShown.value = value
}
defineExpose({
  show,
  hide
})

const isHovered = ref(false)
</script>

<template>
  <div class="dropdown-wrapper" v-click-outside="hide" @mouseleave="isHovered = false">
    <slot
      name="trigger"
      v-bind="{
        on: {
          click: (e: Event) => {
            e.preventDefault()
            isShown = !isShown
          },
          mouseover: () => (isHovered = true)
        }
      }"
    >
      dropdown-trigger
    </slot>

    <div class="dropdown-dialog" v-show="isShown || isHovered">
      <slot name="content"> dropdown-content </slot>
    </div>
  </div>
</template>

<style scoped>
.dropdown-wrapper {
  position: relative;
}
.dropdown-button {
  background: none;
  padding: 10px 15px;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  text-align: center;
}

.dropdown-dialog {
  position: absolute;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  background: var(--color-background-soft);
  padding: 5px;
  z-index: 2;
  list-style-type: none;
  display: flex;
  flex-direction: column;
}

@media only screen and (max-width: 600px) {
  .dropdown-button {
    font-size: 14px;
    padding: 8px 13px;
    border-radius: 4px;
  }
}
</style>
