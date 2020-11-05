import { Component, Vue } from 'vue-property-decorator';
import { SearchFormItem } from '@/shared/components/container/model';

const searchFormItems = ($this: Vue): Array<SearchFormItem> => {
  return [
    {
      label: $this.$t('common.account'),
      key: 'username',
      type: 'input'
    },
    {
      label: $this.$t('common.nick_name'),
      key: 'displayName',
      type: 'input'
    },
    {
      label: $this.$t('common.role'),
      key: 'role',
      type: 'select',
      options: [{ value: 1, label: '管理员' }]
    },
    {
      label: $this.$t('common.email'),
      key: 'email',
      type: 'input'
    },
    {
      label: $this.$t('common.status'),
      key: 'status',
      type: 'radio',
      options: [
        { value: '', label: '全部' },
        { value: '0', label: '初始话' },
        { value: '1', label: '已生效' }
      ]
    }
  ];
};

@Component
export default class Index extends Vue {
  get searchFormItems(): Array<SearchFormItem> {
    return searchFormItems(this);
  }
}
