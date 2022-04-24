<template>
  <div class="search-form">
    <xl-form v-bind="searchFormConfig" v-model="formData">
      <template #footer>
        <div>
          <el-button @click="handleResetClick">重置</el-button>
          <el-button type="primary" @click="handleSearchClick">搜索</el-button>
        </div>
      </template>
    </xl-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import xlForm from '../../../base-ui/form';
export default defineComponent({
  components: {
    xlForm
  },
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  emits: ['resetBtnClick', 'searchBtnClick'],
  setup(props, { emit }) {
    //formdata的数据应该是根据用户传入的searchconfig来动态决定的
    const formItem = props.searchFormConfig?.formItem ?? [];
    const originFormData: any = {};
    for (const item of formItem) {
      // 将所formdata的数据进行初始化
      originFormData[item.field] = '';
    }
    const formData = ref(originFormData);

    // 处理：用户点击重置按钮的操作
    const handleResetClick = () => {
      for (const key in originFormData) {
        // 不能直接formData.value = originFormData,因为这里formdata做了一个双向绑定
        formData.value[`${key}`] = originFormData[key];
      }
      // 点击重置后是需要进行网络搜索
      emit('resetBtnClick');
    };

    // 处理：用户点击了搜索按钮的操作
    const handleSearchClick = () => {
      emit('searchBtnClick', formData.value);
    };

    return { formData, handleResetClick, handleSearchClick };
  }
});
</script>

<style scoped></style>
