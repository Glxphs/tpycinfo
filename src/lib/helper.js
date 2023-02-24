import {daysMap} from "$lib/constants.js";

export function getTodayDate(offset) {
    const today = new Date((new Date()).getTime() + 86400000 * offset);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

export function getDateDay(date) {
    return daysMap[date] || {'special': 'None'};
}

export function getTodayDay(offset) {
    return daysMap[getTodayDate(offset)] || {'special': 'None'};
}

export function getTodayDayString(offset) {
    const day = getTodayDay(offset);
    return day.special || "Day" + day.day;
}

export function getDayClasses(dateInfo, classes) {
    return classes[dateInfo.day - 1];
}

/*
example daysMap:
    '2022-09-05': {'day': 1},
    '2022-09-06': {'day': 2},
    '2022-09-07': {'day': 3},
    '2022-09-08': {'day': 4},
    '2022-09-09': {'day': 5},
    '2022-09-13': {'day': 6},
    '2022-09-14': {'day': 7},
    '2022-09-15': {'day': 1},
    '2022-09-16': {'day': 2},
    '2022-09-19': {'day': 3},
    '2022-09-20': {'day': 4},
    '2022-09-21': {'day': 5},
    '2022-09-22': {'day': 6},
    '2022-09-26': {'day': 7},
    '2022-09-27': {'day': 1},
    '2022-09-28': {'day': 2},
    '2022-09-29': {'day': 3},
    '2022-09-30': {'day': 4},
    '2022-10-03': {'day': 5},
    '2022-10-05': {'day': 6},
    '2022-10-06': {'day': 7},
    '2022-10-07': {'day': 1},
    '2022-10-10': {'day': 2},
    '2022-10-11': {'day': 3},
    '2022-10-12': {'day': 4},
    '2022-10-13': {'day': 5},
    '2022-10-14': {'day': 6},
    '2022-10-17': {'day': 7},
    '2022-10-18': {'day': 1},
    '2022-10-20': {'special': '測驗日'},
    '2022-10-21': {'special': '測驗日'},
    '2022-10-24': {'special': '測驗日'},
    '2022-10-25': {'special': '測驗日'},
    '2022-10-26': {'day': 2},
    '2022-10-27': {'day': 3},
    '2022-11-01': {'day': 4},
    '2022-11-02': {'day': 5},
    '2022-11-03': {'day': 6},
    '2022-11-04': {'day': 7},
    '2022-11-07': {'day': 1},
    '2022-11-08': {'day': 2},
    '2022-11-09': {'day': 3},
    '2022-11-10': {'day': 4},
    '2022-11-11': {'day': 5},


 */
export function getOnDuty(offset, maxCNO) {
    const todayDate = getTodayDate(offset);
    return getOnDutyFromDate(todayDate, maxCNO);
}

export function getOnDutyFromDate(todayDate, maxCNO) {
    if (daysMap[todayDate] === undefined) return 0;
    if (daysMap[todayDate].special !== undefined) return 0;
    // count days from 2022-09-05 excluding special days
    let count = 1;
    for (const date in daysMap) {
        if (daysMap[date].special === undefined && date !== todayDate) {
            count++;
        }
        if (date === todayDate) break;
    }
    // if count = 30, maxCNO = 31, return 30, if count = 31, maxCNO = 31, return 31, if count = 32, maxCNO = 31, return 1
    if (count % maxCNO === 0) return maxCNO;
    return count % maxCNO;
}