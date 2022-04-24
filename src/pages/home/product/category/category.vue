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
      :modalConfig="modalConfig"
      :defaultProps="defaultProps"
      :pageName="pageName"
      ref="pageModalRef"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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
    const pageName = 'category';

    const [pageContentRef, handleSearchClick, handleResetClick] =
      usePageSearch();

    const [pageModalRef, defaultProps, handleEditData, handleNewData] =
      usePageModal();
    return {
      searchFormConfig,
      contentConfig,
      modalConfig,
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
