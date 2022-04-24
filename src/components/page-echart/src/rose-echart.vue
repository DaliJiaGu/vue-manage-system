<template>
  <div class="rose-echart">
    <base-echart :options="option"></base-echart>
  </div>
</template>

<script setup lang="ts">
import baseEchart from '../../../base-ui/base-echart';
import { computed, defineProps } from 'vue';
import { IDataType } from '../types';

const props = defineProps<{
  roseData: IDataType[];
}>();

const option = computed(() => {
  return {
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        type: 'pie',
        radius: [20, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.roseData
      }
    ]
  };
});
</script>

<style scoped></style>
