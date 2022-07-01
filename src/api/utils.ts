import {ifClientSide} from "../states/localStorageState";
import User from "../interfaces/User";

export const toUnixTime = (date: Date) => Math.floor(date.getTime() / 1000);
export const setPhone = (phone: string) => localStorage.setItem("user.phone", phone)
export const getPhone = (): string => ifClientSide(() => localStorage.getItem("user.phone"))

export function logout() {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("user.phone")
}

export function getCachedUser(): User {
    return {
        phone: getPhone()
    }
}