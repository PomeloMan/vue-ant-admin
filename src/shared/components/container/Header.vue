<template>
  <header class="header" v-if="breadcrumbs && breadcrumbs.length > 0">
    <a-breadcrumb>
      <a-breadcrumb-item :key="index" v-for="(item, index) in breadcrumbs">
        <router-link v-if="item.href" :to="item.href">
          {{ item.name }}
        </router-link>
        <span v-else>{{ item.name }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Breadcrumb } from './model';

/**
 * 页面主内容头部组件（处理面包屑导航，查询等）
 */
@Component
export default class HeaderComponent extends Vue {
  @Prop() breadcrumbs?: Array<Breadcrumb>;
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/var.less';
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: @container-header-height;
  line-height: @container-header-height;
  background-color: @component-background;
  box-shadow: 0 1px 2px @shadow-color;
  z-index: 1;
}
</style>