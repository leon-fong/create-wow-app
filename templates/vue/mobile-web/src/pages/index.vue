<script setup lang="ts">

definePage({
  name: 'main',
  meta: {
    level: 1,
  },
})

const menuItems = [
  { title: 'Mock', route: 'mock' },
  { title: 'Pinia', route: 'counter' },
  { title: '404', route: 'unknown' },
]
</script>

<template>
  <VanCellGroup inset>
    <template v-for="item in menuItems" :key="item.route">
      <VanCell :title="item.title" :to="item.route" is-link />
    </template>
  </VanCellGroup>
</template>

<route lang="yaml">
  meta:
    layout: home
</route>
