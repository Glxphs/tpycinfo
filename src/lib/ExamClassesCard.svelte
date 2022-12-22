<script>
    import {examTimetable} from "$lib/constants.js";

    export let offset = 0;
    export let badge = undefined;

    const today = new Date((new Date()).getTime() + 86400000 * offset);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayString = `${yyyy}-${mm}-${dd}`;
    const weekday = today.toLocaleDateString('en-US', {weekday: 'short'});

    const todayExams = examTimetable[todayString];
</script>

<div class="col-12 col-lg-6 col-xl-4 py-3">
    <div class="card">
        <h3 class="card-header card-title">
            <span class="badge text-bg-secondary"><sup>{dd}</sup>⁄<sub>{mm}</sub></span> {weekday}
            {#if badge}
                <span class="badge rounded-pill text-bg-info">{badge}</span>
            {/if}
            <span class="badge rounded-pill text-bg-info">Exam</span>
        </h3>
        <div class="card-body">
            <div class="card-text">
                {#if todayExams && todayExams.length > 0}
                    <ol class="list-group list-group-numbered list-group-flush">
                        {#each todayExams as exam, i}
                            <li class="list-group-item py-1">
                                <span class="badge rounded-pill bg-dark text-dark bg-opacity-10">{exam.time}</span>
                                <span class="badge rounded-pill bg-dark text-dark bg-opacity-10">{exam.room}</span>
                                {exam.subject}
                            </li>
                        {/each}
                    </ol>
                {:else}
                    <p class="text-center text-muted">No exams😍</p>
                {/if}
            </div>
        </div>
    </div>
</div>