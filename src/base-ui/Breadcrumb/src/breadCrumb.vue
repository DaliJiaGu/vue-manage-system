<template>
  <div>
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumb" :key="item.path">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { breadCrumbType } from '../types/index';

export default defineComponent({
  props: {
    breadcrumb: {
      type: Array as PropType<breadCrumbType[]>,
      default: () => []
    }
  },
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
