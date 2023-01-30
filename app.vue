<script setup>
import { IonApp, IonRouterOutlet, IonPage } from '@ionic/vue'
</script>
<template>
  <ion-app>
    <NuxtLayout>
      <ion-router-outlet class="relative">
        <ion-page>
          <ion-content>
            <Nuxt />
          </ion-content>
        </ion-page>
      </ion-router-outlet>
    </NuxtLayout>
  </ion-app>
</template>
