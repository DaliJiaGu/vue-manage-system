import { AxiosRequestConfig, AxiosResponse } from 'axios';

// 创建用于扩展的接口，内部需要定义好interceptors
export interface xlRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (config: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}
// 创建一个接口用于规定创建实例的时候传入的config，并且继承AxiosRequestConfig
export interface xlRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: xlRequestInterceptors<T>;
  showLoading?: boolean;
}
