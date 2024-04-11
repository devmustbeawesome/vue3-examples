<script lang="ts">
import { computed, ref, type ComputedRef } from 'vue'
export default {
  name: 'VGrid'
}
</script>
<script setup lang="ts">
const props = defineProps({
  data: {
    type: Array<object>,
    required: true,
    default: () => []
  },
  columns: {
    type: Array<string>,
    required: true,
    default: () => []
  },
  search: {
    type: String,
    required: false,
    default: ''
  }
})
const sortValue = ref({ name: props.columns[0], direction: 1 })
const filteredData: ComputedRef<Map<number, object>> = computed(() => {
  return props.data
    .filter((row: { [key: string]: any }) =>
      Object.keys(row).some((key) => {
        return String(row[key]).toLowerCase().includes(props.search)
      })
    )
    .sort((a: any, b: any) => {
      return a[sortValue.value.name] < b[sortValue.value.name]
        ? sortValue.value.direction * 1
        : sortValue.value.direction * -1
    })
    .reduce((newData: Map<number, object>, el, index) => {
      newData.set(index, el)
      return newData
    }, new Map<number, object>())
})
</script>
<template>
  <div>
    <table>
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column"
            @click="
              () => {
                sortValue.name != column
                  ? (sortValue = { name: column, direction: 1 })
                  : (sortValue.direction = sortValue.direction * -1)
              }
            "
          >
            <span
              v-if="sortValue.name == column"
              class="arrow"
              :class="sortValue.direction > 0 ? 'asc' : 'dsc'"
            >
            </span>
            {{ column }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="[key, row] in filteredData" :key="key">
          <td v-for="data in row" :key="data">
            {{ data }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}
</style>
