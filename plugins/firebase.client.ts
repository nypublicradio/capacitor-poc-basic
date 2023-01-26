import { initializeApp } from 'firebase/app'
//import { getAuth } from "firebase/auth"
//import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics"

export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig()

    const firebaseConfig = {
        apiKey: '47691cf1423b8b56deb7ba017cd32801ee80c767',
        //authDomain: config.FB_AUTH_DOMAIN,
        projectId: 'wnyc-stream',
        messagingSenderId: '1074821598707',
        appId: '1:1074821598707:android:b91ffa645a106e33c65686',
        //measurementId: config.FB_MEASUREMENT_ID
    };

    const app = initializeApp(firebaseConfig)

    const analytics = getAnalytics(app)
    // const auth = getAuth(app)
    //const firestore = getFirestore(app)

    //nuxtApp.vueApp.provide('auth', auth)
    //nuxtApp.provide('auth', auth)

    //nuxtApp.vueApp.provide('firestore', firestore)
    //nuxtApp.provide('firestore', firestore)
})