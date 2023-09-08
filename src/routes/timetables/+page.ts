import type { PageLoad } from './$types';
import timetables from '$lib/timetables/timetables.json';
import {DateTime} from "luxon";
import {getCurrentCycleFromDate} from "$lib/dates";

export const load: PageLoad = ({ params }) => {
    const now = DateTime.now().setZone("Asia/Hong_Kong")
    const currentCycle = getCurrentCycleFromDate(now);

    return {
        classes: {
            ...timetables.classes
        },
        times: {
            ...timetables.times
        },
        morning: {
            ...timetables.morning
        },
        currentCycle: currentCycle
    };
};