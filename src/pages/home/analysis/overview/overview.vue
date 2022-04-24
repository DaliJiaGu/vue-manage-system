<template>
  <div class="overview">
    <search-form :searchFormConfig="formConfig"></search-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { formConfig } from './overview.config';
import searchForm from '../../../../components/search-form';
export default defineComponent({
  components: {
    searchForm
  },
  setup() {
    return {
      formConfig
    };
  }
});
</script>

<style scoped></style>
