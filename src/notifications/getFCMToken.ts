import {getMessaging, getToken} from "firebase/messaging";
import {initializeApp} from "firebase/app";

/**
 * @return FSM token
 */
export default async function getFCMToken(): Promise<string> {
    const messaging = getMessaging(initializeApp(JSON.parse(process.env.GATSBY_FIREBASE!)));
    return await getToken(messaging, {vapidKey: process.env.GATSBY_VAPID_KEY})
}