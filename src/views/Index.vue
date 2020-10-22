<template>
  <a-layout class="layout-wrapper" :class="`theme-${theme}`">
    <a-layout-sider
      :theme="menuStyleTheme"
      :trigger="null"
      collapsible
      v-model="collapsed"
    >
      <menu-sider></menu-sider>
    </a-layout-sider>
    <a-layout>
      <a-layout-header
        :style="{
          background: menuStyleTheme === 'light' ? '#ffffff' : '#001529',
        }"
      >
        <layout-header></layout-header>
      </a-layout-header>
      <a-layout-content ref="layoutContent">
        <transition name="slide-fade">
          <keep-alive :include="keepAliveList">
            <router-view class="container"></router-view>
          </keep-alive>
        </transition>
        <!-- 右侧设置面板 -->
        <setting></setting>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { RootState } from '@/configs/store';
import { SettingState } from '@/configs/store/setting';
import { Component, Vue } from 'vue-property-decorator';
import { Mutation, namespace, State } from 'vuex-class';
import LayoutHeader from './layout/Header.vue';
import MenuSider from './layout/MenuSider.vue';
import Setting from './layout/Setting.vue';

const settingModule = namespace('setting');
@Component({
  name: 'index',
  components: {
    MenuSider,
    LayoutHeader,
    Setting,
  },
})
export default class Index extends Vue {
  @State((state: RootState) => state.isCollapsed) isCollapsed!: boolean;
  @State((state: RootState) => state.keepAliveList) keepAliveList!: Array<any>;
  @Mutation('updateIsCollapsed') updateIsCollapsed: any;
  @settingModule.State((state: SettingState) => state.theme) theme!: string;
  @settingModule.Getter('menuStyleTheme') menuStyleTheme!: 'dark' | 'light';

  get collapsed() {
    return this.isCollapsed;
  }
  set collapsed(isCollapsed) {
    this.updateIsCollapsed(isCollapsed);
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/var.less';
.layout-wrapper {
  height: 100%;
  .ant-layout-sider {
    box-shadow: 1px 0px 2px @shadow-color;
    z-index: 20;
    /deep/ .ant-menu.ant-menu-inline {
      border-right: none;
    }
  }
  .ant-layout .ant-layout-header {
    box-shadow: 0 1px 2px @shadow-color;
    z-index: 10;
  }
  .ant-layout-content {
    position: relative;
    overflow: hidden;
    .container {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }
}

// <transition>
.slide-fade-enter-active {
  transition: all 0.3s ease;
  transition-delay: 0.3s;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>