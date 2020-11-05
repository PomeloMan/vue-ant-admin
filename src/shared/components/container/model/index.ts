import { TranslateResult } from 'vue-i18n';

/**
 * 导航菜单
 */
export interface Breadcrumb {
  name: string; // 菜单名称
  href?: string; // 菜单路径
}

export type FormItemType = 'input' | 'select' | 'radio';
export interface SearchFormItem {
  label: TranslateResult; // 字段名称
  key: string; // 字段名
  type: FormItemType; // 字段类型
  options?: Array<{ value: string | number; label: string }>; // 字段选项
}
