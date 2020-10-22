import { ScopedSlot } from 'vue/types/vnode';

/**
 * 用户对象
 */
export interface User {
  id: number; // 用户ID
  username: string; // 用户名
  displayName: string; // 昵称
  status: number; // 状态
  phone: number; // 手机号
  address: string; // 地址
  role: Role[]; // 角色
}

export interface Role {
  id: number;
  menus: Menu[];
}

/**
 * 菜单对象
 */
export interface Menu {
  id: number; // 菜单ID
  pid?: number; // 父菜单ID
  type?: number; // 菜单类型
  url: string; // 菜单访问路径
  name: string; // 菜单名
  icon?: string; // 菜单图标
  children?: Menu[]; // 子菜单
  key: string; // 菜单组件键
  component: string; // 菜单组件路径`@/views/`之后的值
}

/**
 * AntTable组件Column对象属性
 * 参考 import { Column } from 'ant-design-vue/types/table/column';
 */
export interface Column {
  align?: 'left' | 'right' | 'center'; // 列对齐方式
  ellipsis?: boolean; // 列是否超出省略
  dataIndex?: string; // 列关联数据源对象键
  fixed?: boolean | 'left' | 'right'; // 列是否固定
  key?: string; // 列键
  customRender?: Function | ScopedSlot; // 自定义渲染
  title?: any; // 列头
  width?: string | number; // 列宽
  scopedSlots?: object; // 自定义渲染
}
