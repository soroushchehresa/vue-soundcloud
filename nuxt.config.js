module.exports = {
  mode: 'universal',
  head: {
    title: process.env.npm_package_name || 'VUE SOUNDCLOUD',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  loading: { color: '#fff' },
  css: [
    'element-ui/lib/theme-chalk/index.css',
  ],
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/font-awesome',
  ],
  buildModules: [],
  modules: [],
  build: {
    transpile: [/^element-ui/],
    extend(config, ctx) {
    },
  },
  buildDir: 'dist',
};
