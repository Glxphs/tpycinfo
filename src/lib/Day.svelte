<script>
    import {getTodayDay} from "$lib/helper.js";

    export let offset = 0;

    const dayInfo = getTodayDay(offset);
</script>

{#if 'day' in dayInfo}
    Day {dayInfo.day}
{:else}
    {dayInfo.special}
{/if}




