import { IForm } from '@/base-ui/form';
export const modalConfig: IForm = {
  title: '新建角色',
  formItem: [
    {
      field: 'name',
      type: 'input',
      label: '角色名'
    },
    {
      field: 'intro',
      type: 'input',
      label: '权限介绍'
    }
  ],
  labelWidth: '80px',
  itemStyle: {},
  itemLayout: {
    span: 24
  }
};
