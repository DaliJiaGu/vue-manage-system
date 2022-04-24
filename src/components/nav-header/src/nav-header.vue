<template>
  <div class="nav-header">
    <component
      :is="isFold ? 'Fold' : 'Expand'"
      class="icon"
      @click="isFoldClick"
    ></component>

    <div class="content">
      <!-- 面包屑 -->
      <bread-crumb :breadcrumb="breadcrumb" />
      <div>
        <avatar></avatar>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import BreadCrumb from '../../../base-ui/Breadcrumb/index';
import Avatar from '../../../base-ui/avatar';

import { useRoute } from 'vue-router';
import { useStore } from '../../../store';
import { mapPathToBreadcrumb } from '../../../utils/mapMenusToRoutes';

export default defineComponent({
  components: {
    BreadCrumb,
    Avatar
  },
  // 组件通信
  emits: ['FoldChange'],
  setup(prop, { emit }) {
    //设置store和route
    const store = useStore();
    const route = useRoute();

    // 这是关于左侧菜单折叠的设置
    let isFold = ref(false);
    const isFoldClick = () => {
      isFold.value = !isFold.value;
      emit('FoldChange', isFold.value);
    };

    // 设置关于面包屑
    const breadcrumb = computed(() => {
      const userMenu = store.state.login.userMenu;
      const currentPath = route.path;
      return mapPathToBreadcrumb(userMenu, currentPath);
    });
    return {
      isFold,
      isFoldClick,
      breadcrumb
    };
  }
});
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .icon {
    height: 20px;
    width: 20px;
    cursor: pointer;
    margin-right: 10px;
    margin-top: 6px;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
  }
}
</style>
