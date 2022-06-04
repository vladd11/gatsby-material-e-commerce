/**
 * Converts phone to E.264 number format and validates it.
 */
export default function convertPhoneToE164(str: string) {
    const result = str.replace(/[- ()]/, '')
    if(result.length > 15) throw new InvalidNumberError(str)

    return result
}

export class InvalidNumberError extends Error {
    constructor(phone: string) {
        super(`Phone number ${phone} length is bigger than ${phone.length}`);
    }
}