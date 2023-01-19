<script setup lang="ts">
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const route = useRoute()
</script>

<template>
  <div class="page" :class="[`${route.name as string}`]">
    <div>
      <main class="main">
        <div class="default-slot-holder">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<style lang="scss"></style>
