<script setup lang="ts">
import { updateLiveStream } from '~~/composables/data/liveStream'
import { useRuntimeConfig } from '#app'
import { useCurrentSteamStation } from '~/composables/states'

const currentSteamStation = useCurrentSteamStation()
const config = useRuntimeConfig()
const route = useRoute()

// load the life stream
onBeforeMount(() => {
  updateLiveStream(currentSteamStation.value)
})
</script>

<template>
  <div class="page" :class="[`${route.name as string}`]">
    <div>
      <ListenLiveButton class="hidden md:block" :slug="currentSteamStation" />
      <main class="main">
        <div class="default-slot-holder">
          <slot />
        </div>
      </main>
      <audio-player />
    </div>
  </div>
</template>

<style lang="scss"></style>
