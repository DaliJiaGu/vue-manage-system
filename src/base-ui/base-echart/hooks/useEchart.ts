import * as echarts from 'echarts';

import chinaMapData from '../data/china.json';
// 全局注册中国地图的映射，以进行绘制
echarts.registerMap('china', chinaMapData);

export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el);

  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options);
  };

  // 让表单是响应式的，也就是说随着页面的变化而变化
  window.addEventListener('resize', () => {
    echartInstance.resize();
  });
  // 封装一个自定义的响应式变化的方法，让用户在别的地方想要使得表单自适应变化的时候可以直接调用
  const updateSize = () => {
    echartInstance.resize();
  };
  return {
    echartInstance,
    setOptions,
    updateSize
  };
}
