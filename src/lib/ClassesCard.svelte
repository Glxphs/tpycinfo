<script>
    import {examTimetable, timeIntervals} from "$lib/constants.js";
    import {getDayClasses, getTodayDay} from "$lib/helper.js";
    import Day from "$lib/Day.svelte";
    import ExamClassesCard from "$lib/ExamClassesCard.svelte";

    export let offset = 0;
    export let classes;
    export let badge = undefined;

    const today = new Date((new Date()).getTime() + 86400000 * offset);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const weekday = today.toLocaleDateString('en-US', {weekday: 'short'});
    const dayInfo = getTodayDay(offset);
    const lessons = classes ? getDayClasses(dayInfo, classes) : undefined;

    const dayString = `${yyyy}-${mm}-${dd}`;
</script>

{#if dayString in examTimetable}
    <ExamClassesCard {offset} {badge}/>
{:else}
    <div class="col-12 col-lg-6 col-xl-4 py-3">
        <div class="card">
            <h3 class="card-header card-title">
                <span class="badge text-bg-secondary"><sup>{dd}</sup>⁄<sub>{mm}</sub></span> {weekday} (
                <Day offset={offset}/>
                )
                {#if badge}
                    <span class="badge rounded-pill text-bg-info">{badge}</span>
                {/if}
                {#if lessons && lessons.indexOf("PE") >= 0}
                    <span class="badge rounded-pill text-bg-secondary">PE</span>
                {/if}
            </h3>
            <div class="card-body">
                <div class="card-text">
                    {#if lessons && lessons.length > 0}
                        <ol class="list-group list-group-numbered list-group-flush">
                            {#each lessons as lesson, i}
                                <li class="list-group-item py-1">
                                    <span class="badge rounded-pill bg-dark text-dark bg-opacity-10">{timeIntervals[i]}</span>
                                    {lesson}
                                </li>
                            {/each}
                        </ol>
                    {:else}
                        <p class="text-center text-muted">No lessons😍</p>
                    {/if}
                </div>
            </div>
        </div>
    </div>
{/if}