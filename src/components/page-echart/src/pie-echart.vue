<template>
  <div class="pie-echart">
    <base-echart :options="option"></base-echart>
  </div>
</template>

<script setup lang="ts">
import baseEchart from '../../../base-ui/base-echart';
import { IDataType } from '../types';
import { defineProps, computed } from 'vue';
// 定义属性
const props = defineProps<{
  data: IDataType[];
}>();

const option = computed(() => {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: '分类数据',
        type: 'pie',
        radius: '50%',
        data: props.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
});
</script>

<style scoped></style>
