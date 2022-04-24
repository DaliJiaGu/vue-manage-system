export interface IAccount {
  name: string;
  password: string;
}
// 用户账号登录成功返回的数据接口
export interface ILoginData {
  id: number;
  name: string;
  token: string;
}
