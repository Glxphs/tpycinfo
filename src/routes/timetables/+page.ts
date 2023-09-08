import type { PageLoad } from './$types';
import timetables from '$lib/timetables/timetables.json';
import {DateTime} from "luxon";
import {getCurrentCycleFromDate} from "$lib/dates";

export const load: PageLoad = ({data,  params }) => {
    const now = DateTime.now().setZone("Asia/Hong_Kong")
    const currentCycle = getCurrentCycleFromDate(now);

    // @ts-ignore
    let tasks = data.data.data;

    //[
    //       {
    //         "gid": "1205449919775836",
    //         "due_on": "2023-09-11",
    //         "memberships": [
    //           {
    //             "section": {
    //               "gid": "1205449919775822",
    //               "name": "To do"
    //             }
    //           }
    //         ],
    //         "name": "Chem Topic 3 MC",
    //         "notes": "",
    //         "tags": []
    //       },
    //       {
    //         "gid": "1205449919775838",
    //         "due_on": "2023-09-20",
    //         "memberships": [
    //           {
    //             "section": {
    //               "gid": "1205449919775822",
    //               "name": "To do"
    //             }
    //           }
    //         ],
    //         "name": "Chem Topic 4 MC",
    //         "notes": "",
    //         "tags": []
    //       },
    //       {
    //         "gid": "1205449919775840",
    //         "due_on": "2023-10-11",
    //         "memberships": [
    //           {
    //             "section": {
    //               "gid": "1205449919775822",
    //               "name": "To do"
    //             }
    //           }
    //         ],
    //         "name": "Chem Topic 5 MC",
    //         "notes": "",
    //         "tags": []
    //       },
    //       {
    //         "gid": "1205449919775866",
    //         "due_on": "2023-09-29",
    //         "memberships": [
    //           {
    //             "section": {
    //               "gid": "1205449919775822",
    //               "name": "To do"
    //             }
    //           }
    //         ],
    //         "name": "Chem Titration Experiment",
    //         "notes": "",
    //         "tags": []
    //       },
    //       {
    //         "gid": "1205449919775868",
    //         "due_on": "2023-10-07",
    //         "memberships": [
    //           {
    //             "section": {
    //               "gid": "1205449919775822",
    //               "name": "To do"
    //             }
    //           }
    //         ],
    //         "name": "Chem SBA",
    //         "notes": "",
    //         "tags": []
    //       }
    //     ]

    // Change it to this:
    /*
    *
    * [
    *  {
    *   "gid": "1205449919775836",
    *   "due_on": "2023-09-11",
    *   "name": "Chem Topic 3 MC",
    *   "notes": "",
    *   "section": "To do"
    *  },...
    *
    * */

    // @ts-ignore
    tasks = tasks.map((task) => {
        return {
            ...task,
            section: task.memberships[0].section.name
        }
    })

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
        currentCycle: currentCycle,
        // @ts-ignore
        tasks: data.data.data
    };
};