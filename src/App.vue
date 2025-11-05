<script setup lang="ts">
import { langs } from '@/lib/utils/langs'
import { computed, ref } from 'vue'
const currDay = new Date()
const startDay = new Date(2025, 9, 27, 0, 0, 0, 0)
const dayDiff = Math.floor((currDay.getTime() - startDay.getTime()) / (1000 * 60 * 60 * 24))
const dayLang = langs[dayDiff % langs.length]

const answers = ref<string[]>([])
const answer = ref<string>('')
const correctedAnswer = ref<boolean>(false)
const options = computed(() =>
  langs.filter(
    (l) => l.toLowerCase().startsWith(answer.value.toLowerCase()) && !answers.value.includes(l),
  ),
)

function submitAnswer() {
  if (!answer.value) return
  answers.value.unshift(answer.value)
  if (answer.value === dayLang) {
    correctedAnswer.value = true
  }
  answer.value = ''
}
</script>

<template>
  <main class="container mx-auto py-12">
    <section class="max-w-96 mx-auto">
      <h1>PROGWORD - Linguagem do dia</h1>
    </section>
    <form class="isolate relative" @submit.prevent="submitAnswer">
      <input
        type="text"
        :disabled="correctedAnswer"
        v-model="answer"
        placeholder="Digite uma linguagem..."
        class="border p-2 w-full"
      />
      <section v-show="answer.length" class="absolute bg-white top-full left-0 w-full z-10">
        <span v-if="options.length < 1"> Nenhuma linguagem encontrada. </span>
        <ul v-else>
          <li v-for="lang in options" :key="lang" class="hover:bg-gray-200 cursor-pointer">
            <button type="submit" class="p-2 w-full text-start" @click.capture="answer = lang">
              {{ lang }}
            </button>
          </li>
        </ul>
      </section>
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
