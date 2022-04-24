import { ILoginState } from './login/type';
import { ISystemState } from './main/system/types';
import { IAnalysisState } from './main/analysis/types';

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

export type StoreType = IRootWithModules & IRootState;
