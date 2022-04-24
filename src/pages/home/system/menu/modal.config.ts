import { IForm } from '@/base-ui/form';
export const modalConfig: IForm = {
  title: '编辑菜单',
  formItem: [
    {
      field: 'name',
      type: 'input',
      label: '菜单名称'
    },
    {
      field: 'type',
      type: 'input',
      label: '菜单类型'
    },
    {
      field: 'icon',
      type: 'input',
      label: '菜单按钮'
    },
    {
      field: 'parentId',
      type: 'input',
      label: '父级菜单'
    },
    {
      field: 'url',
      type: 'input',
      label: '菜单路径'
    },
    {
      field: 'permission',
      type: 'input',
      label: '菜单操作'
    }
  ],
  labelWidth: '80px',
  itemStyle: {},
  itemLayout: {
    span: 24
  }
};
