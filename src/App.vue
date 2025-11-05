<script setup lang="ts">
import { langs } from '@/lib/utils/langs'
import { ref } from 'vue'
const currDay = new Date()
const startDay = new Date(2025, 9, 27, 0, 0, 0, 0)
const dayDiff = Math.floor((currDay.getTime() - startDay.getTime()) / (1000 * 60 * 60 * 24))
const dayLang = langs[dayDiff % langs.length]

const answers = ref<string[]>([])
const answer = ref<string>('')
const correctedAnswer = ref<boolean>(false)

function submitAnswer() {
  if (!answer.value) return
  answers.value.unshift(answer.value)
  if (answer.value === dayLang) {
    correctedAnswer.value = true
  } else {
    answer.value = ''
  }
}
</script>
<template>
  <main class="container mx-auto">
    <form @submit.prevent="submitAnswer">
      <input
        type="text"
        :disabled="correctedAnswer"
        v-model="answer"
        placeholder="Digite uma linguagem..."
        class="border p-2 w-full"
      />
    </form>
    <section>
      <ul>
        <li
          v-for="(answer, index) in answers"
          :key="answer + index"
          :class="answer === dayLang ? 'text-green-500' : 'text-red-500'"
        >
          <p>{{ answer }}</p>
        </li>
      </ul>
    </section>
  </main>
</template>
