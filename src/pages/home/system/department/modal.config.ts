import { IForm } from '@/base-ui/form';
export const modalConfig: IForm = {
  title: '编辑部门信息',
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
      field: 'parentId',
      type: 'select',
      label: '选择上级',
      otherOptions: []
    }
  ],
  labelWidth: '80px',
  itemStyle: {},
  itemLayout: {
    span: 24
  }
};
