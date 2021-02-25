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

## 實際操作

1. 安裝 PM2 於全域 - `npm install pm2 -g`
1. 安裝 `nuxt-start` 套件於專案 - `npm install nuxt-start`
1. 使用 `pm2 init` 產生 `ecosystem.config.js` 檔案

   可以先使用下方的內容進行覆蓋：

   ```js
   module.exports = {
     apps: [
       {
         name: 'wayne1894_nuxt',
         script: './node_modules/nuxt-start/bin/nuxt-start.js',
         instances: 'max', // 負載平衡模式下的 cpu 數量
         exec_mode: 'cluster', // cpu 負載平衡模式
         max_memory_restart: '1G', // 緩存了多少記憶體重新整理
         port: 3001, // 指定伺服器上的 port，盡量高於 1024
       },
     ],
   };
   ```

1. `npm run build` 指令建置生產環境的程式碼
1. `pm2 start` 指令啟動 PM2 架站，會看到下方的輸出內容：

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
