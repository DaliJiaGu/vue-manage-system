import { IForm } from '@/base-ui/form';
export const modalConfig: IForm = {
  title: '新建用户',
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
      field: 'password',
      type: 'input',
      label: '密码',
      isHide: false
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '手机号码'
    },
    {
      field: 'departmentId',
      type: 'select',
      label: '选择部门',
      otherOptions: []
    },
    {
      field: 'roleId',
      type: 'select',
      label: '选择角色',
      otherOptions: []
    }
  ],
  labelWidth: '80px',
  itemStyle: {},
  itemLayout: {
    span: 24
  }
};
