<script setup>
//import { ref, computed, onMounted } from "vue";
import { updateLiveStream } from '~~/composables/data/liveStream'
import { useCurrentSteamStation } from '~/composables/states'

const currentSteamStation = useCurrentSteamStation()

const props = defineProps({
  //   propVar: {
  //     type: Boolean,
  //     default: false,
  //   },
})

//const emit = defineEmits(["change", "click"]);
// load the life stream
onBeforeMount(() => {
  updateLiveStream(currentSteamStation.value)
})
</script>

<template>
  <div>
    <div class="comp-name">
      <p>Home Page</p>
      <ListenLiveButton class="hidden md:block" :slug="currentSteamStation" />
      <p>hello</p>
      <audio-player />
    </div>
  </div>
</template>

<style lang="scss">
.comp-name {
}
</style>
