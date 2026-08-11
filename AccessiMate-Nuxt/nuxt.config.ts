// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      title: 'AccessiGov — National Accessible E-Services & Citizen Portal',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/primeicons@6.0.0/primeicons.css' }
      ],
      script: [
        {
          type: 'module',
          src: 'https://dev-script.accessimate.com/js/main.js',
          'data-account': 'yUkg0nklTJ3PsHOUOqUsT3HQw1bmfAWq0E1lCcWJ'
        }
      ]
    }
  }
})
