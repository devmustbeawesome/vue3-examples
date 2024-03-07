<script setup lang="ts">
import { ref } from 'vue'

const links = ref([
  { href: '/', name: 'Main' },
  { href: '/todos', name: 'Todo' },
  { href: '/test', name: 'Test' },
  { href: '/fetch-commits', name: 'Fetch commits' }
])
</script>

<template>
  <footer>
    <div class="container">
      <RouterLink to="/">
        <img alt="Logo" class="logo" src="@/assets/logo.svg" width="108.8" height="50" />
      </RouterLink>

      <div class="footer_nav-wrapper">
        <nav>
          <RouterLink
            v-for="(link, index) in links"
            :key="index"
            :to="link.href"
            :text="link.name"
          ></RouterLink>
        </nav>
      </div>
    </div>
  </footer>
</template>
<style>
footer {
  padding: 10px 20px;
  border-top: #00bd7e solid 1px;
  align-items: center;
}

.logo {
  display: block;
  margin: 0 auto 1rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: #00bd7e;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid #00bd7e;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  footer {
    display: flex;
    place-items: center;
  }

  .logo {
    margin: 0 1rem 0 0;
  }

  footer .container {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    align-items: center;
  }

  nav {
    text-align: left;
    font-size: 2rem;
  }
}
</style>
