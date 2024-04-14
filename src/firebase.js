import { initializeApp } from 'firebase/app'
import {
    getMessaging,
    getToken,
    onMessage,
    isSupported,
} from 'firebase/messaging'
import { useStoreFcm } from './hooks/react-query/push-notification/usePushNotification'

const firebaseConfig = {
  apiKey: "AIzaSyAeliEuUDxVV3-nkO-Ell9fFcifr9jtQtU",
  authDomain: "pede-logo-99040.firebaseapp.com",
  projectId: "pede-logo-99040",
  storageBucket: "pede-logo-99040.appspot.com",
  messagingSenderId: "1025418518982",
  appId: "1:1025418518982:web:2eab5b475f43da9ea752c7",
  measurementId: "G-8WE2X7HPC2"

}
const firebaseApp = initializeApp(firebaseConfig)
const messaging = (async () => {
    try {
        const isSupportedBrowser = await isSupported()
        if (isSupportedBrowser) {
            return getMessaging(firebaseApp)
        }

        return null
    } catch (err) {
        return null
    }
})()

export const fetchToken = async (setTokenFound, setFcmToken) => {
    return getToken(await messaging, {
        vapidKey: 'BFU01cy5d7Uyt6lgJMfDU0V7QJrYgfNYCg5kFLCPzHl44ENRK0CpnK5SeukUG-Roco1sjhyW76-WM22rq0aEwCY',
    })
        .then((currentToken) => {
            if (currentToken) {
                setTokenFound(true)
                setFcmToken(currentToken)

                // Track the token -> client mapping, by sending to backend server
                // show on the UI that permission is secured
            } else {
                setTokenFound(false)
                setFcmToken()
                // shows on the UI that permission is required
            }
        })
        .catch((err) => {
            console.error(err)
            // catch error while creating client token
        })
}

export const onMessageListener = async () =>
    new Promise((resolve) =>
        (async () => {
            const messagingResolve = await messaging
            onMessage(messagingResolve, (payload) => {
                resolve(payload)
            })
        })()
    )
