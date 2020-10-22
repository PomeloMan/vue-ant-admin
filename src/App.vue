<template>
  <a-config-provider :locale="antLocale">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script lang="ts">
import { RootState } from '@/configs/store';
import { Locale } from 'ant-design-vue/types/locale-provider';
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { locales } from '@/configs/constant';

@Component({ name: 'app' })
export default class Index extends Vue {
  @State((state: RootState) => state.locale) locale!: string;

  get antLocale(): Locale {
    const appLocale = locales.find((l) => l.code === this.locale);
    if (appLocale) {
      return appLocale.antLocale;
    } else {
      return locales[0].antLocale;
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
