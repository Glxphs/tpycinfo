<script>
    import {classes4a} from "$lib/constants.js";
    import ClassesCard from "$lib/ClassesCard.svelte";
    import Meta from "$lib/Meta.svelte";
</script>

<Meta title="4A Timetable" />
<div class="container">
    <div class="row">
        {#each {length: 50} as _, i}
            <ClassesCard offset={i} classes={classes4a}></ClassesCard>
        {/each}
    </div>
</div>