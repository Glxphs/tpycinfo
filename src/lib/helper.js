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

export function getDayClasses(dateInfo, classes) {
    return classes[dateInfo.day - 1];
}