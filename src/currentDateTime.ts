import {toUnixTime} from "./api/utils";

export default function getCurrentDateTime() {
    let date = new Date();
    const offset = date.getTimezoneOffset() * 1000 * 60;
    date = new Date(date.getTime() - offset)

    return {
        defaultDate: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`,
        defaultTime: `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
    }
}

export function toHumanReadable(range: TimeRange) {
    const startTime = new Date(range.startDate * 1000)

    return isToday(startTime)
        ? `cегодня ${timeInterval(range)}`
        : `${startTime.getDate().toString().padStart(2, "0")}.${(startTime.getMonth() + 1).toString().padStart(2, "0")}.${startTime.getFullYear().toString()} ${timeInterval(range)}`
}

function timeInterval(range: TimeRange) {
    const start = toHours(new Date(range.startDate * 1000))
    let end = toHours(new Date(range.endDate * 1000))

    if(end == start) end = "24:00"

    return `c ${start} до ${end}`
}

function toHours(date: Date) {
    return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
}

export function isToday(date: Date) {
    const today = new Date()
    return date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear()
}

export type TimeRange = { startDate: number, endDate: number }

/**
 * Parses string date and range of delivery time
 * to start and end dates
 *
 * @param date Date in YYYY-MM-dd format
 * @param percents array of 2 values, where first is the start time, second is end time
 *
 * @returns Object with start and end date, UNIX time (in ms)
 */
export function parseDateTime(date: string, percents: number[]): TimeRange {
    const dateArr = date.split("-");
    const year = parseInt(dateArr[0]);
    const month = parseInt(dateArr[1]);
    const day = parseInt(dateArr[2]);

    const startTime = getTimeByRemainingDayPercent(percents[0])
    const endTime = getTimeByRemainingDayPercent(percents[1])

    return {
        startDate: toUnixTime(new Date(year, month - 1, day, startTime.hours, startTime.minutes)),
        endDate: toUnixTime(new Date(year, month - 1, day, endTime.hours, endTime.minutes))
    }
}

/**
 * Convert percent of remaining time from start of the day to hour & minute
 * @param percent number from 0-100
 */
export function getTimeByRemainingDayPercent(percent: number): { hours: number, minutes: number } {
    const minutesInDay = 1440;
    const minutes = percent / 100 * minutesInDay;

    return {
        hours: Math.floor(minutes / 60),
        minutes: Math.floor(minutes % 60)
    }
}
