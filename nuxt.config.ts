// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/ionic'],
    css: [
        '@nypublicradio/nypr-design-system-vue3/src/assets/themes/gothamist/fonts/fonts.css',
        '@nypublicradio/nypr-design-system-vue3/src/assets/themes/gothamist/gothamist.min.css',
        'primevue/resources/primevue.min.css',
        'primeicons/primeicons.css',
    ],
    ssr: false,
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    // besure to mirror theses imports in the vitest.config.ts
                    additionalData: `@import "@nypublicradio/nypr-design-system-vue3/src/assets/themes/gothamist/breakpoints.scss"; @import "@nypublicradio/nypr-design-system-vue3/src/assets/themes/gothamist/_mixins.scss"; @import "@nypublicradio/nypr-design-system-vue3/src/assets/themes/gothamist/typography.scss"; @import "~/assets/scss/global.scss";`,
                },
            },
            postcss: {
                plugins: [
                    {
                        postcssPlugin: 'internal:charset-removal',
                        AtRule: {
                            charset: (atRule) => {
                                if (atRule.name === 'charset') {
                                    atRule.remove();
                                }
                            }
                        }
                    }
                ]
            }
        },
    },
    build: {
        transpile: [
            'primevue',
            'gsap'
        ]
    },
    runtimeConfig: {
        public: {
            LIVESTREAM_URL: process.env['LIVESTREAM_URL'] || 'https://api.demo.nypr.digital/api/v4/whats_on/',
        }
    },
})
