import {getMessaging, getToken} from "firebase/messaging";

/**
 * @return FSM token
 */
export async function getFCMToken(): Promise<string> {
    return await getToken(getMessaging(), {vapidKey: process.env.GATSBY_VAPID_KEY})
}