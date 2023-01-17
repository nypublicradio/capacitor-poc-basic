// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            LIVESTREAM_URL: process.env['LIVESTREAM_URL'] || 'https://api.demo.nypr.digital/api/v4/whats_on/',
        }
    },
})
