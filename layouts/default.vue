<script setup>
import { ref, onMounted } from 'vue'
//import { updateLiveStream } from '~/composables/data/liveStream'
import { useRuntimeConfig } from '#app'
import { useCurrentSteamStation } from '~/composables/states'
const currentSteamStation = useCurrentSteamStation()

const config = useRuntimeConfig()
const route = useRoute()

// load the life stream
onMounted(() => {
  console.log('template onMounted')
  //updateLiveStream(currentSteamStation.value)
})
</script>

<template>
  <div class="page">
    <div>
      <main class="main">
        <p>TEMPLATE HEADER</p>
        <div class="default-slot-holder">
          <slot />
        </div>
        <p>TEMPLATE FOOTER</p>
      </main>
      <!-- <audio-player /> -->
    </div>
  </div>
</template>

<style lang="scss"></style>
