<template>
  <container :breadcrumbs="breadcrumbs">
    <a-card :bordered="false" :bodyStyle="{ padding: 0 }">
      <a-table
        rowKey="id"
        :size="tableSize"
        :columns="columns"
        :data-source="menus"
        :scroll="{ x: 720 }"
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
      </a-table>
    </a-card>
  </container>
</template>

<script lang="ts">
import { Component, Mixins, Vue } from 'vue-property-decorator';
import GlobalConfig from '@/shared/configs/GlobalConfig';
import { Column, Menu } from '../../model';
import Container from '@/shared/components/container/Container.vue';

const columns = function (this: Vue): Array<Column> {
  return [
    {
      title: this.$t('common.number'),
      width: 80,
      customRender: function (val: any, record: any, index: number) {
        return index + 1;
      },
    },
    {
      title: this.$t('system_menu.name'),
      width: 100,
      key: 'name',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: this.$t('common.icon'),
      width: 100,
      key: 'icon',
      dataIndex: 'icon',
    },
    {
      title: this.$t('system_menu.request_url'),
      width: 120,
      key: 'url',
      dataIndex: 'url',
      ellipsis: true,
    },
    {
      title: this.$t('system_menu.component_path'),
      width: 120,
      key: 'component',
      dataIndex: 'component',
      ellipsis: true,
    },
    {
      title: this.$t('common.status'),
      width: 80,
      align: 'center',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: this.$t('common.operation'),
      width: 120,
      align: 'center',
      scopedSlots: { customRender: 'operation' },
    },
  ];
};

@Component({
  components: {
    Container,
  },
})
export default class Index extends Mixins(Vue, GlobalConfig) {
  breadcrumbs = [
    { name: '首页', href: '/home' },
    { name: '系统管理' },
    { name: '菜单管理' },
  ];
  menus: Array<Menu> = [];

  created() {
    this.$http.get(this.$api.MENU_LIST).then(({ data }) => {
      this.menus = data;
    });
  }

  get columns(): Array<Column> {
    return columns.bind(this)();
  }
}
</script>