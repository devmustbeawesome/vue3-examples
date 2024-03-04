<script lang="ts">
export default {
  name: 'VButton'
}
</script>

<script lang="ts" setup>
const { classList } = defineProps({
  classList: {
    type: Array,
    required: false,
    default: () => []
  }
})

const emit = defineEmits(['click'])
</script>

<template>
  <button class="btn" :class="classList" @click="emit('click')">
    <slot />
  </button>
</template>

<style>
.btn {
  background: none;
  padding: 10px 15px;
  border: 1px solid black;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
}

@media only screen and (max-width: 600px) {
  .btn {
    font-size: 14px;
    padding: 8px 13px;
    border-radius: 4px;
  }
}

.btn:hover {
  text-decoration: underline;
  transition: 1s;
}
</style>
