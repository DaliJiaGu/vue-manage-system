# CMS

## 项目介绍

vue-manage-system是一个后台管理系统的全栈项目，前端主要使用Vue3+Element Plus，后端主要采用Node.js（基于Koa框架）搭建的。

### 技术栈

- 编程语言：TypeScript 4.x + JavaScript
- 前端框架：**Vue 3.x**
- 后端框架：**Koa**
- 数据库：**MySQL**
- UI框架：Element Plus
- 构建工具：Webpack5.x
- 路由工具：Vue Router 4.x
- 状态管理：Vuex 4.x
- HTTP工具：Axios
- 可视化：Echarts5.x
- 代码规范：EditorConfig + Prettier + ESLint
- 提交规范：Commitizen + Commitlint

### 后端服务对应的地址：https://github.com/DaliJiaGu/cms-backend.git

### 功能实现

主要实现的功能有：用户登录（后端JWT验证）、用户管理、权限管理、角色管理（基于RBAC模型）、部门管理、商品管理（使用Echarts进行数据展示）等。



### 部分界面展示

1. 登录界面

   ![image-20220424165910818](C:\Users\86159\AppData\Roaming\Typora\typora-user-images\image-20220424165910818.png)

2. 商品信息数据的展示

   ![商品信息](E:\front\JavaScript\vue3\展示gif\商品信息.gif)

3. 新增角色

   ![角色管理](E:\front\JavaScript\vue3\展示gif\角色管理.gif)

4. 权限菜单管理

   ![菜单管理](E:\front\JavaScript\vue3\展示gif\菜单管理.gif)

5. 部门管理

   ![部门管理](E:\front\JavaScript\vue3\展示gif\部门管理.gif)

### 能学到什么？

因为自己目前还是学生，没有接触到真正的项目，所以这个项目还存在蛮多缺陷的，功能是实现也都还是比较基础，但是后续学习之后还会继续完善这个系统，补充一些自己比较感兴趣的技术点，比如拖拽组件等。

那基于目前已完成的功能，我觉得比较值得记录的收获有以下几点：

1. 高级组件的封装思想，提高了代码的复用性，从而提高了开发和维护的效率
2. 根据权限设计动态路由，这里分析了三种实现思路及相应痛点
3. 封装useStore来更好的支持TS使用Vuex
4. 如何在不违背单项数据流思想的前提下，在自定义组件中进行数据的双向绑定
5. 如何使用JWT进行身份验证
6. 基于multer处理文件上传和展示
7. 还有其他像面包屑的封装、如果进行跨组件插槽传递等等



## 目录结构

```txt

├─utils 一些工具函数
├─store
|   ├─main  存放有关页面的数据
|   ├─login 存放有关登录的数据
|   |
├─service
|    ├─request
|    ├─main  关于页面的所有网络请求方法封装在这
|    ├─login  关于登录的方法在这
├─router
|   ├─index.ts
|   ├─main    在这配置好所有的路由（文件格式一致方便后续直接使用webpack读取）
├─pages      封装页面主要的组件
|   ├─not-found
|   ├─login   登录页面
|   |   ├─login.vue
|   |   ├─cpns    将登录页面抽取出三个部分
|   |   |  ├─login-account.vue
|   |   |  ├─login-panel.vue
|   |   |  └login-phone.vue
|   |
|   ├─home    系统页面（主要分为头部、侧边、内容，home主要配置的是中间的内容部分）
|   |  ├─index.vue
|   |  ├─system
|   |  |   ├─user  所有页面关于中间内容展示部分都是抽取成三个组件（page-content,page-search,page-modal)然后根据三个配置文件来设置页面的个性化展示
|   |  |   |  ├─content.config.ts
|   |  |   |  ├─modal.config.ts
|   |  |   |  ├─search.config.ts
|   |  |   |  └user.vue
|   |  |
|   |  ├─product
|   |  ├─analysis
├─hooks
|
├─global  一些全局的设置（Element Plus的按需引入等）
|
├─components  页面相关的组件都在这
|     ├─search-form  页面内容上侧的搜索表单
|     |      ├─index.ts
|     |      ├─src
|     |      |  └search-form.vue
|     ├─page-modal   页面点击“编辑、新建”弹出的表单
|     ├─page-echart  Echarts的封装
|     ├─page-content 页面内容展示的表格
|     ├─nav-menu     侧边菜单
|     ├─nav-header   头部的信息（面包屑、头像信息等）
|
├─base-ui  这里封装一些可通用的组件（抽离项目还可以继续使用）
|    ├─table
|    |   ├─index.ts
|    |   ├─types
|    |   ├─src
|    |   |  └table.vue
|    ├─form
|    ├─card
|    ├─Breadcrumb  
|    ├─base-echart
|    ├─avatar
|
```


