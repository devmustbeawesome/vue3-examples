<script setup lang="ts">
import { ref } from 'vue'
import MenuWithMoreButton from './MenuWithMoreButton.vue'

const links = ref([
  { href: '/', name: 'Main' },
  { href: '/todos', name: 'Todo' },
  { href: '/fetch-commits', name: 'Fetch commits' },
  { href: '/grid-example', name: 'Grid Example' },
  { href: '/tree', name: 'Tree' },
  { href: '/setting-characteristics', name: 'Setting Characteristics' },
  { href: '/modal-timer', name: 'Modal and Timer' }
])
</script>

<template>
  <footer>
    <div class="container footer-container">
      <RouterLink to="/">
        <img alt="Logo" class="logo" src="@/assets/logo.svg" width="108.8" height="50" />
      </RouterLink>
      <MenuWithMoreButton :links="links" />
    </div>
  </footer>
</template>
<style scoped>
footer {
  padding: 10px 20px;
  border-top: #00bd7e solid 1px;
}

.logo {
  display: block;
  margin: 0 1rem 0 0;
}
footer .container {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
}
</style>
