import {DateTime} from "luxon";

const startDate = DateTime.fromISO("2023-09-05", { zone: "Asia/Hong_Kong" });
const endDate = DateTime.fromISO("2024-06-18", { zone: "Asia/Hong_Kong" });

const holidayDates = [
    "2023-10-02",
    "2023-10-12",
    "2023-10-23",
    ...getDaysArray("2023-10-24", "2023-10-31"),
    "2023-11-15",
    "2023-11-16",
    "2023-11-17",
    // "2023-12-11",
    ...getDaysArray("2023-12-19", "2024-01-01"),
    ...getDaysArray("2024-01-02", "2024-01-15"),
    ...getDaysArray("2024-02-06", "2024-02-18"),
    "2024-02-26",
    "2024-03-08",
    "2024-03-19",
    ...getDaysArray("2024-03-20", "2024-04-04"),
    "2024-05-01",
    "2024-05-15",
    ...getDaysArray("2024-06-03", "2024-06-18"),
];

function getDaysArray(start: string, end: string) {
    const arr = [];
    const startDate = DateTime.fromISO(start, { zone: "Asia/Hong_Kong" });
    const endDate = DateTime.fromISO(end, { zone: "Asia/Hong_Kong" });
    for (let date = startDate; date <= endDate; date = date.plus({ days: 1 })) {
        arr.push(date.toISODate());
    }
    return arr;
}

function isHoliday(date: DateTime) {
    const dateString = date.toISODate();
    return holidayDates.includes(dateString);
}

function isWeekend(date: DateTime) {
    const day = date.weekday;
    return day === 6 || day === 7; // Saturday or Sunday
}

export function calculateDay(currentDate: DateTime) {
    if (isHoliday(currentDate) || isWeekend(currentDate)) {
        return 0;
    }

    let dayCount = 0;
    let date = startDate;

    while (date <= currentDate) {
        if (!isWeekend(date) && !isHoliday(date)) {
            dayCount = (dayCount % 7) + 1;
        }

        date = date.plus({ days: 1 });
    }

    return dayCount;
}

function groupDaysIntoCycles() {
    const cycles = [];
    let currentDate = startDate;
    let currentCycle = [];

    while (currentDate <= endDate) {
        const day = calculateDay(currentDate);

        if (day !== 0) {
            currentCycle.push({
                date: currentDate,
                day: day
            });
        }

        if (currentCycle.length === 7) {
            cycles.push(currentCycle);
            currentCycle = [];
        }

        currentDate = currentDate.plus({ days: 1 });
    }

    if (currentCycle.length > 0) {
        cycles.push(currentCycle);
    }

    return cycles;
}

export function getCurrentCycleFromDate(now: DateTime) {
    const cycles = groupDaysIntoCycles();

    for (let i = 0; i < cycles.length; i++) {
        const cycle = cycles[i];
        const cycleStartDate = cycle[0].date;
        const cycleEndDate = cycle[cycle.length - 1].date;

        if (now >= cycleStartDate && now <= cycleEndDate) {
            const cycles = cycle.map(cycleDay => ({
                date: cycleDay.date,
                day: cycleDay.day
            }))
            return { cycleIndex: i, cycles };
        }
    }

    return null; // Return null if the current date is not within any cycle
}

// console.log(`Today: ${DateTime.now().setZone("Asia/Hong_Kong").toISODate()}`)
// console.log(getCurrentCycleFromDate(DateTime.now().setZone("Asia/Hong_Kong"), startDate, endDate));