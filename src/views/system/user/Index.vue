<template>
  <app-container :breadcrumbs="breadcrumbs">
    <app-table
      :loading="loading"
      :data-source="dataSource"
      :columns="columns"
      :scroll="scroll"
    >
      <!-- 操作 -->
      <span slot="operation">
        <a-button size="small" type="link">{{ $t('common.edit') }}</a-button>
        <a-popconfirm :title="$t('message.is_confirm_delete')">
          <a-button size="small" type="link">{{
            $t('common.delete')
          }}</a-button>
        </a-popconfirm>
      </span>
    </app-table>
  </app-container>
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';
import AppContainer from '@/shared/components/container/Index.vue';
import AppTable from '@/shared/components/table/Index.vue';
import TableCoreMixin from '@/shared/components/table/mixins/TableCore';
import TableColumnMixin from './mixins/TableColumn';

@Component({
  components: {
    AppContainer,
    AppTable,
  },
})
export default class Index extends Mixins(
  Vue,
  TableColumnMixin,
  TableCoreMixin
) {
  // override TableCoreMixin attribute
  dataSourceUrl = '/mock/system/user/page.json';

  // component attribute
  breadcrumbs = [
    { name: '首页', href: '/home' },
    { name: '系统管理' },
    { name: '用户管理' },
  ];
}
</script>