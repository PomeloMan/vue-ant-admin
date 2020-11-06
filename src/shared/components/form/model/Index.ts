import { TranslateResult } from 'vue-i18n';

export type FormItemType = 'input' | 'select' | 'radio' | 'upload';
export interface AddFormItem {
  label: TranslateResult; // 字段名称
  key: string; // 字段名
  type: FormItemType; // 字段类型
  options?: Array<{ value: string | number; label: string }>; // 字段选项
  multiple?: boolean; // type === 'upload'有效，是否多文件上传
  width?: number;
  height?: number;
}