## 一. 网络请求的封装

----

### 1.1 封装逻辑

考虑到类的封装性是更好的，这里我们是使用类来封装axios。

**主要的封装思想**：封装一个网络请求的类，然后在出口文件中创建该类对应的实例，以便支持不同配置下能够创建不一样的实例，比如说在开发的时候，可能不一样的模块会使用不一样的服务器，也就是baseURL不一样，那么这种情况我们就要使用不一样的axios实例才能进行不一样的配置。

那么当我们针对某个路径进行网络请求的时候，就只需要在对应的实例中进行请求就好。

因为拦截器的应用场景比较多，这里我们还对拦截器做了三层封装：

1. 对该类所有的实例都设置默认的拦截器
2. 对该类某个实例的所有请求设置拦截器
3. 对该类某个实例的某个请求设置拦截器

这样我们在开发的时候就可以按需选择设置不同粒度的拦截器。

#### 1.1.1 网络请求的文件目录

```txt
├─index.ts   出口文件，在这里导出的就是封装类创建出来的实例
├─type.ts    类型声明文件
├─request    在这个文件夹进行类的封装
|    ├─config.ts
|    ├─index.ts
|    └type.ts
├─login
|   ├─login.ts  具体进行网络请求的逻辑，在这里导入出口文件的实例，调用实例具体的request方法进行网络请求
|   └type.ts
```



### 1.2 封装代码

#### 1.2.1 类的封装（request文件夹）

config.ts配置文件：这里主要是处理针对不同开发环境，设置不一样的配置，比如baseURL等

```ts
// 针对不同的开发环境，可能会有不一样的服务器，所以需要配置不一样的BaseURL
let BASE_URL = "";
const TIME_OUT = 1000;

if (process.env.NODE_ENV === "development") {
  BASE_URL = "/api";
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "...";
} else {
  BASE_URL = "...";
}
export { BASE_URL, TIME_OUT };
```



type.ts文件：类型设置的文件

```ts
import { AxiosRequestConfig, AxiosResponse } from "axios";

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
}
```



index.ts文件：主要进行类的封装

```ts
import axios from "axios";
import type { AxiosInstance } from "axios";
// 导入的就是我们封装用来继承并且扩展AxiosRequestConfig这个接口的接口，好实现自定义实例级别的拦截器
import { xlRequestConfig } from "@/service/request/type";

class XLRequest {
  instance: AxiosInstance;

  constructor(config: xlRequestConfig) {
    this.instance = axios.create(config);

    // 设置全局的拦截器，也就是说这个类创建出来的所有实例都会有这个相同配置的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 拦截到请求，可以对config进行修改
        return config;
      },
      (error) => {
        // 拦截到请求发送失败
        return error;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        // 拦截到请求响应成功，可以对响应的数据进行修改（比如提取data）
        return res;
      },
      (error) => {
        // 拦截到请求响应失败
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
      /* 
        封装单例的某个请求的拦截器，所有需要用户传入的cofig里面是有interceptors,
        好让他们可以按需实现针对某个请求的拦截器
      */
      // 1. 判断用户是否传入拦截器，如果有就对config
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          resolve(res);
        })
        .catch((err) => {
          return err;
        });
    });
  }
  get<T>(config: xlRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }
  post<T>(config: xlRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }
  delete<T>(config: xlRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }
  patch<T>(config: xlRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}

export default XLRequest;

```



## 二. Vuex中不同页面的数据处理

### 2.1 数据存储结构

本项目是将所有有关网络请求的处理都放在Vuex中各个模块的actions中进行的。

为了使数据存储的结构更加清晰，本项目针对不同功能模块的数据存储都设计了对应的modules。

store对象的设计是这样的：

