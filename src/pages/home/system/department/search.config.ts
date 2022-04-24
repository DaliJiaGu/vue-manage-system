import { IForm } from '@/base-ui/form/types';

export const searchFormConfig: IForm = {
  formItem: [
    {
      field: 'name',
      type: 'input',
      label: '部门名称'
    },
    {
      field: 'leader',
      type: 'input',
      label: '部门领导'
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
