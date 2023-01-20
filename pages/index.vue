<script setup>
import { ref, computed, onMounted } from 'vue'
import { updateLiveStream } from '../composables/data/liveStream'
import { useCurrentSteamStation } from '../composables/states'
import ListenLiveButton from '../components/ListenLiveButton.vue'
import AudioPlayer from '../components/AudioPlayer.vue'
import testComp from '../components/testComp.vue'

const currentSteamStation = useCurrentSteamStation()

const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
  updateLiveStream(currentSteamStation.value)
})
</script>

<template>
  <div>
    <div class="comp-name">
      <p>Home Page UPDATED 11</p>
      <ListenLiveButton class="hidden md:block" :slug="currentSteamStation" />
      <p>hello</p>
      <test-comp />
      <p v-if="isMounted">MOUNTED</p>
      <audio-player />
    </div>
  </div>
</template>

<style lang="scss">
.comp-name {
}
</style>