```ts
import { createStore, Store, useStore as useVuexStore } from 'vuex';
import { IRootState, StoreType } from '@/store/type';
import { userPageListRequest } from '@/service/main/system/system';
//具体的一些子模块
import login from '@/store/login/login';
import system from '@/store/main/system/system';
import analysis from '@/store/main/analysis/analysis';
const store = createStore<IRootState>({
  state() {
    return {
    };
  },
  getters: {},
  mutations: {
  		//在这里将网络请求拿到的数据修改到state中  
  },
  actions: {
  		//这里进行网络请求
  },
  modules: {
      //将不同的子模块加载到store中
    login,
    system,
    analysis
  }
});

//这个方法是为了防止用户拿到数据之后在本页面刷新浏览器将存在内存的Vuex数据清除，所以每次重新加载页面都需
//要执行这个方法重新去localStorage中读取数据
export function setupStore() {
  store.dispatch('login/loadLocalLogin');
}
// 自己封装一个useStore，以支持在ts中获取到子模块的状态
// StoreType就是子类和根vuex的所有状态
export function useStore(): Store<StoreType> {
  return useVuexStore();
}
export default store;

```



#### 封装useStore来更好的支持TS使用Vuex

当我们直接在setup函数内部使用state的话，它只能获取得到根state，对于子模块的state比如说login，由于原本在Vuex中类型设置并没有将子模块写进去，所以在TS中使用store.state.login它是获取不到的，所以我们这个时候需要对store再做一层封装，让他能够支持获取子模块的状态。

具体的思路是这样的：

子模块的类型设置：

types.ts文件

```ts
import { ILoginState } from './login/type';
import { ISystemState } from './main/system/types';
import { IAnalysisState } from './main/analysis/types';

//根的类型设置
export interface IRootState {
  allDepartment: any[];
  allRole: any[];
  allMenus: any[];
}

// 写一个子模块的接口
export interface IRootWithModules {
  login: ILoginState;
  system: ISystemState;
  analysis: IAnalysisState;
}

//最后导出的store类型的子模块联合根模块
export type StoreType = IRootWithModules & IRootState;
```

在根模块的文件中重写useStore方法

```ts
//1. 导入Vuex中的useStore(这里因为名字一致所以起了别名)
import {Store, useStore as useVuexStore } from 'vuex';

//2. 导入在type文件中设计好的类型
import {StoreType } from '@/store/type';

//3. 将StoreType应用到返回的store对象中
export function useStore(): Store<StoreType> {
  return useVuexStore();
}
```



## 三. 权限管理和菜单动态路由

关于后台管理项目，使用的用户可能会被分配不同的角色，那么不同的角色就会有不同的权限。所以我们在设计前端路由的时候，路由注册的设计方案就需要考虑到这个问题。

### 3.1 动态路由的设计方式

针对不同的用户权限，路由设置方式主要有三种：

1. **直接将所有功能的路由都先注册好**，因为用户一般情况下是根据在页面的点击来进行路由的跳转的，那么页面中那些功能菜单都是我们通过获取后台数据动态渲染的，不同用户因为权限不同渲染出来的菜单选项也是不同的。

   **弊端**：用户如果在地址栏手动输入url，那这种情况下即使该用户没有对应权限，但是我们已经将所有功能对应的路由都注册了，该用户还是可以成功进行路由跳转的。

2. 第二种方式就是**为不同的用户注册不同的路由**，比如我们先将不同角色对应的权限分别写好，然后用户登录的时候就根据获取的数据来判断该用户的角色，然后根据判断不同用户的角色来注册不同的路由。

   ```
   //伪代码
   const AdminRoutes = [
   
   ]
   
   const UserRoutes = [
   
   ]
   
   const routes = []
   
   if(role == admin){
   	routes = AdminRoutes
   }
   if(role == user){
   	routes = UserRoutes
   }
   
   router.createRouter({
   	routes
   })
   ```

   **弊端**：这种方式比较大的一个痛点就是，一旦新增用户角色，这个用户角色拥有的权限是跟之前的角色不一样的，这就意味着我们要修改之前的代码，然后重新部署。这个成本也是很高的。

   

3. 那么我觉得比较好的是第三种，本项目使用的也是这种。它的主要思路是我们先将所有的路由写好，但是先不注册，而是等到用户登录的时候，拿到用户可以访问权限的url，这里就需要和后端对接好接口和返回的url。那么我们根据拿到用户所有具有访问权限的url之后，将url和各个路由配置的Path属性对象。

   比如说后台返回用户的菜单url是这样的：system/user

   那么就说明该用户有用户管理的权限，就可以为该用户动态注册关于用户管理的路由。

   这样的话就可以实现根据菜单来动态生成路由映射

