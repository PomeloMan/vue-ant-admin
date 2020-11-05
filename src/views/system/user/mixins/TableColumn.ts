import { Component, Vue } from 'vue-property-decorator';
import { Column } from '../../../model';

const columns = ($this: Vue): Array<Column> => {
  return [
    {
      title: $this.$t('common.number'),
      width: 80,
      customRender: function(val: any, record: any, index: number) {
        return index + 1;
      }
    },
    {
      title: $this.$t('system_user.account'),
      width: 100,
      key: 'id',
      dataIndex: 'id',
      ellipsis: true
    },
    {
      title: $this.$t('system_user.name'),
      width: 100,
      key: 'username',
      dataIndex: 'username'
    },
    {
      title: $this.$t('system_user.display_name'),
      width: 120,
      key: 'displayName',
      dataIndex: 'displayName',
      ellipsis: true
    },
    {
      title: $this.$t('system_user.phone'),
      width: 100,
      key: 'phone',
      dataIndex: 'phone',
      ellipsis: true
    },
    {
      title: $this.$t('system_user.address'),
      width: 150,
      key: 'address',
      dataIndex: 'address',
      ellipsis: true
    },
    {
      title: $this.$t('common.status'),
      width: 80,
      align: 'center',
      key: 'status',
      dataIndex: 'status'
    },
    {
      title: $this.$t('common.operation'),
      width: 120,
      align: 'center',
      scopedSlots: { customRender: 'operation' }
    }
  ];
};

@Component
export default class Index extends Vue {
  get columns(): Array<Column> {
    return columns(this);
  }
}
