import { IForm } from '@/base-ui/form/types';

export const searchFormConfig: IForm = {
  formItem: [
    {
      field: 'name',
      type: 'input',
      label: '用户名'
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名'
    },
    {
      field: 'enable',
      type: 'select',
      label: '状态',
      otherOptions: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '电话号码'
    },
    {
      field: 'createAt',
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
