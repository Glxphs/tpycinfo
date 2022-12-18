<script>
    import {classes4b} from "$lib/constants.js";
    import ClassesCard from "$lib/ClassesCard.svelte";
    import Meta from "$lib/Meta.svelte";
</script>

<Meta title="4B Timetable" />
<div class="container">
    <div class="row">
        {#each {length: 9} as _, i}
            <ClassesCard offset={i} classes={classes4b}></ClassesCard>
        {/each}
    </div>
</div>