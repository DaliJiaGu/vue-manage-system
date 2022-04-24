import { ref } from 'vue';
import pageModal from '@/components/page-modal';
type callBackFn = (item?: any) => void;
export function usePageModal(newCb?: callBackFn, editCb?: callBackFn) {
  // 获取组件
  const pageModalRef = ref<InstanceType<typeof pageModal>>();
  // 编辑
  const defaultProps = ref({});
  const handleEditData = (item: any) => {
    if (pageModalRef.value) {
      pageModalRef.value.centerDialogVisible = true;
    }
    // 需要初始化会回显的数据formData
    defaultProps.value = { ...item };

    editCb && editCb(item);
  };
  // 新建
  const handleNewData = () => {
    defaultProps.value = {};
    if (pageModalRef.value) {
      pageModalRef.value.centerDialogVisible = true;
    }
    newCb && newCb();
  };
  return [pageModalRef, defaultProps, handleEditData, handleNewData];
}
