<script lang="ts" setup>
import HiCounter from '@/components/HiCounter.vue'
import { useQuery } from '@/composables/useQuery'

const { value: name } = useQuery('name')
</script>

<template>
  <div>{{ name }}</div>
  <HiCounter />
</template>
