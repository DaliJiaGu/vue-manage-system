<template>
  <div class="xl-table">
    <!-- 头部的插槽 -->
    <div class="header">
      <div class="title">
        <slot name="title">{{ title }}</slot>
      </div>

      <div class="handler">
        <slot name="headerHandler"> </slot>
      </div>
    </div>
    <!-- 表格内容 -->
    <el-table
      :data="dataList"
      border
      style="width: 100%"
      v-bind="childrenProps"
      @selection-change="handleSelectionChange"
    >
      <!-- 表格中序号和选择的插槽 -->
      <el-table-column
        v-if="showSelectColumn"
        minWidth="80"
        type="selection"
        align="center"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        width="80"
        align="center"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <!-- 自定义表格的内容，只有在父组件才能使用在子组件定义的插槽，所以这里的default插槽是在el-table-column中定义好的 -->
          <template #default="scope">
            <!-- 在插槽中定义属性name（具名）和row，这样父组件在使用这个具名插槽的 时候就可以获得相应的row属性值-->
            <!-- 这个scope.row是el-table中默认插槽传过来的值 -->
            <slot :name="propItem.slotName" :row="scope.row">
              <!-- 插槽的默认内容:以文本的形式展示 -->
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 底部分页组件的设置 -->
    <div class="footer">
      <slot name="footer">
        <el-pagination
          v-if="showPagination"
          v-model:currentPage="page!.currentPage"
          v-model:page-size="page!.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          small="small"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    dataList: {
      type: Array,
      required: true
    },
    propList: {
      type: Array,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    total: {
      type: Number,
      default: 0
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 1, pageSize: 10 })
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value);
    };

    // 分页组件的操作事件
    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize });
    };
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage });
    };
    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    };
  }
});
</script>

<style scoped lang="less">
.xl-table {
  padding: 10px 10px;
  border-top: 20px solid #f5f5f5;
}
.header {
  display: flex;
  height: 45px;
  padding: 0 10px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 18px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
