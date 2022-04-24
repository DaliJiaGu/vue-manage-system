import xlRequest from '../index';
import { IAccount } from './type';
import { ILoginData } from './type';
import { IDataType } from '../types';
// 为了防止后续url的更改，这里将login相关的url枚举
enum LoginApi {
  accountLogin = '/login',
  userDetail = '/users/', //users/1
  userMenuApi = '/role/' // /role/4/menu
}
export function accountLoginRequest(account: IAccount) {
  return xlRequest.post<IDataType<ILoginData>>({
    url: LoginApi.accountLogin,
    data: account,
    interceptors: {
      responseInterceptor(res) {
        return res;
      },
      responseInterceptorCatch(error) {
        console.log(error.response.status);
        if (error.response.status == 400) {
          window.alert('账号密码输入错误');
        }
        return error;
      }
    },
    showLoading: true
  });
}

export function getUserInfoById(id: number) {
  return xlRequest.get<IDataType>({
    url: LoginApi.userDetail + id
  });
}

export function getUserMenuByUserId(id: number) {
  return xlRequest.get<IDataType>({
    url: LoginApi.userMenuApi + id + '/menu'
  });
}
