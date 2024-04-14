importScripts(
    'https://www.gstatic.com/firebasejs/9.13.0/firebase-app-compat.js'
)
importScripts(
    'https://www.gstatic.com/firebasejs/9.13.0/firebase-messaging-compat.js'
)
firebase?.initializeApp({
  apiKey: "AIzaSyAeliEuUDxVV3-nkO-Ell9fFcifr9jtQtU",
  authDomain: "pede-logo-99040.firebaseapp.com",
  projectId: "pede-logo-99040",
  storageBucket: "pede-logo-99040.appspot.com",
  messagingSenderId: "1025418518982",
  appId: "1:1025418518982:web:2eab5b475f43da9ea752c7",
  measurementId: "G-8WE2X7HPC2",
})

// Retrieve firebase messaging
const messaging = firebase?.messaging()

messaging.onBackgroundMessage(function (payload) {
    const notificationTitle = payload.notification.title
    const notificationOptions = {
        body: payload.notification.body,
    }

    self.registration.showNotification(notificationTitle, notificationOptions)
})
