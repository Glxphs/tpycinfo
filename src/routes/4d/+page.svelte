<script>
    import {classes4d} from "$lib/constants.js";
    import ClassesCard from "$lib/ClassesCard.svelte";
    import Meta from "$lib/Meta.svelte";
</script>

<Meta title="4D Timetable" />
<div class="container">
    <div class="row">
        {#each {length: 50} as _, i}
            <ClassesCard offset={i} classes={classes4d}></ClassesCard>
        {/each}
    </div>
</div>