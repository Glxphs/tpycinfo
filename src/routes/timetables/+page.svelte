<script lang="ts">
    import type {PageData} from './$types';
    import Timetable from "$lib/Timetable.svelte";
    import Meta from "$lib/Meta.svelte";
    import {DateTime} from "luxon";
    import Fa from "svelte-fa";
    import {faListCheck, faPencil} from "@fortawesome/free-solid-svg-icons";

    let selectedClass: string = '5D';

    export let data: PageData
</script>
<Meta title="Timetable"/>
<div class="container mx-auto justify-center mt-10">
    <div class="flex flex-col gap-10">
        <div class="flex flex-col mx-auto gap-5">
            <h2 class="text-3xl dark:text-white font-semibold text-center">Timetable</h2>
            <div class="flex mx-auto">
                {#each Object.keys(data.classes) as schoolClass}
                    <div class="flex items-center mr-4">
                        <input bind:group={selectedClass} id="inline-radio" type="radio" value={schoolClass}
                               name="inline-radio-group"
                               class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="inline-radio"
                               class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{schoolClass}</label>
                    </div>
                {/each}
            </div>
            {#key selectedClass}
                <div class="overflow-x-auto mx-auto">
                    <Timetable source={data.classes[selectedClass]} times={data.times} morning={data.morning}
                               currentCycle={data.currentCycle}/>
                </div>
            {/key}
            <div class="px-5">
                <div class="text-xs font-semibold text-center text-gray-400">
                    <p>PG: Playground</p>
                    <p>CTP: Class Teacher Period</p>
                    <p>CNP: Chinese Newspaper</p>
                    <p>ENP: English Newspaper</p>
                </div>
            </div>
            {#if selectedClass === "5D"}
                <div>
                    <h2 class="text-xl dark:text-white font-semibold text-center">5D Upcoming Events</h2>
                </div>
                <div class="max-w-screen-lg">
                    {#each data.tasks as task}
                        <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-600 py-3 px-2 bg-gradient-to-r from-transparent to-transparent hover:from-slate-100 dark:hover:from-slate-700">
                            <div class="inline-flex items-center space-x-2">
                                <div>
                                    <Fa icon={faListCheck} class="text-gray-400 dark:text-gray-500"/>
                                </div>
                                <div>{task.name}</div>
                                <div>{task.notes}</div>
                            </div>
                            <div class="px-2">
                                <div class="text-xs font-semibold text-gray-400">{DateTime.fromISO(task.due_on).toFormat("LLL d")}</div>
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</div>