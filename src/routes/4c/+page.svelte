<script>
    import ClassesCard from "$lib/ClassesCard.svelte";
    import Meta from "$lib/Meta.svelte";
    import {classes4c} from "$lib/constants.js";
</script>

<Meta title="4C Timetable" />
<div class="container">
    <div class="row">
        {#each {length: 9} as _, i}
            <ClassesCard offset={i} classes={classes4c}></ClassesCard>
        {/each}
    </div>
</div>