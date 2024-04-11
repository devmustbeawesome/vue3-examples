<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

let lastTime: number
let handle: number
const passedTime = ref(0)
const duration = ref(20 * 1000)
const reset = () => {
  lastTime = Date.now()
  update()
}
const update = () => {
  passedTime.value = Date.now() - lastTime
  if (passedTime.value >= duration.value) {
    cancelAnimationFrame(handle)
  } else {
    handle = requestAnimationFrame(update)
  }
}
onMounted(() => {
  reset()
})
onUnmounted(() => {
  cancelAnimationFrame(handle)
})
</script>

<template>
  <div class="container">
    <div class="timer_progess">
      <span>progress time: </span>
      <progress :value="passedTime" :max="duration"></progress>
      <span> {{ (passedTime / 1000).toFixed(1) }} </span>
    </div>
    <div class="timer_range">
      <span>range time: </span>
      <input type="range" min="1000" max="25000" v-model="duration" />
      <span> {{ (duration / 1000).toFixed(1) }} </span>
    </div>
    <VButton @click="reset">reset</VButton>
  </div>
</template>

<style scoped lang="postcss"></style>
