<script setup lang="ts">
import { useCount } from '@/composables/useCount'

const { count, inc, dec } = useCount()
</script>

<template>
  <div class="my-3 inline-flex">
    <div class="btn" @click="dec()">
      <span class="i-carbon-subtract" />
    </div>
    <div class="m-auto inline-block w-15 font-mono">
      {{ count }}
    </div>
    <div class="btn" @click="inc()">
      <span class="i-carbon-add" />
    </div>
  </div>
</template>

<style>
.btn {
  --at-apply: w-8 h-8 flex items-center justify-center rounded-full bg-teal-600 text-white cursor-pointer
}
</style>
