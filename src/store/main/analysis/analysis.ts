import { Module } from 'vuex';
import { IRootState } from '@/store/type';
import { IAnalysisState } from './types';

import {
  getGoodsAdressSale,
  getGoodsAmountList,
  getGoodsCategoryCount,
  getGoodsCategoryFavor,
  getGoodsCategorySale
} from '@/service/main/analysis/analysis';

const analysisModules: Module<IAnalysisState, IRootState> = {
  namespaced: true,
  state() {
    return {
      goodsCategoryCount: [],
      goodsCategorySale: [],
      goodsCategoryFavor: [],
      goodsAddressSale: [],
      goodsAmountList: []
    };
  },
  mutations: {
    changeGoodsCategoryCount(state, list) {
      state.goodsCategoryCount = list;
    },
    changeGoodsCategorySale(state, list) {
      state.goodsCategorySale = list;
    },
    changeGoodsCategoryFavor(state, list) {
      state.goodsCategoryFavor = list;
    },
    changeGoodsAddressSale(state, list) {
      state.goodsAddressSale = list;
    },
    changeGoodsAmountList(state, list) {
      state.goodsAmountList = list;
    }
  },

  actions: {
    async getGoodsCategoryData({ commit }) {
      const countList = await getGoodsCategoryCount();
      commit('changeGoodsCategoryCount', countList.data);

      const saleList = await getGoodsCategorySale();
      commit('changeGoodsCategorySale', saleList.data);

      const FavorList = await getGoodsCategoryFavor();
      commit('changeGoodsCategoryFavor', FavorList.data);

      const AddressSale = await getGoodsAdressSale();
      commit('changeGoodsAddressSale', AddressSale.data);

      const amountList = await getGoodsAmountList();
      commit('changeGoodsAmountList', amountList.data);
    }
  }
};
export default analysisModules;
