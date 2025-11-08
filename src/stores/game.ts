import { langs } from "@/lib/utils/langs";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useGameStore = defineStore("game", () => {
    const currDay = new Date()
    const startDay = new Date(2025, 9, 27, 0, 0, 0, 0)
    const dayDiff = Math.floor((currDay.getTime() - startDay.getTime()) / (1000 * 60 * 60 * 24))
    const dayLang = ref<string>(langs[dayDiff % langs.length]!)

    const storageAnswers = localStorage.getItem("answers")

    const answers = ref<string[]>(storageAnswers ? JSON.parse(storageAnswers) : [])

    const correctedAnswer = computed(() => {
        return answers.value[0] === dayLang.value
    })
    const storageDayLang = localStorage.getItem("dayLang")

    if (!storageDayLang || dayLang.value !== JSON.parse(storageDayLang)) {
        setLocalStorage('answers', [])
        setLocalStorage('dayLang', dayLang.value)
        answers.value = []
    }

    function addAnswer(answer: string) {
        answers.value.unshift(answer)
        setLocalStorage("answers", answers.value)
    }

    return { answers, dayLang, addAnswer, correctedAnswer }
})

function setLocalStorage(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value))
}