import { Component, Vue } from 'vue-property-decorator';
import { AddFormItem } from '@/shared/components/form/model';

const rules = ($this: Vue): any => {
  return {
    avatar: [
      {
        required: true,
        message: $this.$t('message.field_required'),
        trigger: 'change'
      }
    ],
    username: [
      {
        required: true,
        whitespace: true,
        message: $this.$t('message.field_required'),
        trigger: 'blur'
      },
      {
        min: 6,
        max: 12,
        message: $this.$t('message.field_length_range', {
          min: 6,
          max: 12
        }),
        trigger: 'blur'
      }
    ],
    displayName: [
      {
        required: true,
        whitespace: true,
        message: $this.$t('message.field_required'),
        trigger: 'blur'
      }
    ],
    roleId: [
      {
        required: true,
        message: $this.$t('message.field_required'),
        trigger: 'change'
      }
    ]
  };
};

const addFormItems = ($this: Vue): Array<AddFormItem> => {
  return [
    {
      type: 'upload',
      label: $this.$t('common.avatar'),
      key: 'avatar',
      // multiple: false
    },
    {
      type: 'input',
      label: $this.$t('common.account'),
      key: 'username'
    },
    {
      type: 'input',
      label: $this.$t('common.nick_name'),
      key: 'displayName'
    },
    {
      type: 'input',
      label: $this.$t('system_user.phone'),
      key: 'phone'
    },
    {
      type: 'select',
      label: $this.$t('common.role'),
      key: 'roleId'
      // options: $this.roles
    }
  ];
};

@Component
export default class Index extends Vue {
  form: any = {};
  get rules(): any {
    return rules(this);
  }
  get addFormItems(): Array<AddFormItem> {
    return addFormItems(this);
  }
}
