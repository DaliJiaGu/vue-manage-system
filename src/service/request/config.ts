// 针对不同的开发环境，可能会有不一样的服务器，所以需要配置不一样的BaseURL

let BASE_URL = '';
const TIME_OUT = 1000;

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api';
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = '还没创建';
} else {
  BASE_URL = 'HAIMEI';
}
export { BASE_URL, TIME_OUT };
