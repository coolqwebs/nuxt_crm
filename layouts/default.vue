<script lang="ts" setup>
console.log('fnjdlsafjdsalk')
</script>

<template>
  <section class="grid" style="min-height: 100svh;">
    <layout-sidebar />
    <div>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 6fr;
}
</style>