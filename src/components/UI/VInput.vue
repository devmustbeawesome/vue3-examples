<script lang="ts">
export default {
  name: 'VInput'
}
</script>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps({
  classList: { type: Array, required: false, default: () => [] },
  modelValue: { type: String, required: true, default: '' },
  type: { type: String, required: false, default: 'text' },
  maxlength: { type: Number, required: false, default: 500 }
})
const emit = defineEmits(['update:modelValue'])
const newValue = ref(props.modelValue)
const newType = ref(props.type)
const computedValue = computed({
  get: function () {
    return newValue.value
  },
  set: function (value) {
    newValue.value = value
    emit('update:modelValue', value)
  }
})

watch(
  () => props.modelValue,
  function (value) {
    newValue.value = value
  }
)
watch(
  () => props.type,
  function (type) {
    newType.value = type
  }
)
function onInput(event: Event) {
  let target = event.target as HTMLInputElement
  updateValue(target.value)
}
function onChange(event: Event) {
  let target = event.target as HTMLInputElement
  updateValue(target.value)
}
function updateValue(value: string) {
  computedValue.value = value
}
</script>

<template>
  <input
    v-if="type !== 'textarea'"
    ref="input"
    :type="newType"
    :maxlength="maxlength"
    :value="computedValue"
    class="form_input"
    :class="classList"
    @input="onInput"
    @change="onChange"
  />
  <textarea
    v-else
    ref="textarea"
    :maxlength="maxlength"
    :value="computedValue"
    class="form_input"
    :class="classList"
    @input="onInput"
    @change="onChange"
  />
</template>

<style scoped>
.form_input {
  width: 100%;
  background: none;
  padding: 10px 15px;
  border: 1px solid black;
  font-size: 18px;
  border-radius: 5px;
}

@media only screen and (max-width: 600px) {
  .form_input {
    font-size: 14px;
    padding: 8px 13px;
    border-radius: 4px;
  }
}
</style>
