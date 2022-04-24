import { createStore, Store, useStore as useVuexStore } from 'vuex';
import { IRootState, StoreType } from './type';
import { userPageListRequest } from '@/service/main/system/system';
import login from './login/login';
import system from '@/store/main/system/system';
import analysis from '@/store/main/analysis/analysis';
const store = createStore<IRootState>({
  state() {
    return {
      allDepartment: [],
      allRole: [],
      allMenus: []
    };
  },
  getters: {},
  mutations: {
    changeAllDepartment(state, list) {
      state.allDepartment = list;
    },
    changeAllRole(state, list) {
      state.allRole = list;
    },
    changeAllMenus(state, list) {
      state.allMenus = list;
    }
  },
  actions: {
    // 获取所有的部门和角色
    async getInitialDataAction({ commit }) {
      const departmentRes = await userPageListRequest('/department/list', {
        offset: 0,
        size: 100
      });

      const { list: departmentList } = departmentRes.data;
      commit('changeAllDepartment', departmentList);

      const roleRes = await userPageListRequest('/role/list', {
        offset: 0,
        size: 100
      });
      const { list: roleList } = roleRes.data;
      commit('changeAllRole', roleList);

      const menuListRes = await userPageListRequest('/menu/list', {
        offset: 0,
        size: 100
      });
      const { list: menuList } = menuListRes.data;
      commit('changeAllMenus', menuList);
    }
  },
  modules: {
    login,
    system,
    analysis
  }
});

export function setupStore() {
  store.dispatch('login/loadLocalLogin');
  // 一开始就获取role和department的数据，但是如果将请求写在这里，因为这时候不一定会有token，所以请求不一定成功
  // store.dispatch('getInitialDataAction');
}
// 自己封装一个useStore，以支持在ts中获取到子模块的状态
// StoreType就是子类和根vuex的所有状态
export function useStore(): Store<StoreType> {
  return useVuexStore();
}
export default store;
