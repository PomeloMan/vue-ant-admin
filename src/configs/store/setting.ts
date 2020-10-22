import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';
import { RootState } from '.';
import CONSTANT from '../constant';
import { storage } from '../storage';
import menuSideDark from '@/assets/images/menu_side_dark.svg';
import menuSideLight from '@/assets/images/menu_side_light.svg';

const menuStyles: Array<SettingOption> = [
  {
    label: 'settings.menu_styles.sider_dark',
    value: 'sider-dark',
    url: menuSideDark
  },
  {
    label: 'settings.menu_styles.sider_light',
    value: 'sider-light',
    url: menuSideLight
  }
];

const primaryColors: Array<SettingOption> = [
  { label: 'settings.primary_colors.red', value: '#f5222d' },
  { label: 'settings.primary_colors.volcano', value: '#fa541c' },
  { label: 'settings.primary_colors.orange', value: '#fa8c16' },
  { label: 'settings.primary_colors.gold', value: '#faad14' },
  { label: 'settings.primary_colors.yellow', value: '#fadb14' },
  { label: 'settings.primary_colors.lime', value: '#a0d911' },
  { label: 'settings.primary_colors.green', value: '#52c41a' },
  { label: 'settings.primary_colors.cyan', value: '#13c2c2' },
  { label: 'settings.primary_colors.blue', value: '#1890ff' },
  { label: 'settings.primary_colors.geek_blue', value: '#2f54eb' },
  { label: 'settings.primary_colors.purple', value: '#722ed1' },
  { label: 'settings.primary_colors.magenta', value: '#eb2f96' }
];

export interface SettingOption {
  label: string;
  value: string;
  url?: string;
}

export interface SettingState {
  menuStyles: Array<SettingOption>;
  primaryColors: Array<SettingOption>;
  tableSizes: Array<string>;
  menuStyle: 'sider-dark' | 'sider-light';
  primaryColor: string;
  tableSize: 'large' | 'middle' | 'small';
  theme: string;
}

const state: SettingState = {
  menuStyles,
  primaryColors,
  tableSizes: ['large', 'middle', 'small'],
  menuStyle: 'sider-dark',
  primaryColor: '#1890ff',
  tableSize: 'middle',
  theme:
    storage.getModuleItem(
      CONSTANT.STORAGE_SETTINGS,
      CONSTANT.STORAGE_SETTINGS_THEME
    ) || 'light'
};

const mutations: MutationTree<SettingState> = {
  updateMenuStyle(state: any, menuStyle: 'sider-dark' | 'sider-light') {
    state.menuStyle = menuStyle;
    storage.setModuleItem(
      CONSTANT.STORAGE_SETTINGS,
      CONSTANT.STORAGE_SETTINGS_MENU_STYLE,
      menuStyle
    );
  },
  updatePrimaryColor(state: any, primaryColor: string) {
    state.primaryColor = primaryColor;
    storage.setModuleItem(
      CONSTANT.STORAGE_SETTINGS,
      CONSTANT.STORAGE_SETTINGS_PRIMARY_COLOR,
      primaryColor
    );
  },
  updateTableSize(state: any, tableSize: string) {
    state.tableSize = tableSize;
    storage.setModuleItem(
      CONSTANT.STORAGE_SETTINGS,
      CONSTANT.STORAGE_SETTINGS_TABLE_SIZE,
      tableSize
    );
  },
  updateTheme(state: any, theme: string) {
    state.theme = theme;
    storage.setModuleItem(
      CONSTANT.STORAGE_SETTINGS,
      CONSTANT.STORAGE_SETTINGS_THEME,
      theme
    );
  }
};

const actions: ActionTree<SettingState, RootState> = {};

const getters: GetterTree<SettingState, RootState> = {
  menuStyleTheme(state) {
    return state.menuStyle.split('-')[1];
  },
  tableSize(): 'default' | 'middle' | 'small' {
    return state.tableSize === 'large' ? 'default' : state.tableSize;
  }
};

export const setting: Module<SettingState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
