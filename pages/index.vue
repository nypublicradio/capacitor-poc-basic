<script setup lang="ts">
import { useCurrentSteamStation } from '~/composables/states'
import ListenLiveButton from '~/components/ListenLiveButton.vue'

const currentSteamStation = useCurrentSteamStation()
</script>

<template>
  <div class="comp-name px-3">
    <ListenLiveButton class="mt-4" :slug="currentSteamStation" />
    <br />
    <nuxt-link to="/notification-page"> go to notification-page </nuxt-link>
  </div>
</template>

<style lang="scss">
.comp-name {
}
</style>
