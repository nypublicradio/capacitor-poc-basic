import { initializeApp } from 'firebase/app'

export default defineNuxtPlugin(nuxtApp => {
    const config = useRuntimeConfig()

    const firebaseConfig = {
        apiKey: '47691cf1423b8b56deb7ba017cd32801ee80c767',
        projectId: 'wnyc-stream',
        messagingSenderId: '1074821598707',
        appId: '1:1074821598707:android:b91ffa645a106e33c65686',
    };

    const app = initializeApp(firebaseConfig)
})