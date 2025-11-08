<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import AnswersList from '@/components/AnswersList.vue'
import FormAnswer from '@/components/FormAnswer.vue'

const gameStore = useGameStore()
const { dayLang, correctedAnswer } = storeToRefs(gameStore)
</script>

<template>
  <main class="container mx-auto py-12 px-4 flex flex-col items-center justify-center min-h-screen">
    <header class="text-center max-w-md mb-8">
      <h1 class="text-4xl font-bold tracking-wider text-emerald-400">PROGWORD</h1>
      <p class="text-zinc-400">Adivinhe a linguagem de programação do dia!</p>
    </header>
    <FormAnswer />
    <div v-if="correctedAnswer" class="my-8 text-center">
      <p class="text-2xl text-emerald-400">Parabéns, você acertou!</p>
      <p class="text-zinc-400">
        A linguagem do dia é
        <strong class="font-bold first-letter:uppercase">{{ dayLang }}</strong
        >.
      </p>
    </div>
    <AnswersList />
  </main>
</template>
