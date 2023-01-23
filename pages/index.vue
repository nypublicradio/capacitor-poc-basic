<script setup>
import { onMounted } from 'vue'
import { useCurrentSteamStation } from '~/composables/states'
import { updateLiveStream } from '~/composables/data/liveStream'
import ListenLiveButton from '~/components/ListenLiveButton.vue'

import { Capacitor } from '@capacitor/core'

const currentSteamStation = useCurrentSteamStation()

onMounted(() => {
  console.log('index onMounted')
  updateLiveStream(currentSteamStation.value)
})
</script>

<template>
  <div>
    <div class="comp-name px-3">
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
