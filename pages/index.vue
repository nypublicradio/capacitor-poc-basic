<script setup>
import { onMounted } from 'vue'
import { useCurrentSteamStation } from '~/composables/states'
import { updateLiveStream } from '~/composables/data/liveStream'
import ListenLiveButton from '~/components/ListenLiveButton.vue'

import { PushNotifications } from '@capacitor/push-notifications'
import { Capacitor } from '@capacitor/core'

const currentSteamStation = useCurrentSteamStation()

const fcmToken = ref('')
const getNotificationList = ref(null)

const addListeners = async () => {
  await PushNotifications.addListener('registration', (token) => {
    fcmToken.value = token.value
    console.info('Registration token: ', token.value)
  })

  await PushNotifications.addListener('registrationError', (err) => {
    console.error('Registration error: ', err.error)
  })

  await PushNotifications.addListener(
    'pushNotificationReceived',
    (notification) => {
      console.log('Push notification received: ', notification)
    }
  )

  await PushNotifications.addListener(
    'pushNotificationActionPerformed',
    (notification) => {
      console.log(
        'Push notification action performed',
        notification.actionId,
        notification.inputValue
      )
    }
  )
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
</script>

<template>
  <div>
    <div class="comp-name px-3">
      <p>fcm token =</p>
      <input :value="fcmToken" />
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
    </div>
  </div>
</template>

<style lang="scss">
.comp-name {
}
</style>
