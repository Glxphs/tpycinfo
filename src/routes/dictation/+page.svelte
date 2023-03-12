<script>
    import navtitle from "$lib/navtitle.js"
    import Meta from "$lib/Meta.svelte";
    import {allPassages} from "./passages"

    $navtitle = "Chinese Dictation"

    let poem = ""
    let poemLines = []
    let answer = []
    let canInput = []
    let coords2index = []
    let inputFields = []
    let correctAnswer = []
    let isCorrect = []

    $: {
        poemLines = poem.replace(/ /g, '').split("\n")
    }

    let started = false

    let count = 0

    function increment(index, charIndex) {
        coords2index[index][charIndex] = count
        count++;
        return ""
    }

    function startQuiz() {
        started = true
        answer = poemLines.map(line => {
            inputFields.push([])
            canInput.push([])
            coords2index.push([])
            return line.split("")
        })
        correctAnswer = answer
        answer = answer.map((line, lineIndex) => line.map((char, charIndex) => {
            if (/[\u4e00-\u9fa5]/g.test(char)) {
                canInput[lineIndex].push(charIndex)
                inputFields.push(undefined)
                coords2index.push(0)
                return ""
            } else {
                return char
            }
        }))
    }

    let submitted = false
    let score = NaN

    function submit() {
        submitted = true

        isCorrect = answer.map((line, lIndex) => line.map((char, cIndex) => {
            return char === correctAnswer[lIndex][cIndex]
        }))

        score = Math.max(0, 100 - isCorrect.flat(Infinity).filter(v => !v).length * 5)
    }

    function unsubmit() {
        submitted = false
        score = NaN
    }

    let selected = ""
</script>
<Meta title="Chinese Dictation"/>
<div class="container max-w-7xl mx-auto p-8 space-y-4">
    <h5 class="header">Chinese Dictation</h5>

    {#if !started}
        <div class="text">
            Enter a Chinese poem and click <span class="strong">Start</span> to start the quiz.
        </div>

        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Or choose from 指定文言經典學習材料（十二篇）:</label>
        <select bind:value={selected} on:change={() => {poem = selected}} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected value="">None</option>
            {#each allPassages as passage}
                <option value={passage[1]}>{passage[0]}</option>
            {/each}
        </select>

        <textarea bind:value={poem} id="message" rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="《山居秋暝》王維
空山新雨後，天氣晚來秋。
明月松間照，清泉石上流。
竹喧歸浣女，蓮動下漁舟。
隨意春芳歇，王孫自可留。"
        ></textarea>
        <button
                on:click={startQuiz}
                type="button"
                class="border-gray-300 dark:border-gray-400 border inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition"
                disabled='{poem.length == 0}'>
            Start
        </button>
    {:else}
        <div class="grid justify-items-center">
            {#each answer as line, index}
                <div class="inline-flex flex-wrap gap-1">
                    {#each line as char, charIndex}
                        {#if canInput[index].includes(charIndex)}
                            {#if !submitted}
                                <input on:input={(e) => {
                                    if (e.data && inputFields.flat(Infinity)[coords2index[index][charIndex] + 1] && /[\u4e00-\u9fa5]/g.test(e.data)) {
                                        inputFields.flat(Infinity)[coords2index[index][charIndex] + 1].focus()
                                    }
                                }} bind:this={inputFields[index][charIndex]}
                                       bind:value={answer[index][charIndex]} type="text" maxlength="1"
                                       class="h-[2rem] w-[3rem] text-center text-2xl border-b-2 border-gray-300 flex-wrap shrink bg-transparent focus:ring-0 border-0"/>
                                {increment(index, charIndex)}
                            {:else}
                                <span class="h-[2rem] w-[3rem] text-center text-2xl border-b-2 border-gray-300 flex-wrap shrink bg-transparent focus:ring-0 border-0 {submitted ? (isCorrect[index][charIndex] ? 'text-green-500' : 'text-red-500') : ''}">
                                    {correctAnswer[index][charIndex]}
                                </span>
                            {/if}
                        {:else}
                            <span class="h-[2rem] w-[3rem] text-center text-2xl border-b-2 border-gray-300 flex-wrap shrink bg-transparent focus:ring-0 border-0">
                                {answer[index][charIndex]}
                            </span>
                        {/if}
                    {/each}
                </div>
            {/each}
        </div>
        <button
                on:click={submitted ? unsubmit : submit}
                type="button"
                class="border-gray-300 dark:border-gray-400 border inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition">
            {submitted ? "Unsubmit" : "Submit"}
        </button>
        {#if submitted}
            <div class="text">
                Your mark: <span class="strong">{score}</span>
            </div>
        {/if}
    {/if}
</div>


