import xlRequest from '@/service';
import { IDataType } from '@/service/types';
enum goodsApi {
  goodsCount = '/goods/category/count',
  goodsSale = '/goods/category/sale',
  goodsFavor = '/goods/category/favor',
  addressSale = '/goods/address/sale',
  amountList = '/goods/amount/list'
}
export function getGoodsCategoryCount() {
  return xlRequest.get<IDataType>({
    url: goodsApi.goodsCount
  });
}
export function getGoodsCategorySale() {
  return xlRequest.get<IDataType>({
    url: goodsApi.goodsSale
  });
}
export function getGoodsCategoryFavor() {
  return xlRequest.get<IDataType>({
    url: goodsApi.goodsFavor
  });
}
export function getGoodsAdressSale() {
  return xlRequest.get<IDataType>({
    url: goodsApi.addressSale
  });
}

export function getGoodsAmountList() {
  return xlRequest.get<IDataType>({
    url: goodsApi.amountList
  });
}
