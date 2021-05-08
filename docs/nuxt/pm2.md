# 使用 PM2 架設 nuxt 站台

**學習架設 nuxt 網站，其實就是架設 node.js 網站**。

:::tip nuxt 指令補充

- `nuxt build` - 除了最佳化，最主要的原因是原始碼無法直接在瀏覽器上執行，必須經過 `build` 指令做打包

- `nuxt start` - 運行打包後的程式碼

:::

## PM2

維基百科說明：

PM2 (Process Manager 2) 是開源的生產 Node.js 流程管理器，可幫助開發人員和 Devops 在 **生產環境中** 管理 Node.js 應用程序。與 Supervisord，Forever，Systemd 等其他流程管理器相比，PM2 的一些關鍵功能是 **自動應用程序負載平衡，聲明性應用程序配置，部署系統和監視**。

使用 PM2 的好處是，**重開機會自動重啟 node 程式**、**cpu 負載平衡的設定** (需設定)。

在使用 PM2 和 nuxt 應用程式架站時，需與 `nuxt-start` 套件做搭配。

## 指令整理

- pm2 start - 以專案下的 `ecosystem.config.js` 做啟動
- pm2 list - 查看目前有架多少站台
- pm2 delete 3 - 刪除 `id` 為 `3` 的站台
- pm2 delete all - 刪除所有站台
- pm2 reload all - 重新整理所有站台
- pm2 save - 儲存目前的 PM2 站台，重開機後會還原
- pm2 log - PM2 出錯時疑難排除

## 實際操作

1. 安裝 PM2 於全域 - `npm install pm2 -g`
1. 安裝 `nuxt-start` 套件於專案 - `npm install nuxt-start`
1. 使用 `pm2 init` 產生 `ecosystem.config.js` 檔案

   可以先使用下方的內容進行覆蓋：

   ```js
   module.exports = {
     apps: [
       {
         name: 'linche0859_nuxt',
         script: './node_modules/nuxt-start/bin/nuxt-start.js',
         instances: 'max', // 負載平衡模式下的 cpu 數量
         exec_mode: 'cluster', // cpu 負載平衡模式
         max_memory_restart: '1G', // 緩存了多少記憶體重新整理
         // port: 3001, // 預設伺服器上的 port，盡量高於 1024
         // 為了在使用 pm2 start 時可以正確取得 NODE_ENV 的值
         env_prod: {
           name: 'linche0859_nuxt_prod',
           PORT: 3001, //指定伺服器上的 port
           NODE_ENV: 'prod',
         },
         env_sit: {
           name: 'linche0859_nuxt_sit',
           PORT: 3002, //指定伺服器上的 port
           NODE_ENV: 'sit',
         },
       },
     ],
   };
   ```

1. `npm run build` 指令建置生產環境的程式碼
1. `pm2 start --env prod` 指令啟動 PM2 架站，`--env prod` 會取得 `ecosystem.config.js` 中的 `env_prod.NODE_ENV` 環境值，輸出內容為下方：

   ```bash
     ┌─────┬────────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
     │ id  │ name           │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
     ├─────┼────────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
     │ 0   │ nuxt-course    │ default     │ 2.15.2  │ cluster │ 7864     │ 2m     │ 0    │ online    │ 0%       │ 60.2mb   │ User     │ disabled │
     │ 1   │ nuxt-course    │ default     │ 2.15.2  │ cluster │ 11152    │ 2m     │ 0    │ online    │ 0%       │ 60.0mb   │ User     │ disabled │
     │ 2   │ nuxt-course    │ default     │ 2.15.2  │ cluster │ 13224    │ 2m     │ 0    │ online    │ 0%       │ 60.6mb   │ User     │ disabled │
     │ 3   │ nuxt-course    │ default     │ 2.15.2  │ cluster │ 13568    │ 2m     │ 0    │ online    │ 0%       │ 61.9mb   │ User     │ disabled │
     └─────┴────────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
   ```

   因為電腦 CPU 為四核心，會有四個負載平衡，其中要注意 `status` 的狀態是否為 `online`。

:::tip PM2 指令

- `pm2 list` - 查看目前 PM2 啟動的服務
- `pm2 delete all` - 刪除全部 PM2 啟動的服務

  結果會印出如下：

  ```bash
  [PM2] Applying action deleteProcessId on app [all](ids: [ 0, 1, 2, 3 ])
  [PM2] [nuxt-course](1) ✓
  [PM2] [nuxt-course](0) ✓
  [PM2] [nuxt-course](2) ✓
  [PM2] [nuxt-course](3) ✓
  ┌─────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
  │ id  │ name      │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
  └─────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
  ```

:::

## 使用 Git 在 linux 佈署網站

1. gitlab clone 專案
1. cd 到專案
1. npm install
1. npm run build
1. pm2 start

如果有檔案需要更新，步驟為：

1. git pull
1. npm install
1. npm run build
1. pm2 reload id
