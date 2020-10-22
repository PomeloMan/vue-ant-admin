<template>
  <div
    class="layout-header"
    :class="{ 'ant-menu-dark': menuStyleTheme === 'dark' }"
  >
    <div class="left-wrapper">
      <li class="ant-menu-item" @click="collapse">
        <a-icon
          :type="isCollapsed ? 'menu-unfold' : 'menu-fold'"
          :style="antIconStyle"
        />
      </li>
    </div>
    <div class="right-wrapper">
      <!-- 语言 -->
      <a-dropdown class :trigger="['click']">
        <li class="ant-menu-item ant-dropdown-link" href="#">
          <a-icon type="global" :style="antIconStyle" />
        </li>
        <a-menu slot="overlay" class="i18n-menu">
          <a-menu-item
            :key="item.code"
            @click="i18n(item.code)"
            v-for="item in locales"
          >
            <svg-icon
              :icon-class="`locale_${item.code}`"
              style="margin-right: 8px"
            ></svg-icon>
            <span>{{ item.name }}</span>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { RootState } from '@/configs/store';
import { Component, Vue } from 'vue-property-decorator';
import { Mutation, namespace, State } from 'vuex-class';
import { AppLocale, locales } from '@/configs/constant';

const settingModule = namespace('setting');
@Component
export default class Header extends Vue {
  @State((state: RootState) => state.isCollapsed) isCollapsed!: boolean;
  @Mutation('updateIsCollapsed') updateIsCollapsed: any;
  @Mutation('updateLocale') updateLocale: any;
  @settingModule.Getter('menuStyleTheme') menuStyleTheme!: 'dark' | 'light';

  locales: Array<AppLocale> = locales;
  // 头部导航栏标签样式
  antIconStyle = { margin: 0, fontSize: '18px' };

  mounted() {
    console.log(this.isCollapsed);
  }

  collapse() {
    this.updateIsCollapsed(!this.isCollapsed);
  }

  // 国际化
  i18n(locale: 'zh' | 'en') {
    this.updateLocale(locale);
    this.$moment.locale(locale); // 时间组件国际化
    this.$i18n.locale = locale; // 国际化
  }
}
</script>

<style lang="less" scoped>
.layout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .right-wrapper {
    padding: 0 24px;
    display: flex;
    align-items: center;
    .ant-menu-item {
      padding: 0 10px;
    }
  }
}
</style>