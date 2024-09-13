# mini-starter

## 介绍
一款专为微信小程序打造的开发模板

## 项目结构

```
├── src
│   ├── components # 公共组件
│   │   ├── HiCounter.vue
│   │   └── InputEntry.vue
│   ├── composables # 公共组合式 API
│   │   ├── useCount.ts
│   │   └── useQuery.ts
│   ├── pages # 页面
│   │   ├── hi.vue
│   │   └── index.vue
│   ├── static # 静态文件
│   │   ├── logo.svg
│   │   └── vite.png
│   ├── App.vue
│   ├── auto-imports.d.ts # 自动生成的类型引用文件（请勿手动修改）
│   ├── env.d.ts
│   ├── main.ts
│   ├── manifest.json # 自动生成的应用的配置文件（请勿手动修改）
│   ├── pages.json # 页面路由配置
│   └── shims.d.ts
├── README.md # 项目说明文档
├── eslint.config.mjs # eslint 配置文件
├── index.html
├── manifest.config.ts # 应用的配置文件
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── uno.config.ts # UnoCSS 配置文件
└── vite.config.ts
```

> Tips: 生成如上的树结构 `npx tree-node-cli --dirs-first -I "node_modules|dist"`
## 准备

### 1. 填写小程序 AppId
```
// manifest.config.ts
export default defineManifestConfig({
  'name': 'mini',
  'appid': '',
  'description': '',
  'versionName': '0.1.0',
  'versionCode': '100',
  'transformPx': false,
  /* 小程序特有相关 */
  'mp-weixin': {
    appid: '在这里填写你的小程序 AppId',
    setting: {
      urlCheck: false,
    },
    usingComponents: true,
  },
  'uniStatistics': {
    enable: false,
  },
  'vueVersion': '3',
})
```

```
// .minicirc
{
  "weixin": {
    "appid": "在这里填写你的小程序 AppId",
    "privateKeyPath": "密钥文件相对项目根目录的相对路径，例如 key/private.appid.key",
    "projectPath": "dist/build/mp-weixin"
  },
  "version": "0.1.1",
  "desc": "版本描述"
}

```

## 快速上手

### 1. 安装
```
pnpm i
```

### 2. 运行
```
pnpm dev
```

- 2.1 打开微信开发者工具
- 2.2 选择【导入】-> `dist/dev/mp-weixin`
- 2.3 勾选【不使用云服务】
- 2.4 稍作等待，即可看到页面

### 3. 打包并上传

更新 `.minicirc` 版本号及描述后执行：
```
pnpm upload
```

## 注意

1. 不要直接手动修改 `manifest.json` 文件，而是修改 `manifest.config.ts` 文件，再次运行后将会自动同步更新 `manifest.json` 文件
