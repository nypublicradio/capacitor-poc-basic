<script setup lang="ts">
import { ref } from 'vue'
import {
  useIsEpisodePlaying,
  useTogglePlayTrigger,
  useCurrentEpisode,
  useCurrentEpisodeHolder,
} from '../composables/states'

const isEpisodePlaying = useIsEpisodePlaying()
const togglePlayTrigger = useTogglePlayTrigger()
const currentEpisode = useCurrentEpisode()
const currentEpisodeHolder = useCurrentEpisodeHolder()

const togglePlay = () => {
  if (!currentEpisode.value) {
    currentEpisode.value = currentEpisodeHolder.value
  }
  togglePlayTrigger.value = !togglePlayTrigger.value
}
const flag = ref(false)

const togglePlay2 = () => {
  flag.value = !flag.value
}
</script>

<template>
  <div class="listen-live-button">
    <p @click="currentEpisodeHolder ? togglePlay() : null">
      PLAY STREAM - BUTTON
    </p>
    <p @click="togglePlay2()">PLAY STREAM -TEST</p>
    <h1 v-if="flag">yay</h1>
  </div>
</template>

<style lang="scss">
.listen-live-button {
}
</style>
