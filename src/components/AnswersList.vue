<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import AnswerItem from './AnswerItem.vue'

const gameStore = useGameStore()
const { dayLang, answers } = storeToRefs(gameStore)
</script>

<template>
  <section class="max-w-2xl w-full">
    <transition-group name="list" tag="ul" class="flex flex-col gap-y-3">
      <AnswerItem v-for="ans in answers" :key="ans" :day-lang="dayLang" :answer="ans" />
    </transition-group>
  </section>
</template>
