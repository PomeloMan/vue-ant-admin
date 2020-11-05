<template>
  <div>
    <header-component :breadcrumbs="breadcrumbs"></header-component>
    <div class="content">
      <slot></slot>
      <footer class="footer">
        <p>Copyright <a-icon type="copyright"></a-icon> Chao, Version 1.0.0</p>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import HeaderComponent from './Header.vue';
import { Breadcrumb } from './model';

/**
 * 页面主内容布局组件
 */
@Component({
  components: {
    HeaderComponent,
  },
})
export default class ContainerComponent extends Vue {
  @Prop() breadcrumbs?: Array<Breadcrumb>;
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/var.less';
.content {
  flex: auto;
  padding: 16px 16px 0;
  overflow: auto;
  height: calc(100% - @container-header-height);
  z-index: 0;
  > *:first-child {
    min-height: calc(100% - @container-footer-height);
  }
  /* 定义滚动条样式 */
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  /* 定义滚动条轨道 内阴影+圆角 */
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 0px @gray-5;
    border-radius: 10px;
    background-color: @gray-5;
  }
  /* 定义滑块 内阴影+圆角 */
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 0px @gray-6;
    background-color: @gray-6;
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: @container-footer-height;
    font-size: 12px;
    > p {
      margin: 0;
    }
  }
}
</style>