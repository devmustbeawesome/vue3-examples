<script lang="ts">
export default {
    name: "custom-button"
}
</script>
<template>
    <button class="btn">
        <slot />
    </button>
</template>
<style>
.btn {
    background: none;
    padding: 10px 15px;
    border: 1px solid black;
    font-size: 18px;
    border-radius: 5px;
}
</style>