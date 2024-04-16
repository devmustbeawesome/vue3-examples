<script setup lang="ts">
import { ref } from 'vue'
import MenuWithMoreButton from './MenuWithMoreButton.vue'

const links = ref<Array<{ href: string; name: string; width?: number }>>([
  { href: '/', name: 'Main' },
  { href: '/todos', name: 'Todo' },
  { href: '/fetch-commits', name: 'Fetch commits' },
  { href: '/grid-example', name: 'Grid Example' },
  { href: '/tree', name: 'Tree' },
  { href: '/setting-characteristics', name: 'Setting Characteristics' },
  { href: '/modal-timer', name: 'Modal and Timer' },
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
  <header>
    <div class="container header-container">
      <RouterLink to="/">
        <img alt="Logo" class="logo" src="@/assets/logo.svg" width="108.8" height="50" />
      </RouterLink>
      <MenuWithMoreButton :links="links" />
    </div>
  </header>
</template>
<style scoped>
header {
  padding: 10px 20px;
  border-bottom: #00bd7e solid 1px;
  align-items: center;
}
.header-container {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
}

.logo {
  display: block;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  .logo {
    margin: 0 1rem 0 0;
  }
}
</style>
