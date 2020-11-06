<template>
  <div class="app-form-wrapper">
    <header class="app-form-header">{{ title }}</header>
    <a-form-model
      ref="form"
      :model="form"
      :rules="rules"
      :layout="layout"
      :label-col="layout === 'horizontal' ? labelCol : null"
      :wrapper-col="layout === 'horizontal' ? wrapperCol : null"
    >
      <template v-for="item in formItems">
        <a-form-model-item :key="item.key" :label="item.label" :prop="item.key">
          <!-- input -->
          <template v-if="item.type === 'input'">
            <a-input
              v-model="form[item.key]"
              :placeholder="$t('message.please_input', { content: item.label })"
            />
          </template>
          <!-- select -->
          <template v-if="item.type === 'select'">
            <a-select
              v-model="form[item.key]"
              allow-clear
              :mode="item.multiple"
              :placeholder="
                $t('message.please_select', { content: item.label })
              "
            >
              <a-select-option
                :key="option.value"
                :value="option.value"
                v-for="option in item.options"
              >
                {{ option.label }}
              </a-select-option>
            </a-select>
          </template>
          <!-- tree-select -->
          <template v-if="item.type === 'tree-select'">
            <a-tree-select
              v-model="form[item.key]"
              allow-clear
              tree-checkable
              :tree-data="item.options"
              :show-checked-strategy="'SHOW_PARENT'"
              :tree-data-simple-mode="true"
              :placeholder="
                $t('message.please_select', { content: item.label })
              "
            >
            </a-tree-select>
          </template>
          <!-- upload -->
          <template v-if="item.type === 'upload'">
            <app-upload
              v-model="form[item.key]"
              :multiple="item.multiple"
              :width="item.width"
              :height="item.height"
              @change="validateField(item.key)"
            ></app-upload>
          </template>
        </a-form-model-item>
      </template>
    </a-form-model>
    <footer class="app-form-footer">
      <a-button @click="cancel()">{{ $t('common.cancel') }}</a-button>
      <a-button type="primary" @click="submit()">
        {{ $t('common.submit') }}
      </a-button>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import AppUpload from '../upload/Index.vue';
import { AddFormItem } from './model';

/**
 * 表单组件
 */
@Component({
  components: {
    AppUpload,
  },
})
export default class FormComponent extends Vue {
  @Prop() title?: string;
  @Prop() rules?: any;
  @Prop({ type: String, default: () => 'horizontal' }) layout!:
    | 'horizontal'
    | 'vertical'
    | 'inline';
  @Prop({ type: Object, default: () => ({}) }) form!: any;
  @Prop({ type: Array, default: () => [] }) formItems!: Array<AddFormItem>;

  submit() {
    console.log(this.form);
    (this.$refs.form as any).validate((valid: boolean) => {
      if (valid) {
        this.$emit('submit', this.form);
      }
    });
  }

  @Emit('cancel')
  cancel() {
    return null;
  }

  validateField(field: string) {
    (this.$refs.form as any).validateField(field);
  }

  resetFields() {
    (this.$refs.form as any).resetFields();
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/var.less';
.app-form-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  .ant-form {
    flex: auto;
    padding: 24px 24px 0;
    overflow: auto;
    /* 定义滚动条样式 */
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    /* 定义滚动条轨道 内阴影+圆角 */
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 0px @component-background;
      border-radius: 10px;
      background-color: @component-background;
    }
    /* 定义滑块 内阴影+圆角 */
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 0px @gray-5;
      background-color: @gray-5;
    }
  }
  .app-form-header {
    font-size: 16px;
    font-weight: 600;
    height: 48px;
    min-height: 48px;
    line-height: 48px;
    padding: 0 24px;
    border-bottom: 1px solid @border-color-base;
  }
  .app-form-footer {
    height: 56px;
    min-height: 56px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 24px;
    border-top: 1px solid @border-color-base;
    .ant-btn:not(:last-child) {
      margin-right: 10px;
    }
  }
}
</style>