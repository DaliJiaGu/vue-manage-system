import { Module } from 'vuex';
import { ILoginState } from './type';
import { IRootState } from '../type';
import {
  mapMenusToRoutes,
  mapMenuToPermission
} from '@/utils/mapMenusToRoutes';
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenuByUserId
} from '@/service/login/login';
import localCache from '@/utils/cache';
import router from '@/router';

const LoginModules: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userInfo: {},
      token: '',
      userMenu: [],
      iconNames: [],
      permission: []
    };
  },
  mutations: {
    changeToken(state, token) {
      state.token = token;
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    changeUserMenu(state, userMenu) {
      state.userMenu = userMenu;
      // 拿到userMenu来获取该权限下的路由设置
      const routes = mapMenusToRoutes(userMenu);
      routes.forEach((route) => {
        router.addRoute('index', route);
      });

      // 通过usermeun拿到该用户所有的操作权限
      const permission = mapMenuToPermission(userMenu);
      state.permission = permission;
    },
    changeIconNames(state, iconName) {
      state.iconNames = iconName;
    }
  },
  actions: {
    async loginAccountAction({ commit, dispatch }, payload) {
      // 1.真正执行用户账户登录的验证
      const loginRes = await accountLoginRequest(payload);
      console.log(loginRes);

      // 将拿到的token保存到state中
      /*
        如果拿数据直接这样const { id, token } = loginRes.data;
        会报错，因为post请求要求我们传入一个泛型，返回的值就是这个泛型
        这里我们没有传递泛型，所以loginRes是unKnow的，不能直接.data
      */
      const { id, token } = loginRes.data;
      commit('changeToken', token);
      localCache.setCache('token', token);
      // 在模块中调用根的action来获取role和department的数据
      dispatch('getInitialDataAction', null, { root: true });

      // 2. 通过ID拿到用户的详细信息
      const userInfoRes = await getUserInfoById(id);
      const userInfo = userInfoRes.data;
      commit('changeUserInfo', userInfo);
      localCache.setCache('userInfo', userInfo);

      // 3. 通过拿到的unserInfo里面的角色ID来获取该角色的权限菜单
      const userMenuRes = await getUserMenuByUserId(userInfo.role.id);
      const userMenu = userMenuRes.data;
      commit('changeUserMenu', userMenu);
      localCache.setCache('userMenu', userMenu);

      // 将拿到的权限中有关于图标的名字存储下来
      const iconName: any[] = [];
      userMenu.forEach((item: any) => {
        const icon = item!.icon.slice(8);
        iconName.push(icon);
      });
      commit('changeIconNames', iconName);
      localCache.setCache('iconName', iconName);

      // 4. 登录成功，跳转到首页
      router.push('/index');
    },

    // 一旦刷新就重新加载数据到vuex
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token');
      if (token) {
        commit('changeToken', token);
        dispatch('getInitialDataAction', null, { root: true });
      }

      const userInfo = localCache.getCache('userInfo');
      if (userInfo) {
        commit('changeUserInfo', userInfo);
      }

      const userMenu = localCache.getCache('userMenu');
      if (userMenu) {
        commit('changeUserMenu', userMenu);
      }

      const iconName = localCache.getCache('iconName');
      console.log(iconName);
      if (iconName) {
        commit('changeIconNames', iconName);
      }
    }
  }
};

export default LoginModules;
