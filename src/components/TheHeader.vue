<script setup lang="ts">
import { computed, ref, type VNodeRef } from 'vue'

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

const navBlock = ref()
const maxWidth = ref(0)
// const shownLinks = computed(() => {
//   if (!maxWidth.value) {
//     // return links.value.filter((link) => link.name !== 'Main')
//     return links.value
//   } else {
//     return links.value
//   }
// })
const setLinkRef = (index: number, el: HTMLElement | null) => {
  console.log(index, el)
  // if (el) {
  //   links.value[0].ref = el
  // }
}
</script>

<template>
  <header>
    <div class="container header-container">
      <RouterLink to="/">
        <img alt="Logo" class="logo" src="@/assets/logo.svg" width="108.8" height="50" />
      </RouterLink>

      <ul class="header_nav-list" :ref="navBlock" role="navigation">
        <!-- <li
          v-for="(link, index) in links"
          :key="index"
          :ref="(el) => setLinkRef(index, el as HTMLElement)"
        > -->
        <li
          v-for="(link, index) in links"
          :key="index"
          :ref="(el) => (link.width = (el as HTMLElement).offsetWidth)"
          class="header_nav-item"
        >
          <RouterLink :to="link.href" :text="link.name"></RouterLink>
        </li>
        <li>
          <VDropDown>
            <template #trigger="{ on }">
              <button class="btn" v-on="on">test</button>
            </template>
            <template #content>
              <RouterLink
                v-for="(link, index) in links"
                :key="index"
                :to="link.href"
                :text="link.name"
              ></RouterLink>
            </template>
          </VDropDown>
        </li>
      </ul>
    </div>
  </header>
  {{ links }}
</template>
<style scoped>
header {
  padding: 10px 20px;
  border-bottom: #00bd7e solid 1px;
  align-items: center;
}
.header-container {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  flex-wrap: nowrap;
}

.logo {
  display: block;
  margin: 0 auto 1rem;
}
.header_nav-list {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  list-style: none;
  padding: 0;
  overflow: hidden;
}
.header_nav-item {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid #00bd7e;
  white-space: nowrap;
}

.header_nav-item a.router-link-exact-active {
  color: #00bd7e;
}

.header_nav-item a.router-link-exact-active:hover {
  background-color: transparent;
}

.header_nav-item a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
  }

  .logo {
    margin: 0 1rem 0 0;
  }

  .header_nav-list {
    text-align: left;
    font-size: 1.5rem;
  }
}
</style>
