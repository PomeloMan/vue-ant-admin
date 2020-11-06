<template>
  <a-card
    class="table-card"
    :bordered="false"
    :bodyStyle="{ padding: 0, height: '100%' }"
    :style="{
      height: tableInnerScroll ? 'calc(100% - 40px)' : 'initial',
    }"
  >
    <a-table
      :loading="loading"
      :rowKey="rowKey"
      :size="tableSize"
      :columns="columns"
      :data-source="dataSource"
      :scroll="scroll"
      @expand="onExpand"
    >
      <template
        v-for="column in columns"
        :slot="column.scopedSlots ? column.scopedSlots.customRender : ''"
        slot-scope="val, record"
      >
        <slot
          :name="
            column.scopedSlots ? column.scopedSlots.customRender : column.key
          "
          v-bind="record"
        ></slot>
      </template>
    </a-table>
  </a-card>
</template>

<script lang="ts">
import { Component, Emit, Mixins, Prop, Vue } from 'vue-property-decorator';
import GlobalConfig from '@/shared/configs/GlobalConfig';

/**
 * 页面主内容布局组件
 */
@Component
export default class TableComponent extends Mixins(Vue, GlobalConfig) {
  /** 表格组件属性 */
  // rowKey 行唯一键
  @Prop({ type: String, required: false, default: 'id' })
  rowKey!: string;
  // loading 表格是否加载
  @Prop({ type: Boolean, required: false, default: false })
  loading!: boolean;
  // dataSource 数据源
  @Prop({ type: Array, required: true, default: () => [] })
  dataSource!: Array<any>;
  // columns 列定义
  @Prop({ type: Array, required: true, default: () => [] })
  columns!: Array<any>;
  // scroll 表格滚动条
  @Prop({ type: Object, required: false, default: () => ({ x: 0, y: 0 }) })
  scroll!: {
    x: number;
    y: number;
  };

  @Emit('onExpand')
  onExpand(expanded: boolean, record: any) {
    return { expanded, record };
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/var.less';
.table-card .ant-table-wrapper {
  height: 100%;
  /deep/ .ant-table-pagination {
    padding: 0 16px;
  }
}
</style>