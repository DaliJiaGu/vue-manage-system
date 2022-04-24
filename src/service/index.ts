import XLRequest from './request';
import { BASE_URL } from './request/config';
import localCache from '@/utils/cache';

const xlRequest = new XLRequest({
  baseURL: BASE_URL,
  // 我们想要给每个实例创建个性的拦截器，但是拦截器的hooks是在AxiosIstance接口的
  // 而且我们创建实例传入的config: AxiosRequestConfig，这个接口并没有定义对应拦截器的hooks
  // 所以我们只能自己定义接口来继承AxiosRequestConfig，这样才可以扩展AxiosRequestConfig，使得它有拦截器对应的hooks
  interceptors: {
    requestInterceptor(config) {
      const token = localCache.getCache('token');
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    requestInterceptorCatch(error) {
      console.log('实例级别的拦击：请求失败');

      return error;
    },
    responseInterceptor(config) {
      console.log('实例级别的拦击：响应成功');

      return config;
    },
    responseInterceptorCatch(error) {
      console.log('实例级别的拦击：响应失败', error.response.status);
      return error;
    }
  }
});

export default xlRequest;
