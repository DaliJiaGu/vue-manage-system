import { IForm } from '@/base-ui/form';
export const modalConfig: IForm = {
  title: '新建类别',
  formItem: [
    {
      field: 'name',
      type: 'input',
      label: '商品类别'
    }
  ],
  labelWidth: '80px',
  itemStyle: {},
  itemLayout: {
    span: 24
  }
};
