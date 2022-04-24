import xlRequest from '@/service';
import { IDataType } from '@/service/types';
export function userPageListRequest(url: string, queryInfo: any) {
  console.log(queryInfo);

  return xlRequest.post<IDataType>({
    url: url,
    data: queryInfo
  });
}

export function deletePageDateRequest(url: string) {
  return xlRequest.delete<IDataType>({
    url: url
  });
}

export function createPageDataRequest(url: string, newData: any) {
  return xlRequest.post<IDataType>({
    url: url,
    data: newData
  });
}
export function updatePageDataRequest(url: string, newData: any) {
  return xlRequest.patch<IDataType>({
    url: url,
    data: newData
  });
}
