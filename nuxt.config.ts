import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: [
      '~/assets/css/main.css'
  ],
  modules: [
    'shadcn-nuxt',
    '@nuxt/eslint',
    '@nuxtjs/supabase',
    '@nuxt/icon',
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  eslint: {
    config: {
      stylistic: true
    }
  },


  supabase: {
    url: process.env.NUXT_SUPABASE_URL,
    key: process.env.NUXT_SUPABASE_KEY,
    redirect: false
  },

  runtimeConfig: {
    supabaseKey: process.env.NUXT_SUPABASE_KEY,
    supabaseUrl: process.env.NUXT_SUPABASE_URL,
    public: {
      supabaseUrl: process.env.NUXT_SUPABASE_URL
    }
  }
})