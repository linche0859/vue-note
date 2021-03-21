const path = require('path');

module.exports = {
  title: 'Vue 筆記',
  markdown: {
    config: (md) => {
      md.use(require('markdown-it-tetris'));
    },
  },
  base: '/vue-note/',
  // Extra tags to inject into the page HTML <head>
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  module: {
    rules: [
      // 參考 sass-loader 文件
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@image': '/images',
        '@styles': path.resolve(__dirname, './styles'),
      },
    },
  },
  chainWebpack(config) {
    config.resolve.alias.set('vue', 'vue/dist/vue.common.js');
  },
  markdown: {
    lineNumbers: true, // 代碼塊顯示行號
  },
  themeConfig: {
    // sidebarDepth: 1, // 將同時提取markdown中 h2 和 h3 標題，顯示在側邊欄上
    lastUpdated: 'Last Updated', // 文檔更新時間：每個文件 git 最後提交的時間
    // 顯示所有頁面的標題鏈接
    // displayAllHeaders: true,
    // 導航欄配置
    nav: [
      // { text: '內部連結', link: '/algorithm/' }, // 內部鏈接 以docs為根目錄
      { text: 'GitHub', link: 'https://github.com/linche0859/vue-note' }, // 外部鏈接
    ],
    // 側邊欄配置
    sidebar: [
      {
        title: '基礎入門',
        // collapsable: false,
        children: [
          '/basic/instance',
          '/basic/event',
          '/basic/condition',
          '/basic/dynamic-command',
          '/basic/life-cycle',
        ],
      },
      {
        title: '全局 API',
        children: ['/api/filter', '/api/observable'],
      },
      {
        title: '實例方法',
        children: ['/methods/watch', '/methods/option'],
      },
      {
        title: '組件系統',
        children: [
          '/component/feature',
          '/component/props',
          '/component/eventbus',
          '/component/is',
          '/component/slot',
          '/component/transition',
          '/component/global',
          '/component/import-require',
          '/component/loader',
          '/component/jsx',
          '/component/inject',
          '/component/hoc',
        ],
      },
      {
        title: 'Vue Router',
        children: [
          '/router/basic',
          '/router/guide',
          '/router/lifecycle',
          '/router/encapsulation',
        ],
      },
      {
        title: 'Vuex',
        children: [
          '/vuex/basic',
          '/vuex/module',
          '/vuex/design',
          '/vuex/encapsulation',
          '/vuex/plugin',
        ],
      },
      {
        title: 'Plugin',
        children: [
          '/plugin/lint',
          '/plugin/axios-basic',
          '/plugin/axios-encapsulation',
        ],
      },
      {
        title: '進階',
        children: ['/advanced/response'],
      },
      {
        title: '範例應用',
        children: [
          '/example/restful',
          '/example/temperature',
          '/example/todoList',
        ],
      },
      {
        title: 'NUXT',
        children: ['/nuxt/pm2', '/nuxt/serverMiddleware', '/nuxt/lifecycle'],
      },
    ],
  },
};
