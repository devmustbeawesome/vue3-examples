<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFetch } from '@vueuse/core'
const urlVue = computed(
  () => `https://api.github.com/repos/vuejs/core/commits?per_page=3&sha=${currentBranch.value}`
)

const branches = ['main', 'v2-compat']
const currentBranch = ref(branches[0])
const {
  data: dataCommits,
  isFetching: isPendingCommits,
  error: errorCommits
  // execute: getCommits
} = useFetch(urlVue, { refetch: true }).get().json()
</script>

<template>
    <div class="container">
      <h1 class="page_title">Test</h1>
      <select v-model="currentBranch" class="choose_brach">
        <option :value="branch" v-for="branch in branches" :key="branch">
          {{ branch }}
        </option>
      </select>
      <p class="current_branch">Current branch: {{ currentBranch }}</p>
      <div v-if="isPendingCommits">Loading...</div>
      <div v-else-if="!errorCommits">
        <div
          v-for="{ html_url, sha, author, commit } in dataCommits"
          :key="sha"
          class="commit-item"
        >
          <p>
            <a :href="html_url" target="_blank">{{ sha.slice(0, 7) }}</a> -
            {{ commit.message.slice(0, commit.message.indexOf('\n')) }}
          </p>
          <p>
            by <a :href="author.html_url" target="_blank">{{ author.login }}</a> at
            {{ commit.author.date.replace(/T|Z/g, ' ') }}
          </p>
        </div>
      </div>
      <pre v-else>{{ errorCommits }}</pre>
    </div>
</template>

<style scoped>
.commit-item {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
}
.choose_brach {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  width: 200px;
  font-size: 18px;
  cursor: pointer;
}
.current_branch {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 600;
}
.page_title {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
