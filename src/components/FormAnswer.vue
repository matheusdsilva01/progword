<script setup lang="ts">
import { langs } from '@/lib/utils/langs'
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

const gameStore = useGameStore()
const { correctedAnswer } = storeToRefs(gameStore)
const answer = ref<string>('')
const options = computed(() =>
  langs.filter(
    (l) => l.toLowerCase().startsWith(answer.value.toLowerCase()) && !gameStore.answers.includes(l),
  ),
)

function submitAnswer() {
  if (!answer.value || !langs.includes(answer.value.toLowerCase())) return

  gameStore.addAnswer(answer.value)
  answer.value = ''
}
</script>
<template>
  <form class="isolate relative mb-8 w-full max-w-md" @submit.prevent="submitAnswer">
    <input
      type="text"
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
        <li v-for="lang in options" :key="lang" class="cursor-pointer hover:bg-zinc-700">
          <button
            type="submit"
            class="w-full p-3 text-left text-zinc-200"
            @click.capture="answer = lang"
          >
            {{ lang }}
          </button>
        </li>
      </ul>
    </section>
  </form>
</template>
