# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


## Learned Instruction for Ionic/Capacitor module for Nuxt 3
First, follow the [instructions here](https://ionic.nuxtjs.org/getting-started#config) to get everything installed. BUT, do not remove the `App.vue` and replace everything inside of it with the follwoing:

```html
<script setup>
import { IonApp, IonRouterOutlet } from '@ionic/vue'
</script>
<template>
  <ion-app>
    <NuxtLayout>
      <ion-router-outlet class="relative" />
    </NuxtLayout>
  </ion-app>
</template>

```
`class="relative"` can be replaced with `style="position: relative"` 

## Update capacitor.config.json
Update the `capacitor.config.json` file to include the following:

```json
{
  "appId": "com.nypr.YOURAPPNAME",
  "appName": "YOURAPPNAME",
  "webDir": ".output/public",
  "bundledWebRuntime": false,
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 0
    }
  }
}
```
Additional plugins documention can be found [here](https://capacitorjs.com/docs/plugins)

Additional SplashScreen documentation can be found [here](https://capacitorjs.com/docs/apis/splash-screen)

## Generating Icons and Splash Screens
In the root of the `public` folder, add the following files: `logo.png`, `icon.png` and `splash.png`. 

install this package:
```bash
npm install @capacitor/assets
````

add this file to the `assets` folder: `copyToPlatforms.js`

```js
const fs = require('fs')

const images = ['logo.png', 'splash.png']
images.forEach((image) => {
    console.log('Copying images to platforms...', image)
    fs.copyFile(`./public/${image}`, `./assets/${image}`, (err) => {
        if (err) throw err
        console.log(`${image} was copied to assets/`)
    })
})
```

add the following to the `package.json` file:

```json
"scripts": {
    "update-resources": "node resources/copyToPlatforms.js && npx capacitor-assets generate"
  }
```

Then, to generate all the icons and splash screens for all platforms run the following command:
```bash
npm run update-resources
```
This will create a folder on the root called `icons`

## Build for Android
```bash
npm run gererate
npx cap sync
npx cap open android 
```
`npx cap open android ` will open Android Studio. From there, you can build the app and run it on an emulator or device.
To build the debug APK file in Android Studio, go to `Build > Build Bundle(s)/APK(s) > Build APK(s)` and follow the instructions.
To build the production installer APK file in Android Studio, go to `Build > Generate Signed Bundle...` and follow the instructions.

To install the debug APK file on a device, go to `Run > Run 'app'` and follow the instructions.

## Build for iOS
```bash
npm run gererate
npx cap sync
npx cap open ios 
```
`npx cap open ios ` will open Xcode. From there, you can build the app and run it on an emulator or device.
