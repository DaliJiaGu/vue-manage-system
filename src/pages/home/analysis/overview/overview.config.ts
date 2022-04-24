import { IForm } from '@/base-ui/form/types';

export const formConfig: IForm = {
  formItem: [
    {
      field: 'name',
      type: 'input',
      label: '用户名'
    },
    {
      field: 'password',
      type: 'password',
      label: '密码'
    },
    {
      field: 'sport',
      type: 'select',
      label: '选项',
      otherOptions: [
        { label: '篮球', value: 'baseketball' },
        { label: '足球', value: 'football' }
      ]
    },
    {
      field: 'createTime',
      type: 'dataTimePicker',
      label: '创建时间',
      otherOptions: {
        'start-placeholder': '开始时间',
        'end-placeholder': '结束时间',
        type: 'daterange'
      }
    }
  ],
  labelWidth: '100px',
  itemStyle: {
    padding: '10px 30px'
  },
  itemLayout: {
    span: 12
  }
};
