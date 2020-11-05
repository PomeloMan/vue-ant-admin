<template>
  <a-drawer
    placement="right"
    :closable="false"
    :visible="visible"
    :get-container="false"
    wrap-class-name="setting-drawer-wrapper"
    :wrap-style="{ position: 'absolute' }"
    :body-style="bodyStyle"
    :width="300"
  >
    <span class="setting-trigger" @click="visible = !visible">
      <a-icon type="setting"></a-icon>
    </span>
    <!-- 菜单风格设置 -->
    <section class="menu-theme-wrapper">
      <h3>{{ $t('settings.menu_style') }}</h3>
      <div class="selection-wrapper clearfix">
        <a-tooltip
          class="selection"
          :title="$t(item.label)"
          :key="item.value"
          v-for="item in setting.menuStyles"
          @click="onMenuStyleChange(item.value)"
        >
          <img :src="item.url" />
          <span class="check-wrapper" v-if="item.value === setting.menuStyle">
            <a-icon type="check"></a-icon>
          </span>
        </a-tooltip>
      </div>
    </section>
    <!-- 主题色 -->
    <section class="theme-color-wrapper">
      <h3>
        {{ $t('settings.primary_color') }}
        <span style="font-size: 12px">
          （{{ $t('settings.primary_color_extra') }}）
        </span>
      </h3>
      <div class="selection-wrapper clearfix">
        <a-tooltip
          class="selection"
          :title="$t(item.label)"
          :key="item.value"
          v-for="item in setting.primaryColors"
          @click="onPrimaryColorChange(item.value)"
          :disabled="true"
          :style="{ 'background-color': item.value }"
        >
          <span>
            <a-icon
              type="check"
              v-if="item.value === setting.primaryColor"
            ></a-icon>
          </span>
        </a-tooltip>
      </div>
    </section>
    <a-divider></a-divider>
    <!-- 组件样式 -->
    <section class="table-style-wrapper">
      <h3>{{ $t('settings.component_style') }}</h3>
      <div class="selection-wrapper clearfix">
        <div class="radio-item">
          {{ $t('settings.component_styles.table_size') }}
          <a-radio-group v-model="tableSize" size="small" buttonStyle="solid">
            <a-radio-button
              :key="size"
              :value="size"
              v-for="size in setting.tableSizes"
              @click="onTableSizeChange(size)"
            >
              {{ $t(`common.size_${size}_initials`) }}
            </a-radio-button>
          </a-radio-group>
        </div>
        <div class="switch-item">
          {{ $t('settings.component_styles.table_inner_scroll') }}
          <a-switch v-model="tableInnerScroll" size="small"></a-switch>
        </div>
      </div>
    </section>
  </a-drawer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { SettingState } from '@/configs/store/setting';
import { loadScript, loadStyle } from '@/shared/utils';

const settingModule = namespace('setting');
@Component({ name: 'setting' })
export default class Setting extends Vue {
  @settingModule.State((state: SettingState) => state) setting!: SettingState;
  @settingModule.Mutation('updateMenuStyle') updateMenuStyle: any;
  @settingModule.Mutation('updatePrimaryColor') updatePrimaryColor: any;
  @settingModule.Mutation('updateTableSize') updateTableSize: any;
  @settingModule.Mutation('updateTableInnerScroll') updateTableInnerScroll: any;
  bodyStyle = { height: '100%', padding: '16px', overflow: 'auto' };
  visible = false;

  get tableSize() {
    return this.setting.tableSize;
  }
  set tableSize(tableSize) {
    this.updateTableSize(tableSize);
  }
  get tableInnerScroll() {
    return this.setting.tableInnerScroll;
  }
  set tableInnerScroll(tableInnerScroll) {
    this.updateTableInnerScroll(tableInnerScroll);
  }

  // 切换菜单样式
  onMenuStyleChange(value: 'sider-dark' | 'sider-light') {
    this.updateMenuStyle(value);
  }
  // 切换主色调
  onPrimaryColorChange(value: string) {
    const messageKey = 'complieTheme';
    const { $message } = this;
    $message.loading({
      content: `正在编译主题！`,
      key: messageKey,
      duration: 0,
    });
    this.runLess(value)
      .then(() => {
        this.updatePrimaryColor(value);
        $message.success({ content: '成功', key: messageKey });
      })
      .catch((err) => {
        $message.error({ content: err.message, key: messageKey });
      });
  }
  // 切换表格组件大小
  onTableSizeChange(size: 'large' | 'middle' | 'small') {
    this.tableSize = size;
  }

  private loadLess(): Promise<void> {
    if ((window as any).less) {
      return Promise.resolve();
    }
    return loadStyle(
      `${this.$http.defaults.baseURL}/color.less`,
      'stylesheet/less'
    )
      .then(() => {
        const lessScript = document.createElement('script');
        lessScript.innerHTML = `
          window.less = {
            async: true,
            env: 'production', // development
            javascriptEnabled: true
          };
        `;
        document.body.appendChild(lessScript);
      })
      .then(() => {
        return loadScript(
          'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js'
        ).catch(() => {
          return loadScript('./libs/less.min.js');
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  private runLess(color: string): Promise<any> {
    return this.loadLess().then(() => {
      // setTimeout(() => {
      return (window as any).less.modifyVars({
        '@primary-color': color,
      });
      // }, 100);
    });
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/var.less';
.setting-trigger {
  position: absolute;
  top: 56px;
  right: -36px;
  left: -36px;
  z-index: 1;
  width: 36px;
  height: 42px;
  font-size: 18px;
  line-height: 42px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  // background-color: @component-background;
  // box-shadow: @btn-primary-shadow;
  // &:hover {
  //   color: @primary-color;
  // }
}
section h3 {
  font-size: 14px;
  margin-bottom: 12px;
}
// 整体风格设置styles
.menu-theme-wrapper {
  margin-bottom: 12px;
  > .selection-wrapper {
    display: flex;
    flex-flow: row wrap;
    > .selection {
      position: relative;
      margin-right: 12px;
      margin-bottom: 12px;
      cursor: pointer;
      .check-wrapper {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        padding-top: 15px;
        padding-left: 24px;
        color: @primary-color;
      }
    }
  }
}
// 主色调
.theme-color-wrapper {
  .selection-wrapper {
    .selection {
      width: 20px;
      height: 20px;
      float: left;
      margin-right: 8px;
      margin-bottom: 8px;
      text-align: center;
      color: #fff;
      border-radius: @border-radius-base;
      cursor: pointer;
      &[disabled='true'] {
        opacity: 0.25;
        cursor: not-allowed;
      }
    }
  }
}
.radio-item,
.switch-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
</style>

<style lang="less">
// 设置右侧设置面板触发按钮样式
.setting-drawer-wrapper .ant-drawer-content {
  overflow: initial;
}
.setting-drawer-wrapper
  .ant-drawer-content
  .ant-drawer-body::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  background-color: transparent;
}
</style>