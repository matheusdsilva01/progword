<script setup lang="ts">
import { properties } from '@/lib/utils/langs'
import AnswerProperty from './AnswerProperty.vue'

const { answer, dayLang } = defineProps<{
  dayLang: string
  answer: string
}>()
const answerStats = properties[answer]
</script>

<template>
  <li class="flex items-stretch rounded-lg border gap-1 border-zinc-700 bg-zinc-800 *:flex-1">
    <div class="p-4 w-36 flex items-center justify-center">
      <p class="first-letter:uppercase">
        {{ answer }}
      </p>
    </div>
    <AnswerProperty
      v-for="(value, key) in answerStats"
      :day-lang="dayLang"
      :answer="answer"
      :statKey="key"
      :value="value"
      :key="answer.concat(value)"
    />
  </li>
</template>
