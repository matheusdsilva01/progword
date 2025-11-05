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
  if (!answer.value || !langs.includes(answer.value.toLowerCase())) return

  answers.value.unshift(answer.value)
  if (answer.value === dayLang) {
    correctedAnswer.value = true
  }
  answer.value = ''
}
</script>

<template>
  <main class="container mx-auto py-12 px-4 flex flex-col items-center justify-center min-h-screen">
    <header class="text-center max-w-md mb-8">
      <h1 class="text-4xl font-bold tracking-wider text-emerald-400">PROGWORD</h1>
      <p class="text-zinc-400">Adivinhe a linguagem de programação do dia!</p>
    </header>

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

    <section v-if="answers.length" class="space-y-3 max-w-lg w-full">
      <transition-group name="list" tag="ul" class="space-y-3">
        <li
          v-for="ans in answers"
          :key="ans"
          :class="[
            'flex items-center justify-between rounded-lg p-4',
            ans === dayLang ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400',
          ]"
        >
          <span>{{ ans }}</span>
          <span class="text-xs font-mono">{{ ans === dayLang ? 'Correto!' : 'Incorreto' }}</span>
        </li>
      </transition-group>
    </section>

    <div v-if="correctedAnswer" class="mt-8 text-center">
      <p class="text-2xl text-emerald-400">Parabéns, você acertou!</p>
      <p class="text-zinc-400">
        A linguagem do dia era <strong class="font-bold">{{ dayLang }}</strong
        >.
      </p>
    </div>
  </main>
</template>
