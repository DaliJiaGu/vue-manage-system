<template>
  <div class="page-content">
    <xl-table
      :dataList="dataList"
      v-bind="contentConfig"
      :total="total"
      v-model:page="pageInfo"
      @selectionChange="handleSelectionChange"
    >
      <!-- 1. 头部的设置 -->
      <template #headerHandler>
        <el-button
          v-if="isCreate"
          type="primary"
          size="medium"
          @click="handleNewClick"
        >
          {{ contentConfig.headerHandleTitle }}</el-button
        >
        <el-button icon="Refresh"></el-button>
      </template>

      <!-- 2. 使用具名插槽自定义表格内容的展示形式 -->
      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handle="scope">
        <div class="handel-btn">
          <el-button
            v-if="isUpdate"
            type="text"
            size="small"
            icon="EditPen"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            type="text"
            size="small"
            icon="Delete"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>

      <!-- 收集动态设置的slot -->
      <template
        v-for="propItem in otherPropSlots"
        :key="propItem.prop"
        #[propItem.slotName]="scope"
      >
        <template v-if="propItem.slotName"
          ><slot :name="propItem.slotName" :row="scope.row"></slot
        ></template>
      </template>
      <!-- 3. 关于脚本的设置 -->
    </xl-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue';
import xlTable from '../../../base-ui/table';
import { useStore } from '../../../store';
import { usePermission } from '../../../hooks/usePermission';

export default defineComponent({
  components: {
    xlTable
  },
  props: {
    contentConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      require: true
    }
  },
  emits: ['handleNewClick', 'handleEditClick'],
  setup(props, { emit }) {
    // 监听表单的选择
    const handleSelectionChange = (payload: any) => {
      console.log(payload);
    };
    // 0. 获取操作权限
    const isCreate = usePermission(props.pageName, 'create');
    const isDelete = usePermission(props.pageName, 'delete');
    const isUpdate = usePermission(props.pageName, 'update');
    const isSearch = usePermission(props.pageName, 'query');

    // 1.双向绑定分页组件的数据
    const pageInfo = ref({ currentPage: 1, pageSize: 10 });
    // 当分页数据变化就重新发送网络请求
    watch(pageInfo, () => {
      getPageData();
    });

    //2. 进行数据请求
    const store = useStore();

    const getPageData = (queryInfo: any = {}) => {
      if (!isSearch) return;
      console.log(queryInfo, '-----------');

      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      });
    };
    getPageData();

    // 3. 获取数据
    const dataList = computed(() => {
      // 这里一定要有返回值，本质上就是一个geter，所以一定要有返回值
      return store.getters[`system/pageListData`](props.pageName);
    });

    // 获取当前总的数据条
    const total = computed(() => {
      return store.getters[`system/pageListCount`](props.pageName);
    });

    // 4. 获取动态设置插槽的propList
    const otherPropSlots = props.contentConfig?.propList.filter((item: any) => {
      if (item.slotName === 'createAt') return false;
      else if (item.slotName === 'updateAt') return false;
      else if (item.slotName === 'handle') return false;
      else return true;
    });

    // 5.删除操作
    const handleDeleteClick = (item: any) => {
      // 删除操作是网络请求，到store中执行
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      });
    };

    // 6.新增操作
    const handleNewClick = () => {
      emit('handleNewClick');
    };

    // 7.编辑操作
    const handleEditClick = (item: any) => {
      emit('handleEditClick', item);
    };

    return {
      handleSelectionChange,
      dataList,
      getPageData,
      total,
      pageInfo,
      otherPropSlots,
      isCreate,
      isDelete,
      isUpdate,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    };
  }
});
</script>

<style scoped></style>
