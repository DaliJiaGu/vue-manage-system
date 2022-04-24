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
    </page-content>
    <page-modal
      :modalConfig="modalConfigRef"
      :defaultProps="defaultProps"
      :pageName="pageName"
      ref="pageModalRef"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

import { searchFormConfig } from './search.config';
import { contentConfig } from './content.config';
import { modalConfig } from './modal.config';

import pageContent from '../../../../components/page-content';
import searchForm from '../../../../components/search-form';
import pageModal from '../../../../components/page-modal';

import { usePageSearch } from '../../../../hooks/usePageSearch';
import { usePageModal } from '../../../../hooks/usePageModal';

import { useStore } from '../../../../store';
export default defineComponent({
  components: {
    searchForm,
    pageContent,
    pageModal
  },
  setup() {
    const pageName = 'department';

    const [pageContentRef, handleSearchClick, handleResetClick] =
      usePageSearch();

    // 获取部门
    const store = useStore();
    const modalConfigRef = computed(() => {
      // debugger;
      // 1. 找到当前配置中关于部门这一板块
      const parentDepartment = modalConfig.formItem?.find((item: any) => {
        return item.field === 'parentId';
      });

      // const parentDepartment = modalConfig.formItem?.find(
      //   (item: any) => item.field === 'parentId'
      // );
      console.log(parentDepartment);

      // 2. 给parentDepartment绑定otherOptions
      parentDepartment!.otherOptions = store.state.allDepartment.map((item) => {
        return { label: item.name, value: item.id };
      });
      console.log(parentDepartment!.otherOptions);

      return modalConfig;
    });

    // 3.调用hooks获取数据
    const [pageModalRef, defaultProps, handleEditData, handleNewData] =
      usePageModal();

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
