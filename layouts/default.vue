<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(
    'WHY IS THIS NOT MOUNTING AND NOTHING IN THIS TEMPLATE RENDERING?!?!?'
  )
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
    </div>
  </div>
</template>

<style lang="scss"></style>
