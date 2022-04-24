// 设置type的类型
type IFormItemType = 'input' | 'password' | 'select' | 'dataTimePicker';

export interface IFormType {
  field: string;
  type: IFormItemType;
  label: string;
  rules?: any[];
  otherOptions?: any;
  isHide?: boolean;
  options?: any[];
}

export interface IForm {
  formItem: IFormType[];
  labelWidth?: string;
  itemStyle?: any;
  itemLayout?: {
    span?: number;
  };
  title?: string;
}
