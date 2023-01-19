<script>
    import {classes4b} from "$lib/constants.js";
    import ClassesCard from "$lib/ClassesCard.svelte";
    import Meta from "$lib/Meta.svelte";
    import ClassesCard2 from "$lib/ClassesCard2.svelte";
</script>

<Meta title="4B Timetable" />
<div class="container max-w-7xl mx-auto p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-3">
            {#each {length: 50} as _, i}
                <div class="w-full justify-center justify-self-center mx-auto">
                    <ClassesCard2 offset={i} classes={classes4b}></ClassesCard2>
                </div>
            {/each}
        </div>
</div>