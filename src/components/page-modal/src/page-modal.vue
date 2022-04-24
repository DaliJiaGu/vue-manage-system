<template>
  <div class="page-modal">
    <el-dialog
      v-model="centerDialogVisible"
      :title="modalConfig.title"
      width="30%"
      center
      destroy-on-close
    >
      <xl-form v-bind="modalConfig" v-model="formDate"></xl-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleCommitData">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useStore } from '../../../store';
import xlForm from '../../../base-ui/form';
export default defineComponent({
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultProps: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    xlForm
  },
  setup(props) {
    const centerDialogVisible = ref(false);
    const formDate = ref<any>({});
    const store = useStore();
    //  将父组件传递过来的defaultProps传递给formData
    watch(
      // 这里得是函数得形式
      () => props.defaultProps,
      (newValue) => {
        for (const item of props.modalConfig.formItem) {
          formDate.value[`${item.field}`] = newValue[`${item.field}`];
        }
        console.log('-----------', formDate);
      }
    );

    const handleCommitData = () => {
      centerDialogVisible.value = false;

      // 如果默认回显在表单不是空的，就表示这是一个编辑操作
      if (Object.keys(props.defaultProps).length) {
        store.dispatch('system/updatePageDataAction', {
          pageName: props.pageName,
          formDate: { ...formDate.value, ...props.otherInfo },
          id: props.defaultProps.id
        });
      } else {
        // 新增操作
        console.log({ ...props.otherInfo });

        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          formDate: { ...formDate.value, ...props.otherInfo }
        });
      }
    };
    return {
      centerDialogVisible,
      formDate,
      handleCommitData
    };
  }
});
</script>

<style scoped></style>
