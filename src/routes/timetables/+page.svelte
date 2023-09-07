<script lang="ts">
    import type {PageData} from './$types';
    import Timetable from "$lib/Timetable.svelte";

    let selectedClass: string = '5D';

    export let data: PageData
</script>

<div class="container mx-auto justify-center my-10">
    <div class="">
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
                    <Timetable source={data.classes[selectedClass]} times={data.times}
                               currentCycle={data.currentCycle}/>
                </div>
            {/key}
        </div>
        <iframe class="mx-auto mt-10" src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FHong_Kong&showTitle=0&showNav=1&showTz=0&showCalendars=0&showTabs=1&hl=en&src=bTE5MTAyMUB0cHljLmVkdS5oaw&src=Y19jbGFzc3Jvb200MjM5NGM2ZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=dHB5Y3dlYkB0cHljLmVkdS5oaw&src=emguaG9uZ19rb25nI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%23007b83&color=%233F51B5&color=%230B8043"
                width="800" height="600" frameborder="0" scrolling="no"></iframe>
    </div>
</div>