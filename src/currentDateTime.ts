export default function getCurrentDateTime() {
    let date = new Date();
    const offset = date.getTimezoneOffset() * 1000 * 60;
    date = new Date(date.getTime() - offset)

    let month = (date.getMonth() + 1).toString()
    if (month.length === 1) { // if month is 1-digit
        month = "0" + month
    }

    return {
        defaultDate: `${date.getFullYear()}-${month}-${date.getDate()}`,
        defaultTime: `${date.getHours()}:${date.getMinutes()}`
    }
}

export function toHumanReadable(date: Date) {
    return isToday(date)
        ? `cегодня ${timeInterval(date)}`
        : `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear().toString()} ${timeInterval(date)}`
}

function timeInterval(date: Date) {
    return `c ${toHours(date)} до ${toHours(addTime(date,3600 * 2))}`
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

export function parseDateTime(date: string, time: string) {
    const dateArr = date.split("-");
    const year = parseInt(dateArr[0]);
    const month = parseInt(dateArr[1]);
    const day = parseInt(dateArr[2]);

    const timeArr = time.split(":");
    const hour = parseInt(timeArr[0]);
    const minute = parseInt(timeArr[1]);

    return new Date(year, month, day, hour, minute)
}

export function addTime(date, seconds: number) {
    return new Date(date.getTime() + seconds * 1000);
}
