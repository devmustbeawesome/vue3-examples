<script setup lang="ts">
import VisualizedTimer from '@/components/VisualizedTimer.vue'
import { ref } from 'vue'

const modalShowed = ref(false)
const showModal = () => {
  modalShowed.value = true
}
</script>

<template>
  <div class="container">
    <h1 class="page_title">Test</h1>
    <VButton @click="showModal">Show modal</VButton>
    <VModal :show="modalShowed" @update:show="modalShowed = $event" :can-close="true">
      <template #header>
        <h2>#header</h2>
      </template>
      <template #body>
        <div>
          <VisualizedTimer />
        </div>
      </template>
      <template #footer>
        <div class="form_footer">
          <VButton @click="modalShowed = false" class="form_confirm-btn">Confirm</VButton>
          <VButton @click="modalShowed = false" class="form_cancel-btn">Close</VButton>
        </div>
      </template>
    </VModal>
  </div>
</template>

<style scoped>
.page_title {
  margin-top: 20px;
  margin-bottom: 20px;
}
.form_footer {
  display: flex;
  justify-content: flex-end;
}
.form_confirm-btn {
  background: green;
  color: white;
  border: none;
  margin-right: 10px;
}
.form_cancel-btn {
  background: red;
  color: white;
  border: none;
  margin-left: 10px;
}
</style>
