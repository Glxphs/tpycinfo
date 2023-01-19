<script>
    import {examTimetable, publicHolidays, timeIntervals} from "$lib/constants.js";
    import {getDayClasses, getTodayDay} from "$lib/helper.js";
    import Day from "$lib/Day.svelte";

    export let offset = 0;
    export let classes;
    export let badge = undefined;

    const today = new Date((new Date()).getTime() + 86400000 * offset);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const mmm = today.toLocaleString('en-US', {month: 'short'});
    const dd = String(today.getDate()).padStart(2, '0');
    const weekday = today.toLocaleDateString('en-US', {weekday: 'long'});
    const dayInfo = getTodayDay(offset);
    const lessons = classes ? getDayClasses(dayInfo, classes) : undefined;

    const dayString = `${yyyy}-${mm}-${dd}`;
    const examClasses = examTimetable[dayString];

    const isHoliday = dayString in publicHolidays || weekday === 'Sun'
</script>

<div class="bg-white p-8 rounded-xl shadow shadow-slate-300 dark:shadow-slate-900 dark:bg-gray-900">
    <div class="flex flex-row justify-between items-center">
        <div>
            <h1 class="text-3xl font-semibold">{dd} {mmm}</h1>
        </div>
        <div class="inline-flex space-x-2 items-center">
            {#if offset === 0}
                <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Today</span>
            {/if}
            {#if offset === 1}
                <span class="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Tomorrow</span>
            {/if}
            {#if isHoliday}
                <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">Public Holiday</span>
            {/if}
            {#if lessons && lessons.indexOf("PE") >= 0}
                <span class="bg-teal-100 text-teal-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-teal-900 dark:text-teal-300">PE Lesson</span>
            {/if}
            {#if examClasses}
                <span class="bg-purple-100 text-purple-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">Exam</span>
            {/if}
        </div>
    </div>
    <p class="text-slate-500">{weekday},
        <Day {offset}/>
    </p>

    {#if lessons && lessons.length > 0}
        <div class="my-5">
            {#each lessons as lesson, i}
                <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-600 py-2 px-2">
                    <div class="inline-flex items-center space-x-2">
                        <span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{timeIntervals[i]}</span>
                        <div>{lesson}</div>
                    </div>
                </div>
            {/each}
        </div>
    {:else if examClasses && examClasses.length > 0}
        <div class="my-5">
            {#each examClasses as exam, i}
                <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-600 py-2 px-2">
                    <div class="inline-flex items-center space-x-2">
                        <span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{exam.time}</span>
                        <span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{exam.room}</span>
                        <div>{exam.subject}</div>
                    </div>
                </div>
            {/each}
        </div>
    {:else}
        <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-600 py-2 px-2">
            <div class="inline-flex items-center space-x-2">
                <div>No lessons</div>
            </div>
        </div>
    {/if}
</div>

