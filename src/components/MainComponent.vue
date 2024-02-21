<script setup lang="ts">

</script>

<template>
  <div class="container">
    <h1>Main</h1>
    <CustomButton>test</CustomButton>
    <CustomInput v-focus></CustomInput>
    <div style="height: 100px;" v-for="i in 10" :key="i">test</div>
    <div v-intersection="() => console.log('test')"></div>
  </div>
</template>

<style scoped></style>
