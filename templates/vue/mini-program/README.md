# mini-starter

## 介绍
一款专为微信小程序打造的开发模板

## 准备

### 1. 填写小程序 AppId
```
// manifest.config.ts
export default defineManifestConfig({
  'name': 'mini',
  'appid': '你的小程序 AppId',
  'description': '',
  // ...其他配置
})
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

### 3. 打包上传
```
pnpm build
```

## 注意

1. 不要直接手动修改 `manifest.json` 文件，而是修改 `manifest.config.ts` 文件，再次运行后将会自动同步更新 `manifest.json` 文件
