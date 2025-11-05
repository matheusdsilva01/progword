<script setup lang="ts">
import { langs } from '@/lib/utils/langs'
import { ref } from 'vue'
const currDay = new Date()
const startDay = new Date(2025, 9, 27, 0, 0, 0, 0)
const dayDiff = Math.floor((currDay.getTime() - startDay.getTime()) / (1000 * 60 * 60 * 24))

const solution = ref(langs[dayDiff % langs.length])
</script>
<template>
  <main class="container mx-auto">
    <h1>Hello World {{ solution }}</h1>
  </main>
</template>
