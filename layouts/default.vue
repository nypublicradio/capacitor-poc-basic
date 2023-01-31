<script setup lang="ts">
import { App, URLOpenListenerEvent } from '@capacitor/app'
import { PushNotifications } from '@capacitor/push-notifications'
import { useCurrentSteamStation } from '~/composables/states'
import { updateLiveStream } from '~/composables/data/liveStream'

import { Capacitor } from '@capacitor/core'

const currentSteamStation = useCurrentSteamStation()

const router = useRouter()

const fcmToken = ref('')
const nUrl = ref(null)
const nError = ref(null)
const nNotification = ref(null)
const nActionId = ref(null)
const nInputValue = ref(null)
const getNotificationList = ref(null)
const routeSlugEvent = ref('')

const addListeners = async () => {
  await PushNotifications.addListener('registration', (token: any) => {
    fcmToken.value = token.value
    console.info('Registration token: ', token.value)
  })

  await PushNotifications.addListener('registrationError', (err: any) => {
    nError.value = err
    console.error('Registration error: ', err.error)
  })

  await PushNotifications.addListener(
    'pushNotificationReceived',
    (notification: any) => {
      nNotification.value = notification.data.slug
      //router.push({ path: `/${notification.data.slug}` })
      console.log('Push notification received: ', notification)
    }
  )

  await PushNotifications.addListener(
    'pushNotificationActionPerformed',
    (notification: any) => {
      nActionId.value = notification.actionId
      nInputValue.value = notification.inputValue
      console.log(
        'Push notification action performed',
        notification.actionId,
        notification.inputValue
      )
      if (notification.actionId === 'tap' && nNotification.value !== null) {
        router.push(`/${nNotification.value}`)
        //navigateTo(nNotification.value.slug)
      }
    }
  )
  await App.addListener('appUrlOpen', function (event: URLOpenListenerEvent) {
    // Example url: https://beerswift.app/tabs/tabs2
    // slug = /tabs/tabs2
    const slug = event.url.split('.app').pop()
    routeSlugEvent.value = event.url
    // We only push to the route if there is a slug present
    if (slug) {
      router.push({ path: slug })
    }
  })
}

const registerNotifications = async () => {
  let permStatus = await PushNotifications.checkPermissions()

  if (permStatus.receive === 'prompt') {
    permStatus = await PushNotifications.requestPermissions()
  }

  if (permStatus.receive !== 'granted') {
    throw new Error('User denied permissions!')
  }

  await PushNotifications.register()
}

const getDeliveredNotifications = async () => {
  const notificationList = await PushNotifications.getDeliveredNotifications()
  getNotificationList.value = notificationList
  console.log('delivered notifications', notificationList)
}

onBeforeMount(() => {
  updateLiveStream(currentSteamStation.value)
  if (Capacitor.getPlatform() !== 'web') {
    registerNotifications()
    addListeners()
    getDeliveredNotifications()
  }
})
</script>

<template>
  <div class="page">
    <div>
      <main class="main">
        <p>TEMPLATE HEADER</p>
        <p>fcm token =</p>
        <input :value="fcmToken" />
        <pre></pre>
        <p>url = {{ nUrl }}</p>
        <p>routeSlugEvent = {{ routeSlugEvent }}</p>
        <p>Notification = {{ nNotification }}</p>
        <p>nActionId = {{ nActionId }}</p>
        <p>nInputValue = {{ nInputValue }}</p>
        <p>nError = {{ nError }}</p>
        <p>notificationList = {{ getNotificationList }}</p>
        <h4>Capacitor's JavaScript API</h4>
        <h6>Platform (web | ios | android) = {{ Capacitor.getPlatform() }}</h6>
        <h6>isNativePlatform = {{ Capacitor.isNativePlatform() }}</h6>
        <h6>
          isPluginAvailable('Camera') =
          {{ Capacitor.isPluginAvailable('Camera') }}
        </h6>
        <div class="default-slot-holder">
          <slot />
        </div>
        <p>TEMPLATE FOOTER</p>
        <audio-player />
      </main>
    </div>
  </div>
</template>

<style lang="scss"></style>
