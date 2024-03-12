<script lang="ts">
import { computed, watch } from 'vue'

export default {
  name: 'VModal'
}
</script>
<script setup lang="ts">
const props = defineProps({
  show: { type: Boolean, required: true, default: false },
  canClose: { type: Boolean, required: true, default: true }
})
const emits = defineEmits(['update:show'])
const show = computed({
  get: () => props.show,
  set: (value) => emits('update:show', value)
})
watch(show, function (value) {
  typeof window !== 'undefined' && value
    ? document.addEventListener('keyup', escapeHandler)
    : document.removeEventListener('keyup', escapeHandler)
})
const escapeHandler = ({ key }: KeyboardEvent) => {
  if (show.value && (key === 'Escape' || key === 'Esc')) show.value = false
}
</script>

<template>
  <Transition name="modal">
    <div class="modal_background" v-if="show" @click.self="show = false">
      <div class="modal_container">
        <div class="modal_header">
          <slot name="header">default header</slot>
          <button v-if="props.canClose" @click="show = false" class="modal_close-btn">✕</button>
        </div>
        <div class="modal_body">
          <slot name="body">default body</slot>
        </div>
        <div class="modal_footer">
          <slot name="footer">default footer</slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal_background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  transition: opacity 0.3s ease;
}
.modal_container {
  min-width: 500px;
  min-height: 500px;
  background: white;
  padding: 10px 15px;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}
.modal_header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid black;
  align-items: center;
}
.modal_body {
  flex: 1;
}
.modal_footer {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid black;
  align-items: center;
}
.modal_close-btn {
  border: none;
  background: none;
  font-size: 18px;
  cursor: pointer;
}
.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal_container,
.modal-leave-to .modal_container {
  -webkit-transform: translate(42px, 18px);
  transform: translate(42px, 18px);
}

@media only screen and (max-width: 600px) {
  .modal {
    font-size: 14px;
    padding: 8px 13px;
    border-radius: 4px;
  }
}
</style>
