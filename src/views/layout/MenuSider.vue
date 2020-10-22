<template>
  <div>
    <div class="logo" />
    <a-menu :theme="menuStyleTheme" mode="inline" :defaultSelectedKeys="['1']">
      <template v-for="menu in menus">
        <a-menu-item
          :key="menu.id"
          v-if="!menu.children || menu.children.length === 0"
        >
          <router-link :to="menu.url">
            <a-icon :type="menu.icon" />
            <span>{{ menu.name }}</span>
          </router-link>
        </a-menu-item>
        <a-sub-menu
          :key="menu.id"
          v-if="menu.children && menu.children.length > 0"
        >
          <span slot="title">
            <a-icon :type="menu.icon" />
            <span>{{ menu.name }}</span>
          </span>
          <template v-for="child in menu.children">
            <a-menu-item :key="child.id">
              <router-link :to="child.url">{{ child.name }}</router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace, State } from 'vuex-class';
import { RootState } from '@/configs/store';
import { Menu } from '../model';
import { SettingState } from '@/configs/store/setting';

const settingModule = namespace('setting');
@Component({ name: 'menu-sider' })
export default class MenuSider extends Vue {
  @State((state: RootState) => state.isCollapsed) isCollapsed!: boolean;
  @State((state: RootState) => state.menus) menus!: Array<Menu>;
  @settingModule.Getter('menuStyleTheme') menuStyleTheme!: 'dark' | 'light';
}
</script>

<style lang="less" scoped>
.logo {
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  margin: 8px 16px;
}
</style>