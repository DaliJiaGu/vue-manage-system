import { ref } from 'vue';
import pageContent from '@/components/page-content';

export function usePageSearch() {
  // 拿到page-content这个组件实例，调用里面的网络请求方法
  const pageContentRef = ref<InstanceType<typeof pageContent>>();
  // 处理重置按钮
  const handleResetClick = () => {
    pageContentRef.value?.getPageData();
  };
  // 处理搜索按钮
  const handleSearchClick = (formData: any) => {
    pageContentRef.value?.getPageData(formData);
  };
  return [pageContentRef, handleSearchClick, handleResetClick];
}
