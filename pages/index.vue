<script setup>
import { ref, onMounted } from 'vue'
import { useCurrentSteamStation } from '~/composables/states'
import { updateLiveStream } from '~/composables/data/liveStream'
import ListenLiveButton from '~/components/ListenLiveButton.vue'

const currentSteamStation = useCurrentSteamStation()

onMounted(() => {
  console.log('index onMounted')
  updateLiveStream(currentSteamStation.value)
})
</script>

<template>
  <div>
    <div class="comp-name">
      <ListenLiveButton class="mt-4 px-3" :slug="currentSteamStation" />
      <audio-player />
    </div>
  </div>
</template>

<style lang="scss">
.comp-name {
}
</style>
