<script setup lang="ts">
import { properties, type LangProperty } from '@/lib/utils/langs'
import { useGameStore } from '@/stores/game'
import { computed } from 'vue'

enum AssertType {
  ERROR = 'error',
  EQUAL = 'equal',
  INFERIOR = 'inferior',
  SUPERIOR = 'superior',
}

const { answer, statKey, value } = defineProps<{
  answer: string
  statKey: keyof LangProperty
  value: string
}>()

const gameStore = useGameStore()
const { dayLang } = gameStore
const dayLangStats = properties[dayLang]!

const check = computed(() => {
  if (statKey === 'createdAt') {
    if (value < dayLangStats[statKey]) {
      return AssertType.INFERIOR
    } else if (value > dayLangStats[statKey]) {
      return AssertType.SUPERIOR
    }
  }
  return value === dayLangStats[statKey] ? AssertType.EQUAL : AssertType.ERROR
})

const hasRange = computed(() => {
  return check.value === AssertType.INFERIOR || check.value === AssertType.SUPERIOR
})
const isEqual = computed(() => check.value === AssertType.EQUAL)
</script>
<template>
  <div
    :class="[
      'p-4 w-36 flex items-center justify-center',
      isEqual ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400',
    ]"
    :key="answer.concat(value)"
  >
    <p class="text-center">
      {{ value }}
    </p>
    <span v-if="hasRange" class="ml-2">
      <span v-if="check === AssertType.SUPERIOR">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-arrow-big-down-icon lucide-arrow-big-down"
        >
          <path
            d="M15 11a1 1 0 0 0 1 1h2.939a1 1 0 0 1 .75 1.811l-6.835 6.836a1.207 1.207 0 0 1-1.707 0L4.31 13.81a1 1 0 0 1 .75-1.811H8a1 1 0 0 0 1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1z"
          />
        </svg>
      </span>
      <span v-if="check === AssertType.INFERIOR">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-arrow-big-up-icon lucide-arrow-big-up"
        >
          <path
            d="M9 13a1 1 0 0 0-1-1H5.061a1 1 0 0 1-.75-1.811l6.836-6.835a1.207 1.207 0 0 1 1.707 0l6.835 6.835a1 1 0 0 1-.75 1.811H16a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z"
          />
        </svg>
      </span>
    </span>
  </div>
</template>
