<script setup lang="ts">
import PolyGrath from '@/components/PolyGrath.vue'
import { reactive, ref } from 'vue'

const stats = reactive([
  { label: 'A', value: 100 },
  { label: 'B', value: 100 },
  { label: 'C', value: 100 },
  { label: 'D', value: 100 },
  { label: 'E', value: 100 },
  { label: 'F', value: 100 }
])
const removeStat = (stat: { label: string; value: number }) => {
  stats.splice(stats.indexOf(stat), 1)
}
const newStat = ref('')
const addStat = () => {
  if (newStat.value === '') {
    return
  }
  stats.push({ label: newStat.value, value: 100 })
  newStat.value = ''
}
</script>

<template>
  <div class="container">
    <h1 class="page_title">Setting characteristics</h1>
    <div class="stat_settings-content">
      <PolyGrath :stats="stats" />

      <div class="stat_settings-group">
        <div v-for="stat in stats" :key="stat.label" class="stat_group">
          <label :for="'stat-input-' + stat.label" class="stat_label-name">{{ stat.label }}</label>
          <input
            type="range"
            v-model="stat.value"
            min="0"
            max="100"
            :id="'stat-input-' + stat.label"
            class="stat_input"
          />
          <label :for="'stat-input-' + stat.label" class="stat_label-value">{{ stat.value }}</label>
          <VButton class="btn btn-remove" @click="removeStat(stat)">✕</VButton>
        </div>
      </div>
      <form class="add_stat-form" @submit.prevent="addStat">
        <VInput
          type="text"
          :maxlength="10"
          v-model="newStat"
          class="form_input"
          :placeholder="'name of new stat'"
        />
        <VButton class="btngit" @click="addStat">add</VButton>
      </form>
    </div>
  </div>
</template>

<style scoped>
.page_title {
  margin-top: 20px;
  margin-bottom: 20px;
}
.stat_settings-content {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-between;
  align-items: flex-start;
}
.stat_settings-group {
  display: table;
  border-collapse: separate;
  border-spacing: 10px 10px;
}
.stat_group {
  display: table-row;
}
.stat_group > * {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.add_stat-form {
  margin-top: 20px;
  margin-bottom: 20px;
}
.form_input {
  width: auto !important;
  margin-right: 10px !important;
}
.btn-remove {
  border: none !important;
}
</style>
