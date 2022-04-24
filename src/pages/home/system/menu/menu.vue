<template>
  <div class="menu">
    <page-content
      :contentConfig="contentConfig"
      ref="pageContentRef"
      :pageName="pageName"
      @handleEditClick="handleEditData"
      @handleNewClick="handleNewData"
    ></page-content>
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
import { contentConfig } from './content.config';
import pageContent from '../../../../components/page-content';
import pageModal from '../../../../components/page-modal';

import { modalConfig } from './modal.config';

import { usePageModal } from '../../../../hooks/usePageModal';
import { usePageSearch } from '../../../../hooks/usePageSearch';

export default defineComponent({
  components: {
    pageContent,
    pageModal
  },
  setup() {
    const pageName = 'menu';
    const [pageContentRef] = usePageSearch();

    const [pageModalRef, defaultProps, handleEditData, handleNewData] =
      usePageModal();
    return {
      contentConfig,
      pageModalRef,
      pageContentRef,
      defaultProps,
      handleEditData,
      handleNewData,
      modalConfig,
      pageName
    };
  }
});
</script>

<style scoped></style>
