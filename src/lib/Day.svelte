<script>
    import {calculateDay} from './dates.ts';
    import {DateTime} from "luxon";

    export let offset = 0;

    const today = DateTime.now().setZone("Asia/Hong_Kong").plus({days: offset});
    const dayInfo = calculateDay(today);
</script>

Day {dayInfo}




