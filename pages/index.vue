<script setup>
import { ref, onMounted } from 'vue'
import { useCurrentSteamStation } from '~/composables/states'
import { updateLiveStream } from '~/composables/data/liveStream'
import ListenLiveButton from '~/components/ListenLiveButton.vue'

const currentSteamStation = useCurrentSteamStation()

const isMounted = ref(false)

onMounted(() => {
  console.log('index onMounted')
  isMounted.value = true
  updateLiveStream(currentSteamStation.value)
})
</script>

<template>
  <div>
    <div class="comp-name">
      <!-- <p>Home Page UPDATED 12</p> -->
      <ListenLiveButton class="mt-4 px-3" :slug="currentSteamStation" />
      <!-- <p v-if="isMounted">MOUNTED</p> -->
      <audio-player />
    </div>
  </div>
</template>

<style lang="scss">
.comp-name {
}
</style>
