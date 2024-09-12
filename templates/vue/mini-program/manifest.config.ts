import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'

export default defineManifestConfig({
  'name': 'mini',
  'appid': '',
  'description': '',
  'versionName': '0.1.0',
  'versionCode': '100',
  'transformPx': false,
  /* 小程序特有相关 */
  'mp-weixin': {
    appid: '',
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
