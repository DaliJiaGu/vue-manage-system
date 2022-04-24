<template>
  <div class="goods">
    <search-form
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @searchBtnClick="handleSearchClick"
    ></search-form>
    <page-content
      pageName="goods"
      :contentConfig="contentConfig"
      ref="pageContentRef"
    >
      <!-- 使用在page-content中定义的动态插槽 -->
      <template #imgUrl="scope">
        <el-image
          style="width: 60px; height: 60px"
          :src="scope.row.imgUrl"
          fit="cover"
        />
      </template>
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.status ? 'success' : 'danger'"
          >{{ scope.row.status ? '启用' : '禁用' }}</el-button
        >
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import pageContent from '../../../../components/page-content';
import searchForm from '../../../../components/search-form';
import { contentConfig } from './content.config';
import { searchFormConfig } from './search.config';
import { usePageSearch } from '../../../../hooks/usePageSearch';

export default defineComponent({
  components: {
    pageContent,
    searchForm
  },
  setup() {
    const [pageContentRef, handleSearchClick, handleResetClick] =
      usePageSearch();
    return {
      contentConfig,
      searchFormConfig,
      pageContentRef,
      handleSearchClick,
      handleResetClick
    };
  }
});
</script>

<style scoped></style>
