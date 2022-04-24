<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="12">
        <xl-card title="分类商品数量(饼图)">
          <pie-echart :data="categoryGoodsCount"></pie-echart>
        </xl-card>
      </el-col>
      <el-col :span="12">
        <xl-card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </xl-card>
      </el-col>
    </el-row>
    <el-row :style="{ marginTop: '10px' }">
      <el-col :span="24">
        <xl-card title="不同城市商品销量">
          <map-echart :mapData="addressAmount"></map-echart>
        </xl-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="contentBottom">
      <el-col :span="12">
        <xl-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </xl-card>
      </el-col>
      <el-col :span="12">
        <xl-card title="分类商品的收藏">
          <bar-echart v-bind="categoryFavor"></bar-echart>
        </xl-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '../../../../store';
import xlCard from '../../../../base-ui/card';
import {
  lineEchart,
  pieEchart,
  roseEchart,
  barEchart,
  mapEchart
} from '../../../../components/page-echart';

export default defineComponent({
  components: {
    xlCard,
    lineEchart,
    pieEchart,
    roseEchart,
    barEchart,
    mapEchart
  },
  setup() {
    const store = useStore();
    const title = '故事地图';
    store.dispatch('analysis/getGoodsCategoryData');

    // 获取饼状图的数据
    const categoryGoodsCount = computed(() => {
      return store.state.analysis.goodsCategoryCount.map((item) => {
        return { name: item.name, value: item.goodsCount };
      });
    });

    // 获取折现图的数据
    const categoryGoodsSale = computed(() => {
      const datalist = store.state.analysis.goodsCategorySale;
      const xlabels: string[] = [];
      const values: any[] = [];
      datalist.forEach((item) => {
        xlabels.push(item.name);
        values.push(item.goodsCount);
      });
      return { xlabels, values };
    });

    // 获取柱状图的数据
    const categoryFavor = computed(() => {
      const dataList = store.state.analysis.goodsCategoryFavor;
      const xlabels: string[] = [];
      const values: any[] = [];
      dataList.forEach((item) => {
        xlabels.push(item.name);
        values.push(item.goodsFavor);
      });
      return { xlabels, values };
    });

    // 获取地区销售数据
    const addressAmount = computed(() => {
      return store.state.analysis.goodsAddressSale.map((item) => {
        return { name: item.address, value: item.count };
      });
    });

    return {
      title,
      categoryGoodsCount,
      categoryGoodsSale,
      categoryFavor,
      addressAmount
    };
  }
});
</script>

<style scoped>
.dashboard {
  background-color: #f5f5f5;
}
.contentBottom {
  margin-top: 20px;
}
</style>
