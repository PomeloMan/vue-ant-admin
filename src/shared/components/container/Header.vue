<template>
  <div class="app-header">
    <header class="navbar" v-if="breadcrumbs && breadcrumbs.length > 0">
      <a-breadcrumb>
        <a-breadcrumb-item :key="index" v-for="(item, index) in breadcrumbs">
          <router-link v-if="item.href" :to="item.href">
            {{ item.name }}
          </router-link>
          <span v-else>{{ item.name }}</span>
        </a-breadcrumb-item>
      </a-breadcrumb>

      <slot name="actions"></slot>

      <template v-if="searchType === 'advanced'">
        <div>
          <a-button type="link" @click="toggle()">
            {{ $t('common.advance_search') }}
            <a-icon :type="visible ? 'up' : 'down'" />
          </a-button>
        </div>
      </template>
      <template v-if="searchType === 'simple'">
        <div>
          <a-input-search
            size="small"
            placeholder="Quick search"
            style="width: 200px"
            v-model="keyword"
            @search="onSimpleSearch"
          />
        </div>
      </template>
    </header>
    <!-- 高级搜索 -->
    <div
      id="advancedWrapper"
      class="advanced-wrapper"
      :class="{ visible: visible }"
    >
      <a-form id="searchForm" :layout="'inline'" :form="searchForm">
        <a-row :gutter="12" type="flex">
          <a-col
            :span="24 / column"
            :key="index"
            v-for="(item, index) in searchFormItems"
          >
            <a-form-item :label="item.label">
              <!-- input -->
              <template v-if="item.type === 'input'">
                <a-input v-decorator="[item.key]"></a-input>
              </template>
              <!-- select -->
              <template v-else-if="item.type === 'select'">
                <a-select v-decorator="[item.key]">
                  <a-select-option
                    :key="option.value"
                    :value="option.value"
                    v-for="option in item.options"
                    >{{ option.label }}</a-select-option
                  >
                </a-select>
              </template>
              <!-- radio -->
              <template v-else-if="item.type === 'radio'">
                <a-radio-group v-decorator="[item.key]" buttonStyle="solid">
                  <a-radio-button
                    :key="option.value"
                    :value="option.value"
                    v-for="option in item.options"
                    >{{ option.label }}</a-radio-button
                  >
                </a-radio-group>
              </template>
            </a-form-item>
          </a-col>
        </a-row>
        <!-- 重置和查询按钮 -->
        <a-row>
          <a-col :span="12">
            <a-form-item :wrapperCol="{ span: 20, offset: 4 }">
              <a-button @click="searchForm.resetFields()">
                <a-icon type="rest" />
                {{ $t('common.reset') }}
              </a-button>
              <a-divider
                type="vertical"
                style="background: transparent"
              ></a-divider>
              <a-button type="primary" @click="onAdvancedSearch">
                <a-icon type="search" />
                {{ $t('common.search') }}
              </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';
import { WrappedFormUtils } from 'ant-design-vue/types/form/form';
import { Breadcrumb, SearchFormItem } from './model';

/**
 * 页面主内容头部组件（处理面包屑导航，查询等）
 */
@Component
export default class HeaderComponent extends Vue {
  // 面包屑导航栏
  @Prop()
  breadcrumbs?: Array<Breadcrumb>;
  // 搜索类型
  @Prop({ type: String, required: false, default: 'none' })
  searchType!: 'none' | 'simple' | 'advance';
  // 搜索表单字段集描述
  @Prop()
  searchFormItems?: Array<SearchFormItem>;
  // 表单布局
  @Prop({ type: Number, required: false, default: 2 })
  column!: number;

  visible = false; // 搜索表单是否可见
  keyword?: string; // 简单搜索返回字段
  searchForm!: WrappedFormUtils; // 搜索表单

  beforeCreate() {
    this.searchForm = this.$form.createForm(this);
  }

  mounted() {
    window.onresize = () => this.onVisibleChange(this.visible);
  }

  @Watch('visible')
  onVisibleChange(val: boolean) {
    // 计算 form 高度并赋值给 advance-wrapper 元素
    this.$nextTick(() => {
      const advFormEl = this.$el.querySelector('#searchForm');
      const advWrapEl = this.$el.querySelector(
        '#advancedWrapper'
      ) as HTMLElement;
      if (val) {
        if (advFormEl && advWrapEl) {
          advWrapEl.style.height = advFormEl.clientHeight + 'px';
        }
      } else {
        advWrapEl.style.height = '0px';
      }
      setTimeout(() => {
        this.onResize();
      }, 300); // 等待动画结束后重新计算布局
    });
  }

  @Emit()
  onSimpleSearch() {
    return this.keyword;
  }

  @Emit()
  onAdvancedSearch() {
    return this.searchForm.getFieldsValue();
  }

  @Emit('onResize')
  onResize() {
    return true;
  }

  toggle() {
    this.visible = !this.visible;
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/var.less';
.app-header {
  box-shadow: 0 1px 2px @shadow-color;
  background-color: @component-background;
  z-index: 1;

  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    height: @container-header-height;
    line-height: @container-header-height;

    > *:nth-child(1),
    > *:nth-child(3) {
      flex: 1;
    }
    > *:nth-child(1) {
      text-align: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    > *:nth-child(3) {
      text-align: right;
      margin-right: 4px;
    }
  }

  .advanced-wrapper {
    height: 0px;
    padding: 0px 16px;
    overflow: hidden;
    transition: all 0.3s;
    border-top: 0px solid transparent;
    &.visible {
      border-top: 1px solid @border-color-base;
    }
    .ant-form {
      padding: 8px 0px;
      .ant-form-item {
        display: flex;
        width: 100%;
        margin-bottom: 0;
        /deep/ .ant-form-item-label {
          min-width: 80px;
          max-width: 80px;
          text-overflow: ellipsis;
        }
        /deep/ .ant-form-item-control-wrapper {
          flex: 1;
        }
      }
    }
  }
}
</style>