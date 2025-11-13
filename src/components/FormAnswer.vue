<script setup lang="ts">
import { langs } from '@/lib/utils/langs'
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref, useTemplateRef } from 'vue'

const gameStore = useGameStore()
const { correctedAnswer } = storeToRefs(gameStore)
const answer = ref<string>('')
const focusedElement = ref<number | null>(null)
const answerInputRef = useTemplateRef<HTMLElement>('answer-input')
const options = computed(() =>
  langs.filter(
    (l) => l.toLowerCase().startsWith(answer.value.toLowerCase()) && !gameStore.answers.includes(l),
  ),
)
onMounted(() => {
  answerInputRef.value?.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
      if (focusedElement.value !== null && options.value.length > 0) {
        submitAnswer(options.value[focusedElement.value]! ?? options.value[0])
      }
    }

    if (e.code === 'ArrowDown') {
      if (focusedElement.value === null) {
        focusedElement.value = 0
      } else {
        if (focusedElement.value === options.value.length - 1) {
          focusedElement.value = 0
        } else {
          focusedElement.value++
        }
      }
    }

    if (e.code === 'ArrowUp') {
      if (focusedElement.value === null || focusedElement.value === 0) {
        focusedElement.value = options.value.length - 1
      } else {
        focusedElement.value--
      }
    }
  })
})

function submitAnswer(submittedAnswer: string) {
  if (!submittedAnswer || !langs.includes(submittedAnswer.toLowerCase())) return
  if (focusedElement.value !== null) {
    focusedElement.value = null
  }
  gameStore.addAnswer(submittedAnswer)
  answer.value = ''
  focusedElement.value = null
}
</script>
<template>
  <section class="isolate relative mb-8 w-full max-w-md">
    <input
      type="text"
      ref="answer-input"
      :onchange="() => (focusedElement = null)"
      :disabled="correctedAnswer"
      v-model="answer"
      placeholder="Digite uma linguagem..."
      class="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-4 text-zinc-50 transition-all placeholder:text-zinc-500 focus:border-emerald-500 disabled:opacity-50 outline-none"
    />
    <section
      v-show="answer.length && options.length"
      class="absolute top-full left-0 z-10 mt-2 w-full overflow-hidden rounded-lg border border-zinc-700 bg-zinc-800"
    >
      <ul>
        <li
          v-for="(lang, index) in options"
          role="option"
          :data-focused="focusedElement === index"
          :key="lang"
          @click="submitAnswer(lang)"
          class="cursor-pointer hover:bg-zinc-700 data-[focused=true]:bg-zinc-600"
        >
          <button class="w-full p-3 text-left text-zinc-200">
            {{ lang }}
          </button>
        </li>
      </ul>
    </section>
  </section>
</template>
