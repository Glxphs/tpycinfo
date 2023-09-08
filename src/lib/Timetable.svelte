<script lang="ts">
    import {DateTime} from "luxon";

    export let source: string[][];
    export let currentCycle: {cycleIndex: number, cycles: {date: DateTime, day: number}[]};

    const extraSessions = {
        1: "Recess",
        3: "Recess",
        5: "Lunch"
    }

    const days = 7
    const daysArray = Array.from({length: days}, (_, i) => i)

    const lessonsArray = Array.from({length: 9}, (_, i) => i)

    const now = DateTime.now().setZone("Asia/Hong_Kong")
</script>

<div class="relative">
    <table class="text-sm text-left text-gray-500 dark:text-gray-400 table-fixed w-screen max-w-screen-md overflow-hidden">
        <thead class="text-xs text-gray-900 uppercase dark:text-gray-400">
        <tr>
<!--            <th scope="col" class="px-6 py-3 w-32">-->
<!--                Time-->
<!--            </th>-->
            {#each daysArray as day}
                <th scope="col" class="py-4 text-center">
                    <div>
                        {currentCycle.cycles[day].date.toFormat("d/L") || "-"}
                    </div>
                    <div>
                        {currentCycle.cycles[day].date.toFormat("ccc") || "-"}
                    </div>
                    <div>
                        Day{day + 1}
                    </div>
                </th>
            {/each}
        </tr>
        </thead>
        <tbody>
        {#each lessonsArray as lessonIndex}
            <tr class="bg-white dark:bg-gray-800">
<!--                <th scope="row" class="px-6 py-4 text-xs text-gray-900 whitespace-nowrap dark:text-white">-->
<!--                    {times[lessonIndex]}-->
<!--                </th>-->
                {#each daysArray as day}
                    <td class="py-1 text-center {currentCycle.cycles[day].date.hasSame(now, 'day') ? 'dark:text-gray-200 text-gray-800 font-semibold' : ''}">
                        {source[day][lessonIndex] || ""}
                    </td>
                {/each}
            </tr>
            {#if extraSessions[lessonIndex]}
                <tr class="bg-white dark:bg-gray-800">
                    <td class="py-1 text-xs font-semibold whitespace-nowrap text-center" colspan="7">
                        {extraSessions[lessonIndex]}
                    </td>
                </tr>
            {/if}
        {/each}
        </tbody>
    </table>
</div>