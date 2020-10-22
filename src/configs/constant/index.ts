import zhCN from 'ant-design-vue/es/locale/zh_CN';
import enUS from 'ant-design-vue/es/locale/en_US';
import { Locale } from 'ant-design-vue/types/locale-provider';

export interface AppLocale {
  antLocale: Locale;
  code: 'zh' | 'en';
  name: string;
}

export const locales: Array<AppLocale> = [
  { antLocale: zhCN, code: 'zh', name: '中文' },
  { antLocale: enUS, code: 'en', name: 'English' }
];

export default {
  OAUTH2_AUTHORIZATION_HEADER: 'Authorization',
  STORAGE_OAUTH2_TOKEN_INFO: 'oauth2TokenInfo',
  STORAGE_OAUTH2_ACCESS_TOKEN: 'oauth2AccessToken',
  STORAGE_USER: 'user',
  STORAGE_SETTINGS: 'settings',
  STORAGE_SETTINGS_COLOR: 'color',
  STORAGE_SETTINGS_THEME: 'theme',
  STORAGE_SETTINGS_MENU_STYLE: 'menuStyle',
  STORAGE_SETTINGS_PRIMARY_COLOR: 'primaryColor',
  STORAGE_SETTINGS_TABLE_SIZE: 'tableSize',

  PAGE_LOGIN: 'login',
  PAGE_403: '403',
  PAGE_500: '500',

  DEFAULT_LOCALE_KEY: 'zh'
};
