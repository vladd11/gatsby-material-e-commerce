import {getMessaging, onMessage} from "firebase/messaging";
import {initializeApp} from "firebase/app";

import NotificationType from "../types/notification"

const messaging = getMessaging(initializeApp(JSON.parse(process.env.GATSBY_FIREBASE!)));
onMessage(messaging, (value) => {
    document.dispatchEvent(new CustomEvent<NotificationType>("notificationReceived", {
        detail: {
            text: value.notification?.body!
        }
    }));
});
