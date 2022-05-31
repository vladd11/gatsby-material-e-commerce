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
