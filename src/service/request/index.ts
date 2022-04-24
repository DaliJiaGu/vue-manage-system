import axios from 'axios';
import type { AxiosInstance } from 'axios';
// 导入的就是我们封装用来继承并且扩展AxiosRequestConfig这个接口的接口，好实现自定义实例级别的拦截器
import { xlRequestConfig } from '@/service/request/type';
import { ElLoading } from 'element-plus';
import 'element-plus/theme-chalk/el-loading.css';
class XLRequest {
  instance: AxiosInstance;
  Loading: boolean;

  // 设置一旦创建实例就在生成一个专属于这个实例的axios实例
  constructor(config: xlRequestConfig) {
    this.instance = axios.create(config);
    this.Loading = config.showLoading ?? false;

    // 设置全局的拦截器，也就是说这个类创建出来的所有实例都会有这个相同配置的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 给所有实例的所有请求设置加载状态
        if (this.Loading) {
          ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0,0,0,0.5)'
          });
        }
        return config;
      },
      (error) => {
        return error;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        ElLoading.service().close();
        const data = res.data;
        return data;
      },
      (error) => {
        ElLoading.service().close();
        if (error.response.status === 400) {
          console.log('资源找不到,错误码400');
        }
        return error;
      }
    );

    // 对于子类传入的config中设置的拦截器做接收，并创建出这个实例对应的拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestInterceptor,
      config.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      config.interceptors?.responseInterceptor,
      config.interceptors?.responseInterceptorCatch
    );
  }
  request<T>(config: xlRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 封装单例的某个请求的拦截器，所有需要用户传入的cofig里面是有interceptors,好让他们可以自己实现拦截器
      // 1. 判断用户是否传入拦截器，如果有就对config
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      // 判断是否有传入showLoading，如果有就修改isLoading
      if (config.showLoading === true) {
        this.Loading = config.showLoading;
      }

      this.instance
        .request<any, T>(config)
        .then((res: any) => {
          if (res.code == 200) {
            if (config.interceptors?.responseInterceptor) {
              res = config.interceptors.responseInterceptor(res);
            }
          } else if (config.interceptors?.responseInterceptorCatch) {
            config.interceptors.responseInterceptorCatch(res);
          }
          this.Loading = false;
          resolve(res);
        })
        .catch((err) => {
          this.Loading = false;
          return err;
        });
    });
  }
  get<T>(config: xlRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' });
  }
  post<T>(config: xlRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }
  delete<T>(config: xlRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }
  patch<T>(config: xlRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' });
  }
}

export default XLRequest;
