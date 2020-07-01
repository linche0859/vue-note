module.exports = {
  title: 'Vue 筆記',
  markdown: {
    config: (md) => {
      md.use(require('markdown-it-tetris'));
    },
  },
  base: '/VuePress/',
  // Extra tags to inject into the page HTML <head>
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  configureWebpack: {
    resolve: {
      alias: {
        '@image': '/images',
      },
    },
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
      { text: 'GitHub', link: 'https://github.com/linche0859/VuePress' }, // 外部鏈接
    ],
    // 側邊欄配置
    sidebar: [
      {
        title: '基礎入門',
        children: ['/basic/instance'],
      },
      {
        title: 'Methods',
        children: ['/Methods/watch'],
      },
      {
        title: 'Component',
        // collapsable: false,
        path: '/Component/',
        children: [
          '/Component/props',
          '/Component/is',
          '/Component/option',
          '/Component/global',
        ],
      },
      {
        title: 'EventBus',
        path: '/EventBus/',
        children: [],
      },
      {
        title: 'Vue Router',
        path: '/Router/',
        children: [
          '/Router/guide',
          '/Router/lifecycle',
          '/Router/encapsulation',
        ],
      },
      {
        title: 'Vuex',
        path: '/Vuex/',
        children: [
          '/Vuex/module',
          '/Vuex/design',
          '/Vuex/encapsulation',
          '/Vuex/plugin',
        ],
      },
      {
        title: 'Axios',
        path: '/Axios/',
        children: ['/Axios/encapsulation'],
      },
      {
        title: '範例應用',
        children: [
          '/Example/restful',
          '/Example/temperature',
          '/Example/todoList',
        ],
      },
      {
        title: 'Plugin',
        children: ['/Plugin/eslint'],
      },
      {
        title: '進階',
        children: ['/Advanced/response'],
      },
    ],
  },
};
