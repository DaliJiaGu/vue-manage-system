<template>
  <div class="overview">
    <search-form
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @searchBtnClick="handleSearchClick"
    ></search-form>
    <page-content
      ref="pageContentRef"
      :contentConfig="contentConfig"
      :pageName="pageName"
      @handleEditClick="handleEditData"
      @handleNewClick="handleNewData"
    >
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
    </page-content>
    <page-modal
      :modalConfig="modalConfigRef"
      ref="pageModalRef"
      :defaultProps="defaultProps"
      :pageName="pageName"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '../../../../store';

import { searchFormConfig } from './search.config';
import { contentConfig } from './content.config';
import { modalConfig } from './modal.config';

import pageContent from '../../../../components/page-content';
import searchForm from '../../../../components/search-form';
import pageModal from '../../../../components/page-modal';

import { usePageSearch } from '../../../../hooks/usePageSearch';
import { usePageModal } from '../../../../hooks/usePageModal';
export default defineComponent({
  components: {
    searchForm,
    pageContent,
    pageModal
  },
  setup() {
    const pageName = 'users';

    const [pageContentRef, handleSearchClick, handleResetClick] =
      usePageSearch();

    // 1. 对page-modal中密码栏的显示隐藏的设置
    type callBackFn = () => void;
    const newCallBack: callBackFn = () => {
      // 拿到password实例
      const password = modalConfig.formItem.find(
        (item) => item.field === 'password'
      );
      password!.isHide = false;
    };
    const editCallBack: callBackFn = () => {
      const password = modalConfig.formItem.find(
        (item) => item.field === 'password'
      );
      password!.isHide = true;
    };

    // 2.动态添加部门和角色的列表
    const store = useStore();

    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItem.find(
        (item) => item.field === 'departmentId'
      );
      departmentItem!.otherOptions = store.state.allDepartment.map((item) => {
        return { label: item.name, value: item.id };
      });

      const roleItem = modalConfig.formItem.find(
        (item: any) => item.field === 'roleId'
      );
      roleItem!.otherOptions = store.state.allRole.map((item) => {
        return { label: item.name, value: item.id };
      });
      return modalConfig;
    });
    // 3.调用hooks获取数据
    const [pageModalRef, defaultProps, handleEditData, handleNewData] =
      usePageModal(newCallBack, editCallBack);
    return {
      searchFormConfig,
      contentConfig,
      modalConfigRef,
      pageName,
      handleResetClick,
      handleSearchClick,
      pageContentRef,
      pageModalRef,
      handleNewData,
      handleEditData,
      defaultProps
    };
  }
});
</script>

<style scoped></style>
