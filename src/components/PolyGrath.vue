<script setup lang="ts">
import { computed } from 'vue'
const radius = 90
const center = {
  x: 150,
  y: 150
}
const props = defineProps({
  stats: {
    type: Array<{ label: string; value: number }>,
    required: true,
    default: () => [{ label: 'a', value: 100 }]
  }
})
const polygonPoints = computed(() => {
  const total = props.stats.length
  const points = props.stats.reduce((acc, stat, index) => {
    const coords = valueToCoords((stat.value / 100) * radius, index, total)
    acc.push(coords) // coords
    return acc
  }, [])
  return points
})
const letters = computed(() => {
  const total = props.stats.length
  const points = props.stats.reduce((acc, stat, index) => {
    const coords = valueToCoords((stat.value / 100) * radius + 20, index, total)
    acc[stat.label] = coords
    return acc
  }, {})
  return points
})
const valueToCoords = (value: number, index: number, total: number) => {
  const angle = ((Math.PI * 2) / total) * index
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  const tx = -value * sin + center.x
  const ty = value * cos + center.y
  return {
    x: tx,
    y: ty
  }
}
</script>
<template>
  <svg
    viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    enable-background="new 0 0 300 300"
    width="300"
    height="300"
  >
    <circle :cx="center.x" :cy="center.y" :r="radius" class="svg_main-circle"></circle>
    <circle :cx="center.x" :cy="center.y" :r="3" class="svg_center-circle"></circle>

    <polygon
      :points="polygonPoints.map(({ x, y }) => `${x},${y}`).join(' ')"
      class="svg_stats-polygon"
    ></polygon>
    <circle
      v-for="(coords, index) in polygonPoints"
      :key="index"
      :cx="coords.x"
      :cy="coords.y"
      :r="3"
      class="svg_stat-point"
    ></circle>
    <text
      v-for="(coords, label) in letters"
      :key="label"
      :x="coords.x"
      :y="coords.y"
      dominant-baseline="middle"
      text-anchor="middle"
    >
      {{ label }}
    </text>
  </svg>
</template>
<style scoped>
.svg_main-circle {
  fill: none;
  stroke: #00bd7e;
  stroke-width: 2;
}
.svg_center-circle {
  fill: #00bd7e;
}
.svg_stats-polygon {
  fill: #00bd7e50;
  stroke: #0061bd;
  stroke-width: 2;
}
.svg_stat-point {
  fill: #0061bd;
}
</style>
