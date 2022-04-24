<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, defineProps, withDefaults } from 'vue';
import useEchart from '../hooks/useEchart';
import { EChartsOption } from 'echarts';

const echartDivRef = ref<HTMLElement>();

const props = withDefaults(
  defineProps<{
    options: EChartsOption;
    width?: string;
    height?: string;
  }>(),
  {
    width: '100%',
    height: '300px'
  }
);

onMounted(() => {
  const { setOptions } = useEchart(echartDivRef.value);
  setOptions(props.options);
});
</script>

<style scoped></style>
