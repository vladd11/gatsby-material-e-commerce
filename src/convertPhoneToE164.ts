/**
 * Converts phone to E.264 number format and validates it.
 */
export default function convertPhoneToE164(str: string, countryCode: string) {
    const result = str.replace(/[- ()]/, '')
    if (result.length > 15) throw new InvalidPhoneError(str)

    return `${countryCode}${result}`
}

export class InvalidPhoneError extends Error {
    constructor(phone: string) {
        super(`Phone number ${phone} length is invalid`);
    }
}
