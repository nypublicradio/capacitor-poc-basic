<script setup>
import { onMounted } from 'vue'
import { useCurrentSteamStation } from '~/composables/states'
import { updateLiveStream } from '~/composables/data/liveStream'
import ListenLiveButton from '~/components/ListenLiveButton.vue'

import { PushNotifications } from '@capacitor/push-notifications'
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

const addListeners = async () => {
  await PushNotifications.addListener('registration', (token) => {
    fcmToken.value = token.value
    console.info('Registration token: ', token.value)
  })

  await PushNotifications.addListener('registrationError', (err) => {
    nError.value = err
    console.error('Registration error: ', err.error)
  })

  await PushNotifications.addListener(
    'pushNotificationReceived',
    (notification) => {
      nNotification.value = notification
      console.log('Push notification received: ', notification)
    }
  )

  await PushNotifications.addListener(
    'pushNotificationActionPerformed',
    (notification) => {
      nActionId.value = notification.actionId
      nInputValue.value = notification.inputValue
      console.log(
        'Push notification action performed',
        notification.actionId,
        notification.inputValue
      )
      if (notification.actionId === tap) {
        router.push(nNotification.value.slug)
        //navigateTo(nNotification.value.slug)
      }
    }
  )
  await PushNotifications.addListener('appUrlOpen', function (event) {
    nUrl.value = event
    // Example url: https://beerswift.app/tabs/tabs2
    // slug = /tabs/tabs2
    const slug = event.url.split('.app').pop()

    // We only push to the route if there is a slug present
    if (slug) {
      router.push({
        path: slug,
      })
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

onMounted(() => {
  updateLiveStream(currentSteamStation.value)
  registerNotifications()
  addListeners()
  getDeliveredNotifications()
})
const gotoPage = (page) => {
  router.push(page)
}
</script>

<template>
  <div>
    <div class="comp-name px-3">
      <p>fcm token =</p>
      <input :value="fcmToken" />
      <p>url = {{ nUrl }}</p>
      <p>Notification = {{ nNotification }}</p>
      <p>nActionId = {{ nActionId }}</p>
      <p>nInputValue = {{ nInputValue }}</p>
      <p>nError = {{ nError }}</p>
      <p>notificationList = {{ notificationList }}</p>
      <ListenLiveButton class="mt-4" :slug="currentSteamStation" />
      <audio-player />
      <h4>Capacitor's JavaScript API</h4>
      <h6>Platform (web | ios | android) = {{ Capacitor.getPlatform() }}</h6>
      <h6>isNativePlatform = {{ Capacitor.isNativePlatform() }}</h6>
      <h6>
        isPluginAvailable('Camera') =
        {{ Capacitor.isPluginAvailable('Camera') }}
      </h6>
      <a href="/notification-page">go to notification-page</a>
      <button @click="gotoPage('notification-page')">
        go to notification-page
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.comp-name {
}
</style>
