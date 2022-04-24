<template>
  <div class="role">
    <search-form
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @searchBtnClick="handleSearchClick"
    ></search-form>
    <page-content
      :contentConfig="contentConfig"
      :pageName="pageName"
      ref="pageContentRef"
      @handleEditClick="handleEditData"
      @handleNewClick="handleNewData"
    ></page-content>
    <page-modal
      :pageName="pageName"
      ref="pageModalRef"
      :modalConfig="modalConfig"
      :defaultProps="defaultProps"
      :otherInfo="otherInfo"
    >
      <div class="el-tree">
        <el-tree
          :data="menuList"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleMenuCheck"
          ref="elTreeRef"
        />
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue';
import { useStore } from '../../../../store';

import searchForm from '../../../../components/search-form';
import pageContent from '../../../../components/page-content';
import pageModal from '../../../../components/page-modal';

import { searchFormConfig } from './search.config';
import { contentConfig } from './content.config';
import { modalConfig } from './modal.config';

import { usePageSearch } from '../../../../hooks/usePageSearch';
import { usePageModal } from '../../../../hooks/usePageModal';

import { mapMenuToLeafNode } from '../../../../utils/mapMenusToRoutes';

import { ElTree } from 'element-plus';
export default defineComponent({
  components: {
    searchForm,
    pageContent,
    pageModal
  },
  setup() {
    const pageName = 'role';
    // 1. 设置显示的全部el-tree项目
    const store = useStore();
    const menuList = computed(() => store.state.allMenus);

    // 2. 监听选择的节点
    const otherInfo = ref({});
    const handleMenuCheck = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys;
      const halfCheckedKeys = data2.halfCheckedKeys;
      const menuList = [...checkedKeys, ...halfCheckedKeys];
      // 这是结构赋值的缩写{menuList: menuList}
      otherInfo.value = { menuList };
    };

    // 3.对编辑组件关于角色信息的回显
    const elTreeRef = ref<InstanceType<typeof ElTree>>();
    const callback = (item: any) => {
      const leafNodes = mapMenuToLeafNode(item.menuList);
      nextTick(() => {
        console.log(elTreeRef.value);

        elTreeRef.value?.setCheckedKeys(leafNodes, false);
      });
    };
    const [pageContentRef, handleSearchClick, handleResetClick] =
      usePageSearch();
    const [pageModalRef, defaultProps, handleEditData, handleNewData] =
      usePageModal(undefined, callback);
    return {
      searchFormConfig,
      contentConfig,
      modalConfig,
      pageName,
      pageContentRef,
      handleSearchClick,
      handleResetClick,
      pageModalRef,
      defaultProps,
      handleEditData,
      handleNewData,
      menuList,
      handleMenuCheck,
      otherInfo,
      elTreeRef
    };
  }
});
</script>

<style scoped>
.el-tree {
  padding-left: 10px;
}
</style>
