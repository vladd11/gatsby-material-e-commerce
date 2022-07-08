import {initializeApp} from "firebase/app";
import {getMessaging} from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp(JSON.parse(process.env.GATSBY_FIREBASE));

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
getMessaging(firebaseApp);
