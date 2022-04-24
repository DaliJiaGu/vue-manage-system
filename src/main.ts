import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store/index';
import registerApp from './global';
import { setupStore } from '@/store/index';
// import xlRequest from './service';
// 对样式进行导入
import 'normalize.css';
import '@/assets/css/index.less';
const app = createApp(App);

registerApp(app);
// 每次页面刷新就重新加载vuex的数据,这个要放在router注册的前面
setupStore();
app.use(router);
app.use(store);
app.mount('#app');