### 3.2 动态路由的实现

1. 先配置好所有的权限对应的路由：

   ![image-20220416152355818](C:\Users\86159\AppData\Roaming\Typora\typora-user-images\image-20220416152355818.png)

2. 封装一个工具函数mapMenusToRoutes，通过传入当前登录用户所拥有的权限菜单，来拿到在该权限下的所有路由设置。

   ```ts
   import { RouteRecordRaw } from 'vue-router';
   
   //userMenus是当前用户所拥有的权限菜单
   export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
     const routes: RouteRecordRaw[] = [];
   
     // 1.先拿到所有的功能权限对应的路由设置
     const allRoutes: RouteRecordRaw[] = [];
       
     // 这个方法是webpack的全局方法，可以用于读取指定类型文件的所有文件路径
     const routeFiles = require.context('../router/main', true, /\.ts/);
       
     routeFiles.keys().forEach((key) => {
       // 使用Required函数相当于执行一下对应的文件，那么route拿到的就是对应导出的模块
       const route = require('../router/main' + key.split('.')[1]);
       allRoutes.push(route.default);
     });
   
     // 2.获取对应角色的权限路由
     const _recurseGetRoute = (menus: any[]) => {
       for (const menu of menus) {
         // 如果是1就是代表这是二级菜单，二级菜单是有子菜单的，所以要递归调用
         if (menu.type === 1) {
           _recurseGetRoute(menu.children);
         } else if (menu.type === 2) {
           //核心代码： 通过比对path和传入的url来动态设置路由
           const route = allRoutes.find((route) => menu.url === route.path);
           if (route) {
             routes.push(route);
           }
         }
       }
     };
   
     _recurseGetRoute(userMenus);
     return routes;
   }
   ```

3. 将路由配置进行注册（通过调用router.addRoute）

   ![image-20220416154033035](C:\Users\86159\AppData\Roaming\Typora\typora-user-images\image-20220416154033035.png)



## 四. 界面结构分析

### 4.1 首页整体的代码结构

项目首页的整体布局大致如下，结构主要分为三个部分：

1. 头部信息：主要包括折叠左侧菜单的按钮、面包屑、用户登录信息
2. 侧边菜单：主要展示用户对应权限下的功能菜单
3. 主体内容：主要用于展示页面，可根据设计需求再进行分块

![image-20220416164023776](C:\Users\86159\AppData\Roaming\Typora\typora-user-images\image-20220416164023776.png)



对应代码结构是这样的

![image-20220416173036652](C:\Users\86159\AppData\Roaming\Typora\typora-user-images\image-20220416173036652.png)



可以看到当用户点击侧边菜单的不同功能，页面中只有主体内容在变化，所以为了提高代码的复用性，我们这里着重对el-mian部分进行组件的封装。



#### 4.1.1 el-mian的代码结构

在本项目中，el-mian 展示的内容结构大部分是这样的。

![image-20220416194206425](C:\Users\86159\AppData\Roaming\Typora\typora-user-images\image-20220416194206425.png)



因为这三个板块的基本结构都是表单和表格，所以我在这里基于el-table和el-form封装了一个表单和表格，上层的搜索板块（search-form）和弹出的表单组件（page-modal）都是基于el-form结构，内容展示（page-content）部分是基于le-table的。这里举例一下search-form的封装思路。

对于search-form的封装结构是这样的：

![image-20220416211647889](C:\Users\86159\AppData\Roaming\Typora\typora-user-images\image-20220416211647889.png)



对应的代码结构是这样的：

![image-20220416204540588](C:\Users\86159\AppData\Roaming\Typora\typora-user-images\image-20220416204540588.png)



上图所说的配置信息这里举例一下：

![image-20220416212045499](C:\Users\86159\AppData\Roaming\Typora\typora-user-images\image-20220416212045499.png)



所以我们这里再抽象一下整个el-mian中的组件结构应该是这样的：

![image-20220416213202938](C:\Users\86159\AppData\Roaming\Typora\typora-user-images\image-20220416213202938.png)



总结：基于上述的分层结构，我们每次开发一个新的页面只需要向页面传入三个组件的配置信息即可快速搭建一个基本的页面结构。


## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
