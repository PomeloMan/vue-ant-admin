<template>
  <app-container
    ref="container"
    :breadcrumbs="breadcrumbs"
    :searchType="'advanced'"
    :searchFormItems="searchFormItems"
    @onResize="resize"
  >
    <span slot="actions">
      <a-button size="small" type="link" @click="showDrawer()">
        {{ $t('common.add') }}
      </a-button>
    </span>
    <!-- 内容 -->
    <app-table
      rowKey="username"
      :loading="loading"
      :data-source="dataSource"
      :columns="columns"
      :scroll="scroll"
    >
      <!-- 操作 -->
      <span slot="operation" slot-scope="record">
        <a-button size="small" type="link" @click="showDrawer(record)">
          {{ $t('common.edit') }}
        </a-button>
        <a-popconfirm :title="$t('message.is_confirm_delete')">
          <a-button size="small" type="link">
            {{ $t('common.delete') }}
          </a-button>
        </a-popconfirm>
      </span>
    </app-table>

    <a-drawer
      width="40%"
      :visible="drawerVisible"
      :closable="false"
      :maskClosable="false"
      :bodyStyle="{ height: '100%', padding: 0 }"
      :get-container="() => $refs.container.$el"
      :wrap-style="{ position: 'absolute' }"
    >
      <app-form
        ref="appForm"
        layout="vertical"
        :title="!form.username ? $t('common.add') : $t('common.edit')"
        :form="form"
        :formItems="addFormItems"
        :rules="rules"
        @submit="save"
        @cancel="drawerVisible = false"
      ></app-form>
    </a-drawer>
  </app-container>
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';
import AppContainer from '@/shared/components/container/Index.vue';
import AppTable from '@/shared/components/table/Index.vue';
import AppForm from '@/shared/components/form/Index.vue';
import TableCoreMixin from '@/shared/components/table/mixins/TableCore';
import TableColumnMixin from './mixins/TableColumn';
import SearchFormItemsMixin from './mixins/SearchFormItem';
import AddFormItemsMixin from './mixins/AddFormItem';

@Component({
  components: {
    AppContainer,
    AppTable,
    AppForm,
  },
})
export default class Index extends Mixins(
  Vue,
  TableCoreMixin,
  TableColumnMixin,
  SearchFormItemsMixin,
  AddFormItemsMixin
) {
  // override TableCoreMixin attribute
  dataSourceUrl = '/mock/system/user/page.json';
  drawerVisible = false; // 添加/编辑

  // component attribute
  breadcrumbs = [
    { name: '首页', href: '/home' },
    { name: '系统管理' },
    { name: '用户管理' },
  ];

  showDrawer(record = {}) {
    this.drawerVisible = true;
    this.$nextTick(() => {
      (this.$refs.appForm as any).resetFields();
      this.form = { ...record };
    });
  }

  save(val: any) {
    console.log(val);
  }
}
</script>