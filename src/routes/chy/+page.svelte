<script>
    import {classesChy} from "$lib/constants.js";
    import ClassesCard2 from "$lib/ClassesCard2.svelte";
    import Meta from "$lib/Meta.svelte";
</script>

<Meta title="CHY Timetable"/>
<div class="container max-w-7xl mx-auto p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-3">
            {#each {length: 50} as _, i}
                <div class="w-full justify-center justify-self-center mx-auto">
                    <ClassesCard2 offset={i} classes={classesChy}></ClassesCard2>
                </div>
            {/each}
        </div>
</div>