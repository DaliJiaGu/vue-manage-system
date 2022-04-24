// 创建关于系统管理模块的store
import { Module } from 'vuex';
import { IRootState } from '@/store/type';
import { ISystemState } from './types';
import {
  userPageListRequest,
  deletePageDateRequest,
  createPageDataRequest,
  updatePageDataRequest
} from '@/service/main/system/system';
const systemModules: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      departmentList: [],
      departmentCount: 0,
      categoryList: [],
      categoryCount: 0
    };
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.usersList;
          case 'goods':
            return state.goodsList;
          case 'menu':
            return state.menuList;
          case 'role':
            return state.roleList;
          case 'department':
            return state.departmentList;
          case 'category':
            return state.categoryList;
        }
      };
    },
    pageListCount(state) {
      return (pageName: string) => {
        switch (pageName) {
          case 'users':
            return state.usersCount;
          case 'goods':
            return state.goodsCount;
          case 'menu':
            return state.menuCount;
          case 'role':
            return state.roleCount;
          case 'department':
            return state.departmentCount;
          case 'category':
            return state.categoryCount;
        }
      };
    }
  },

  mutations: {
    // 修改用户的userList和userCount
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList;
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount;
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList;
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount;
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList;
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount;
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList;
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount;
    },
    changeDepartmentList(state, departmentList: any[]) {
      state.departmentList = departmentList;
    },
    changeDepartmentCount(state, departmentCount: number) {
      state.departmentCount = departmentCount;
    },
    changeCategoryList(state, categoryList: any[]) {
      state.categoryList = categoryList;
    },
    changeCategoryCount(state, categoryCount: number) {
      state.categoryCount = categoryCount;
    }
  },

  // 这里进行真正的网络请求
  actions: {
    // 1. 获取信息操作
    async getPageListAction({ commit }, payload) {
      // 1.根据pageName来获取pageUrl
      const pageName = payload.pageName;
      let pageUrl = '';
      switch (pageName) {
        case 'users':
          pageUrl = '/users/list';
          break;
        case 'role':
          pageUrl = '/role/list';
          break;
        case 'goods':
          pageUrl = '/goods/list';
          break;
        case 'menu':
          pageUrl = '/menu/list';
          break;
        case 'department':
          pageUrl = '/department/list';
          break;
        case 'category':
          pageUrl = '/category/list';
      }
      // 2. 请求页面的表单数据
      const PageList = await userPageListRequest(pageUrl, payload.queryInfo);

      // 3. 将数据保存到state
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1);
      commit(`change${changePageName}List`, PageList.data.list);
      commit(`change${changePageName}Count`, PageList.data.totalCount);
    },
    // 2. 删除记录
    async deletePageDataAction({ dispatch }, payload: any) {
      const { pageName, id } = payload;
      const url = `/${pageName}/${id}`;
      console.log(url);

      await deletePageDateRequest(url);
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    },
    // 3. 新增记录操作
    async createPageDataAction({ dispatch }, payload) {
      // 新增操作需要传入pageName和新增的信息

      const { pageName, formDate } = payload;
      console.log(formDate);

      const url = `/${pageName}`;
      await createPageDataRequest(url, formDate);
      // 重新请求数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    },
    // 4. 编辑记录操作
    async updatePageDataAction({ dispatch }, payload) {
      const { id, pageName, formDate } = payload;
      const url = `/${pageName}/${id}`;
      await updatePageDataRequest(url, formDate);
      // 重新请求数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    }
  }
};
export default systemModules;
